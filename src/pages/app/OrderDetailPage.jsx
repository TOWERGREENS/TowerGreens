import { useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { ArrowLeft } from 'lucide-react'
import BottomNav from '../../components/app/BottomNav'

const STATUS_STEPS = [
    { key: 'Placed', ur: 'آرڈر موصول', en: 'Order Placed' },
    { key: 'Accepted', ur: 'آرڈر قبول', en: 'Accepted' },
    { key: 'Preparing', ur: 'تیاری جاری ہے', en: 'Preparing' },
    { key: 'Out for Delivery', ur: 'ڈیلیوری پر ہے', en: 'Out for Delivery' },
    { key: 'Delivered', ur: 'پہنچ گیا', en: 'Delivered' },
]

export default function OrderDetailPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const { language } = useApp()
    const order = location.state?.order || {
        id: 'TG-20260305-4821', orderStatus: 'Preparing', totalAmount: 870,
        paymentMethod: 'JazzCash', paymentStatus: 'Paid',
        createdAt: new Date().toISOString(),
        items: [{ id: '1', nameUrdu: 'تازہ لیٹس', quantity: 2, price: 120, images: ['https://images.unsplash.com/photo-1518977676405-d4b8e4c2c1b9?w=200'] }],
        deliveryAddress: { name: 'احمد علی', phone: '03001234567', address: 'گلبرگ، لاہور', city: 'لاہور' }
    }
    const isUrdu = language === 'ur' || !language
    const currentIdx = STATUS_STEPS.findIndex(s => s.key === order.orderStatus)

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: '80px', paddingTop: '60px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', position: 'fixed', top: 0, left: 0, right: 0, background: 'rgba(8,14,10,0.92)', backdropFilter: 'blur(16px)', zIndex: 50, borderBottom: '1px solid rgba(74,222,128,0.06)' }}>
                <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer' }}><ArrowLeft size={20} /></button>
                <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--accent)' }}>{order.id}</h1>
            </div>

            <div style={{ padding: '16px' }}>
                {/* Status tracker */}
                <div className="glass-card" style={{ padding: '24px', marginBottom: '16px' }}>
                    <h2 className="urdu-text" style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', lineHeight: 2 }}>
                        {isUrdu ? 'آرڈر کی حیثیت' : 'Order Status'}
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                        {STATUS_STEPS.map((step, i) => {
                            const isComplete = i < currentIdx
                            const isCurrent = i === currentIdx
                            const isFuture = i > currentIdx
                            return (
                                <div key={step.key} style={{ display: 'flex', gap: '16px', paddingBottom: i < STATUS_STEPS.length - 1 ? '20px' : '0' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <div style={{
                                            width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0,
                                            background: isComplete ? '#4ADE80' : isCurrent ? 'transparent' : 'rgba(255,255,255,0.06)',
                                            border: isCurrent ? '2px solid #4ADE80' : isComplete ? 'none' : '2px solid rgba(255,255,255,0.15)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            boxShadow: isCurrent ? '0 0 12px rgba(74,222,128,0.6)' : 'none',
                                            animation: isCurrent ? 'glow-pulse 1.5s ease-in-out infinite' : 'none',
                                        }}>
                                            {isComplete ? <span style={{ fontSize: '12px', color: '#080E0A' }}>✓</span> : isCurrent ? <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ADE80' }} /> : null}
                                        </div>
                                        {i < STATUS_STEPS.length - 1 && (
                                            <div style={{ width: '2px', flex: 1, minHeight: '20px', background: isComplete ? '#4ADE80' : 'rgba(255,255,255,0.1)', marginTop: '4px' }} />
                                        )}
                                    </div>
                                    <div style={{ paddingBottom: '4px' }}>
                                        <p className="urdu-text" style={{ fontSize: '14px', fontWeight: isCurrent ? 700 : 500, color: isFuture ? 'var(--text-muted)' : 'var(--text)', lineHeight: 2 }}>
                                            {isUrdu ? step.ur : step.en}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Items */}
                <div className="glass-card" style={{ padding: '16px', marginBottom: '16px' }}>
                    <h3 className="urdu-text" style={{ fontSize: '15px', fontWeight: 700, marginBottom: '12px', lineHeight: 2 }}>
                        {isUrdu ? 'آرڈر آئٹمز' : 'Order Items'}
                    </h3>
                    {order.items?.map((item, i) => (
                        <div key={i} style={{ display: 'flex', gap: '12px', padding: '10px 0', borderBottom: i < order.items.length - 1 ? '1px solid rgba(74,222,128,0.06)' : 'none' }}>
                            {item.images?.[0] && <img src={item.images[0]} alt="" style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />}
                            <div style={{ flex: 1 }}>
                                <p className="urdu-text" style={{ fontSize: '14px', fontWeight: 600, lineHeight: 1.8 }}>{item.nameUrdu}</p>
                                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>× {item.quantity}</p>
                            </div>
                            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontWeight: 700 }}>Rs {item.price * item.quantity}</span>
                        </div>
                    ))}
                </div>

                {/* Payment */}
                <div className="glass-card" style={{ padding: '16px', marginBottom: '16px' }}>
                    <p className="urdu-text" style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px', lineHeight: 2 }}>{isUrdu ? 'ادائیگی کی تفصیل' : 'Payment Details'}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className="urdu-text" style={{ fontSize: '14px', lineHeight: 2 }}>{order.paymentMethod}</span>
                        <span className="status-badge status-delivered">
                            <span className="urdu-text" style={{ lineHeight: 2 }}>✓ {order.paymentStatus === 'Paid' ? (isUrdu ? 'کامیاب' : 'Paid') : (isUrdu ? 'باقی' : 'Pending')}</span>
                        </span>
                    </div>
                    <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
                        <span className="urdu-text" style={{ fontWeight: 700, fontSize: '15px', lineHeight: 2 }}>{isUrdu ? 'کل' : 'Total'}</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '18px', color: 'var(--accent)' }}>Rs {order.totalAmount}</span>
                    </div>
                </div>
            </div>
            <BottomNav />
        </div>
    )
}
