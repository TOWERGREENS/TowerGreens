-- TowerGreens Seed Data

-- Categories
INSERT INTO categories (name_ur, name_en, slug, sort_order) VALUES
  ('سبزیاں', 'Veggies', 'veggies', 1),
  ('سلاد', 'Salads', 'salads', 2),
  ('صحت مند کھانا', 'Healthy Food', 'healthy-food', 3),
  ('چائنیز اسٹائل', 'Chinese Style', 'chinese-style', 4),
  ('سپر ہیلتھی', 'Super Healthy', 'super-healthy', 5),
  ('پروسیسڈ فوڈ', 'Processed Food', 'processed-food', 6);

-- Products (using category slugs via subquery)
INSERT INTO products (name_ur, name_en, description_ur, description_en, price, unit, category_id, image_url, is_featured, is_available, coins_reward_pct, making_process_ur, making_process_en, nutrition) VALUES
  -- Veggies
  ('تازہ پالک', 'Fresh Spinach',
   'ہائیڈروپونک ٹاور میں اگائی گئی تازہ پالک، بغیر مٹی کے پاک اور صحت بخش',
   'Hydroponically grown fresh spinach, soil-free and nutrient-rich',
   180, '250g', (SELECT id FROM categories WHERE slug='veggies'),
   'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400',
   true, true, 2.5,
   'ہائیڈروپونک ٹاور میں 14 دن میں تیار، 30% زیادہ آئرن',
   'Ready in 14 days in hydroponic tower, 30% more iron than soil-grown',
   '{"calories": 23, "protein": "2.9g", "fiber": "2.2g", "iron": "2.7mg"}'),

  ('تازہ لیٹس', 'Fresh Lettuce',
   'کرکری اور تازہ لیٹس، سلاد کے لیے بہترین',
   'Crispy fresh lettuce, perfect for salads',
   150, '200g', (SELECT id FROM categories WHERE slug='veggies'),
   'https://images.unsplash.com/photo-1622205313162-be1d5712a43f?w=400',
   true, true, 2.0,
   'ہائیڈروپونک ٹاور میں 21 دن میں تیار',
   'Ready in 21 days in hydroponic tower',
   '{"calories": 15, "protein": "1.4g", "fiber": "1.3g", "vitamin_c": "9.2mg"}'),

  ('تازہ ٹماٹر', 'Fresh Tomatoes',
   'گھر میں اگائے گئے رس دار ٹماٹر',
   'Juicy vine-ripened tomatoes grown in-house',
   220, '500g', (SELECT id FROM categories WHERE slug='veggies'),
   'https://images.unsplash.com/photo-1546094096-0df4bcabd337?w=400',
   false, true, 2.0,
   'ہائیڈروپونک ٹاور میں 45 دن میں تیار',
   'Ready in 45 days in hydroponic tower',
   '{"calories": 18, "protein": "0.9g", "fiber": "1.2g", "lycopene": "2.6mg"}'),

  ('تازہ کھیرا', 'Fresh Cucumber',
   'ٹھنڈا اور تازہ کھیرا، سلاد میں بہترین',
   'Cool and fresh cucumber, best in salads',
   130, '2 pcs', (SELECT id FROM categories WHERE slug='veggies'),
   'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=400',
   false, true, 1.5,
   'ہائیڈروپونک ٹاور میں 30 دن میں تیار',
   'Ready in 30 days in hydroponic tower',
   '{"calories": 16, "protein": "0.7g", "fiber": "0.5g", "water": "96%"}'),

  -- Salads
  ('مکس سلاد باول', 'Mix Salad Bowl',
   'تازہ سبزیوں کا لذیذ مرکب، ہلکی ڈریسنگ کے ساتھ',
   'Delicious mix of fresh vegetables with light dressing',
   350, 'bowl', (SELECT id FROM categories WHERE slug='salads'),
   'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
   true, true, 3.0,
   'روزانہ صبح تیار کیا جاتا ہے، 100% تازہ',
   'Prepared fresh every morning, 100% fresh',
   '{"calories": 120, "protein": "4g", "fiber": "5g", "vitamin_k": "200mcg"}'),

  ('یونانی سلاد', 'Greek Salad',
   'ٹماٹر، کھیرا، زیتون اور فیٹا پنیر کا مرکب',
   'Mix of tomatoes, cucumber, olives and feta cheese',
   420, 'bowl', (SELECT id FROM categories WHERE slug='salads'),
   'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400',
   true, true, 3.0,
   'روزانہ تازہ تیار',
   'Freshly prepared daily',
   '{"calories": 185, "protein": "7g", "fiber": "3g", "calcium": "180mg"}'),

  -- Healthy Food
  ('گرین سموتھی', 'Green Smoothie',
   'پالک، کیلا اور ادرک کا صحت مند مشروب',
   'Healthy blend of spinach, banana and ginger',
   280, '400ml', (SELECT id FROM categories WHERE slug='healthy-food'),
   'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400',
   true, true, 2.0,
   'تازہ اجزاء سے فوری تیار',
   'Instantly blended from fresh ingredients',
   '{"calories": 140, "protein": "4g", "fiber": "4g", "potassium": "422mg"}'),

  ('اینرجی باول', 'Energy Bowl',
   'دلیہ، میوے اور تازہ پھلوں کا طاقتور ناشتہ',
   'Power breakfast with oats, nuts and fresh fruits',
   320, 'bowl', (SELECT id FROM categories WHERE slug='healthy-food'),
   'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400',
   false, true, 2.5,
   'صبح تازہ تیار کیا جاتا ہے',
   'Freshly prepared every morning',
   '{"calories": 380, "protein": "12g", "fiber": "8g", "omega3": "1.2g"}'),

  -- Chinese Style
  ('چائنیز مکس ویج', 'Chinese Mix Veg',
   'چائنیز انداز میں پکائی گئی تازہ سبزیاں',
   'Fresh vegetables cooked Chinese style',
   380, 'serving', (SELECT id FROM categories WHERE slug='chinese-style'),
   'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400',
   true, true, 2.5,
   'تازہ سبزیوں کے ساتھ چائنیز ساس',
   'Fresh vegetables with Chinese sauces',
   '{"calories": 220, "protein": "8g", "fiber": "6g", "sodium": "580mg"}'),

  ('چائنیز فرائیڈ رائس', 'Chinese Fried Rice',
   'سبزیوں کے ساتھ چائنیز فرائیڈ رائس',
   'Chinese fried rice with fresh vegetables',
   320, 'serving', (SELECT id FROM categories WHERE slug='chinese-style'),
   'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400',
   false, true, 2.0,
   'روزانہ تازہ سبزیوں کے ساتھ تیار',
   'Prepared daily with fresh vegetables',
   '{"calories": 340, "protein": "9g", "fiber": "3g", "carbs": "58g"}'),

  -- Super Healthy
  ('وھیٹ گراس جوس', 'Wheatgrass Juice',
   'تازہ وھیٹ گراس کا خالص جوس، مدافعتی نظام کے لیے',
   'Pure fresh wheatgrass juice, immune boosting',
   180, '100ml', (SELECT id FROM categories WHERE slug='super-healthy'),
   'https://images.unsplash.com/photo-1638189008691-aafb1f75c3a7?w=400',
   true, true, 3.5,
   'روزانہ صبح تازہ نکالا جاتا ہے، 7 دن پرانا وھیٹ گراس',
   'Cold-pressed fresh every morning from 7-day old wheatgrass',
   '{"calories": 10, "chlorophyll": "70mg", "enzymes": "high", "vitamin_e": "strong"}'),

  ('مائیکرو گرینز مکس', 'Microgreens Mix',
   'سنفلاور، مولی اور برکولی کے مائیکرو گرینز',
   'Mix of sunflower, radish and broccoli microgreens',
   250, '50g', (SELECT id FROM categories WHERE slug='super-healthy'),
   'https://images.unsplash.com/photo-1583663848850-46af53a07d6c?w=400',
   true, true, 3.0,
   '7-14 دن میں تیار، غذائی اعتبار سے بہت طاقتور',
   'Ready in 7-14 days, nutritionally 40x more powerful than full-grown',
   '{"calories": 25, "protein": "2.5g", "antioxidants": "very high", "vitamin_c": "40x normal"}');

-- Banners
INSERT INTO banners (title_ur, title_en, subtitle_ur, subtitle_en, emoji, sort_order) VALUES
  ('تازہ ترین سبزیاں', 'Freshest Vegetables', 'آج ہی آرڈر کریں - تازہ ہائیڈروپونک', 'Order today - fresh hydroponic', '🌿', 1),
  ('مفت ڈیلیوری', 'Free Delivery', 'Rs 500 سے اوپر تمام آرڈر', 'All orders above Rs 500', '🚀', 2),
  ('TowerGreens Coins', 'TowerGreens Coins', 'آرڈر کریں اور Coins کمائیں', 'Order and earn Coins', '🪙', 3),
  ('جے کیش سے ادائیگی', 'Pay with JazzCash', '25% اضافی Coins پائیں', 'Get 25% bonus Coins', '📱', 4);
