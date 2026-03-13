// Order service
import insforge from './insforge'

export const orderService = {
    async create({ userId, items, paymentMethod, address, coinsDiscount = 0 }) {
        const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
        const deliveryFee = subtotal >= 500 ? 0 : 70
        const total = subtotal + deliveryFee - coinsDiscount
        const coinsEarned = Math.floor(total * 0.01)   // 1% base
        const otp = Math.floor(10000000 + Math.random() * 90000000).toString()  // 8-digit

        // 1. Create order
        const { data: order, error: orderErr } = await insforge.database
            .from('orders')
            .insert([{
                user_id: userId,
                payment_method: paymentMethod,
                payment_status: paymentMethod === 'jazzcash' ? 'paid' : 'unpaid',
                subtotal, delivery_fee: deliveryFee, coins_discount: coinsDiscount,
                total, delivery_address: address,
                coins_earned: coinsEarned,
                otp, otp_claimed: false,
                estimated_delivery_at: new Date(Date.now() + 45 * 60000).toISOString(),
            }])
            .select()
            .maybeSingle()
        if (orderErr) throw orderErr

        // 2. Create order items
        const orderItems = items.map(i => ({
            order_id: order.id,
            product_id: i.id,
            name_ur: i.name_ur || i.name,
            name_en: i.name_en || i.name,
            image_url: i.image_url || i.image,
            price: i.price,
            quantity: i.quantity,
        }))
        const { error: itemsErr } = await insforge.database
            .from('order_items').insert(orderItems)
        if (itemsErr) throw itemsErr

        // 3. Insert notification
        await insforge.database.from('notifications').insert([{
            user_id: userId,
            title_ur: 'آرڈر موصول',
            title_en: 'Order Received',
            body_ur: `آپ کا آرڈر ${order.id} موصول ہو گیا`,
            body_en: `Your order ${order.id} has been received`,
            type: 'order',
            order_id: order.id,
        }])

        return order
    },

    async getByUser(userId, limit = 20) {
        const { data, error } = await insforge.database
            .from('orders')
            .select('*, order_items(id, name_ur, name_en, price, quantity, image_url)')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(limit)
        if (error) throw error
        return data || []
    },

    async getById(orderId) {
        const { data, error } = await insforge.database
            .from('orders')
            .select('*, order_items(id, name_ur, name_en, price, quantity, image_url, product_id)')
            .eq('id', orderId)
            .maybeSingle()
        if (error) throw error
        return data
    },

    async updateStatus(orderId, status, extra = {}) {
        const updates = { status, ...extra }
        if (status === 'delivered') updates.delivered_at = new Date().toISOString()
        const { data, error } = await insforge.database
            .from('orders').update(updates).eq('id', orderId).select().maybeSingle()
        if (error) throw error
        return data
    },

    async claimOtpCoins(orderId, userId, otp) {
        const { data: order } = await insforge.database
            .from('orders').select('otp, coins_earned, otp_claimed').eq('id', orderId).maybeSingle()
        if (!order) throw new Error('Order not found')
        if (order.otp_claimed) throw new Error('Already claimed')
        if (order.otp !== otp) throw new Error('Invalid OTP')

        // Mark claimed
        await insforge.database.from('orders').update({ otp_claimed: true }).eq('id', orderId)

        // Add coins to ledger
        await insforge.database.from('coins_ledger').insert([{
            user_id: userId, order_id: orderId,
            type: 'earn', amount: order.coins_earned,
            reason_ur: `آرڈر ${orderId} — OTP تصدیق`,
            reason_en: `Order ${orderId} — OTP verified`,
        }])

        // Update profile balance
        const { data: profile } = await insforge.database
            .from('profiles').select('coins_balance').eq('id', userId).maybeSingle()
        await insforge.database.from('profiles')
            .update({ coins_balance: (profile?.coins_balance || 0) + order.coins_earned })
            .eq('id', userId)

        return order.coins_earned
    },

    // Admin
    async getAll(limit = 100) {
        const { data, error } = await insforge.database
            .from('orders')
            .select('*, order_items(id, name_ur, price, quantity), profiles!orders_user_id_fkey(name, phone)')
            .order('created_at', { ascending: false })
            .limit(limit)
        if (error) throw error
        return data || []
    },
}
