import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { Trash2, ShoppingBag } from 'lucide-react'
import BottomNav from '../../components/app/BottomNav'
import AppHeader from '../../components/app/AppHeader'

export default function CartPage() {
    const { cart, removeFromCart, updateCartQuantity, cartTotal, user, language, navigate: nav } = useApp()
    const navigate = useNavigate()
    const [coinsUsed, setCoinsUsed] = useState(false)
    const isUrdu = language === 'ur' || !language

    const discount = coinsUsed ? 500 : 0
    const total = Math.max(0, cartTotal - discount)
    const canUseCoins = user?.coinsBalance >= 500

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: '80px' }}>
            <AppHeader title={isUrdu ? 'آپ کا کارٹ' : 'Your Cart'} />

            <div style={{ padding: '16px' }}>
                {cart.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '80px 0' }}>
                        <div style={{ fontSize: '80px', marginBottom: '16px' }}>🧺</div>
                        <h2 className="urdu-text" style={{ fontSize: '22px', color: 'var(--text-muted)', marginBottom: '8px', lineHeight: 2 }}>
                            {isUrdu ? 'کارٹ خالی ہے' : 'Cart is empty'}
                        </h2>
                        <p className="urdu-text" style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px', lineHeight: 2 }}>
                            {isUrdu ? 'کچھ تازہ سبزیاں شامل کریں!' : 'Add some fresh items!'}
                        </p>
                        <button className="btn-primary" onClick={() => navigate('/app/products')} id="cart-shop-btn">
                            <span className="urdu-text">{isUrdu ? 'خریداری شروع کریں' : 'Start Shopping'}</span>
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Cart Items */}
                        <div className="glass-card" style={{ marginBottom: '16px', padding: 0, overflow: 'hidden' }}>
                            {cart.map((item, i) => (
                                <CartItem key={item.id} item={item} isLast={i === cart.length - 1} onRemove={removeFromCart} onUpdate={updateCartQuantity} isUrdu={isUrdu} />
                            ))}
                        </div>

                        {/* Coins widget */}
                        {canUseCoins && !coinsUsed && (
                            <div className="glass-card" style={{ marginBottom: '16px', padding: '16px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
                                <p className="urdu-text" style={{ fontSize: '14px', fontWeight: 600, color: '#F59E0B', marginBottom: '12px', lineHeight: 2 }}>
                                    🪙 500 TowerGreens Coins استعمال کریں؟
                                </p>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button className="btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: '13px', padding: '10px' }} onClick={() => setCoinsUsed(true)} id="use-coins-yes">
                                        <span className="urdu-text">ہاں، Rs 500 کی چھوٹ لیں</span>
                                    </button>
                                    <button className="btn-ghost" style={{ padding: '10px 16px', fontSize: '13px' }}>
                                        <span className="urdu-text">نہیں</span>
                                    </button>
                                </div>
                            </div>
                        )}
                        {coinsUsed && (
                            <div className="glass-card" style={{ marginBottom: '16px', padding: '12px 16px', background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)' }}>
                                <p className="urdu-text" style={{ color: '#4ADE80', fontSize: '13px', lineHeight: 2 }}>🪙 500 Coins استعمال کیے گئے — Rs 500 کی چھوٹ</p>
                            </div>
                        )}

                        {/* Order Summary */}
                        <div className="glass-card" style={{ marginBottom: '16px', padding: '20px' }}>
                            <h3 className="urdu-text" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)', marginBottom: '16px', lineHeight: 2 }}>
                                {isUrdu ? 'آرڈر سمری' : 'Order Summary'}
                            </h3>
                            <SummaryRow label={isUrdu ? 'آئٹمز کل' : 'Subtotal'} value={`Rs ${cartTotal}`} />
                            <SummaryRow label={isUrdu ? 'ڈیلیوری' : 'Delivery'} value={isUrdu ? 'مفت' : 'Free'} valueColor="#4ADE80" />
                            {coinsUsed && <SummaryRow label={isUrdu ? 'کوائنز چھوٹ' : 'Coins Discount'} value={`- Rs 500`} valueColor="#4ADE80" />}
                            <div style={{ height: '1px', background: 'rgba(74,222,128,0.15)', margin: '12px 0' }} />
                            <SummaryRow label={isUrdu ? 'کل ادائیگی' : 'Total'} value={`Rs ${total}`} bold />
                        </div>

                        <button className="btn-primary w-full" style={{ justifyContent: 'center', padding: '16px', fontSize: '16px' }} onClick={() => navigate('/app/checkout')} id="cart-checkout-btn">
                            <span className="urdu-text">{isUrdu ? 'چیک آؤٹ پر جائیں' : 'Proceed to Checkout'}</span>
                        </button>
                    </>
                )}
            </div>
            <BottomNav />
        </div>
    )
}

function CartItem({ item, isLast, onRemove, onUpdate, isUrdu }) {
    const [removing, setRemoving] = useState(false)

    const handleRemove = () => {
        setRemoving(true)
        setTimeout(() => onRemove(item.id), 280)
    }

    return (
        <div style={{
            display: 'flex', gap: '12px', padding: '16px',
            borderBottom: isLast ? 'none' : '1px solid rgba(74,222,128,0.06)',
            opacity: removing ? 0 : 1,
            transform: removing ? 'translateX(-20px)' : 'translateX(0)',
            transition: 'opacity 0.28s ease, transform 0.28s ease, max-height 0.3s ease',
            maxHeight: removing ? '0' : '120px',
            overflow: 'hidden',
        }}>
            <img src={item.images?.[0]} alt={item.nameUrdu} style={{ width: '60px', height: '60px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
                <p className="urdu-text" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)', marginBottom: '8px', lineHeight: 1.8 }}>{isUrdu ? item.nameUrdu : item.nameEn}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)', color: 'var(--accent)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }} onClick={() => onUpdate(item.id, item.quantity - 1)}>-</button>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{item.quantity}</span>
                    <button style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)', color: 'var(--accent)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }} onClick={() => onUpdate(item.id, item.quantity + 1)}>+</button>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontWeight: 700 }}>Rs {item.price * item.quantity}</span>
                <button onClick={handleRemove} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={16} /></button>
            </div>
        </div>
    )
}

function SummaryRow({ label, value, valueColor, bold }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span className="urdu-text" style={{ fontSize: '14px', color: bold ? 'var(--text)' : 'var(--text-muted)', fontWeight: bold ? 700 : 400, lineHeight: 2 }}>{label}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: bold ? '18px' : '14px', fontWeight: bold ? 700 : 500, color: valueColor || 'var(--text)' }}>{value}</span>
        </div>
    )
}
