-- ==========================================
-- TowerGreens Complete Database Schema
-- PRD v3.0 | InsForge Backend
-- ==========================================

-- 1. PROFILES (extends auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT '',
  phone TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'rider')),
  coins_balance INTEGER NOT NULL DEFAULT 0,
  address TEXT,
  city TEXT DEFAULT 'Lahore',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_select_own" ON profiles FOR SELECT USING (id = auth.uid());
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE USING (id = auth.uid()) WITH CHECK (id = auth.uid());
CREATE POLICY "profiles_insert_own" ON profiles FOR INSERT WITH CHECK (id = auth.uid());
CREATE POLICY "admin_all_profiles" ON profiles FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION system.update_updated_at();

-- 2. CATEGORIES
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ur TEXT NOT NULL,
  name_en TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "categories_public_read" ON categories FOR SELECT USING (true);
CREATE POLICY "admin_manage_categories" ON categories FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 3. PRODUCTS
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ur TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_ur TEXT,
  description_en TEXT,
  price NUMERIC(10,2) NOT NULL,
  unit TEXT NOT NULL DEFAULT 'pack',
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  image_url TEXT,
  images JSONB DEFAULT '[]',
  is_available BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  stock INTEGER DEFAULT 100,
  coins_reward_pct NUMERIC(4,2) DEFAULT 1.00,
  making_process_ur TEXT,
  making_process_en TEXT,
  nutrition JSONB DEFAULT '{}',  -- {calories, protein, fiber, vitamins}
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "products_public_read" ON products FOR SELECT USING (true);
CREATE POLICY "admin_manage_products" ON products FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE TRIGGER products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION system.update_updated_at();

-- 4. BANNERS
CREATE TABLE banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_ur TEXT NOT NULL,
  title_en TEXT NOT NULL,
  subtitle_ur TEXT,
  subtitle_en TEXT,
  emoji TEXT DEFAULT '🌿',
  bg_gradient TEXT DEFAULT 'linear-gradient(135deg, #0A2E10, #4ADE80)',
  cta_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "banners_public_read" ON banners FOR SELECT USING (is_active = true);
CREATE POLICY "admin_manage_banners" ON banners FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 5. ORDERS
CREATE TABLE orders (
  id TEXT PRIMARY KEY DEFAULT 'TG-' || LPAD(FLOOR(RANDOM() * 99999 + 1000)::TEXT, 5, '0'),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
    'pending','accepted','preparing','dispatched','delivered','cancelled','rejected'
  )),
  payment_method TEXT NOT NULL DEFAULT 'cod' CHECK (payment_method IN ('cod', 'jazzcash', 'easypaisa')),
  payment_status TEXT NOT NULL DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid','paid','refunded')),
  subtotal NUMERIC(10,2) NOT NULL DEFAULT 0,
  delivery_fee NUMERIC(10,2) NOT NULL DEFAULT 70,
  coins_discount NUMERIC(10,2) DEFAULT 0,
  total NUMERIC(10,2) NOT NULL DEFAULT 0,
  delivery_address TEXT NOT NULL,
  delivery_city TEXT DEFAULT 'Lahore',
  notes TEXT,
  rider_id UUID REFERENCES auth.users(id),
  otp TEXT,
  coins_earned INTEGER DEFAULT 0,
  otp_claimed BOOLEAN DEFAULT FALSE,
  jazzcash_ref TEXT,
  estimated_delivery_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  cancelled_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "orders_owner_read" ON orders FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "orders_owner_insert" ON orders FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "admin_all_orders" ON orders FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin','rider'))
);
CREATE TRIGGER orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION system.update_updated_at();

-- 6. ORDER ITEMS
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  name_ur TEXT NOT NULL,
  name_en TEXT NOT NULL,
  image_url TEXT,
  price NUMERIC(10,2) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  subtotal NUMERIC(10,2) GENERATED ALWAYS AS (price * quantity) STORED
);
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "order_items_owner_read" ON order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);
CREATE POLICY "order_items_owner_insert" ON order_items FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);
CREATE POLICY "admin_all_order_items" ON order_items FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin','rider'))
);

-- 7. COINS LEDGER
CREATE TABLE coins_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  order_id TEXT REFERENCES orders(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN ('earn','deduct','bonus','expire')),
  amount INTEGER NOT NULL,
  reason_ur TEXT NOT NULL,
  reason_en TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE coins_ledger ENABLE ROW LEVEL SECURITY;
CREATE POLICY "coins_owner_read" ON coins_ledger FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "admin_all_coins" ON coins_ledger FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 8. NOTIFICATIONS
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,  -- NULL = broadcast
  title_ur TEXT NOT NULL,
  title_en TEXT NOT NULL,
  body_ur TEXT NOT NULL,
  body_en TEXT NOT NULL,
  type TEXT DEFAULT 'info' CHECK (type IN ('order','coins','promo','info')),
  order_id TEXT REFERENCES orders(id) ON DELETE SET NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "notifs_owner_read" ON notifications FOR SELECT USING (
  user_id = auth.uid() OR user_id IS NULL
);
CREATE POLICY "notifs_owner_update" ON notifications FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "admin_all_notifs" ON notifications FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 9. DIRECT MESSAGES
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  from_role TEXT NOT NULL CHECK (from_role IN ('customer','admin')),
  text TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "messages_owner" ON messages FOR ALL USING (user_id = auth.uid());
CREATE POLICY "admin_all_messages" ON messages FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 10. RIDERS (linked to profiles with role=rider)
CREATE TABLE rider_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  rider_id UUID NOT NULL REFERENCES auth.users(id),
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  picked_up_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ
);
ALTER TABLE rider_assignments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "rider_own_assignments" ON rider_assignments FOR SELECT USING (rider_id = auth.uid());
CREATE POLICY "admin_all_assignments" ON rider_assignments FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin','rider'))
);
