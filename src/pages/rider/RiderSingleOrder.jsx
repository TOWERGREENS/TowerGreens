import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Phone } from 'lucide-react'
import { useApp } from '../../context/AppContext'

const MOCK_ORDERS = {
    '101': {
        id: '101', customer: 'احمد علی', phone: '03001234567', address: 'گلبرگ، لاہور', items: [
            { name: 'مکس سلاد باول', qty: 2, price: 700 },
            { name: 'تازہ لیٹس', qty: 1, price: 120 },
        ], total: 820, paymentMethod: 'JazzCash', paymentPaid: true, otp: '12345678'
    },
    '102': {
        id: '102', customer: 'فاطمہ زہراء', phone: '03009876543', address: 'ڈیفینس، لاہور', items: [
            { name: 'گرین سموتھی', qty: 1, price: 280 },
        ], total: 280, paymentMethod: 'COD', paymentPaid: false, otp: null
    },
}

export default function RiderSingleOrder() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { language } = useApp()
    const isUrdu = language === 'ur' || !language
    const order = MOCK_ORDERS[id] || MOCK_ORDERS['101']
    const isJazzCash = order.paymentMethod === 'JazzCash'

    return (
        <div style={{ minHeight: '100vh', background: '#F4F9F5', fontFamily: 'system-ui, sans-serif' }}>
            {/* Header */}
            <div style={{ background: '#fff', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 10 }}>
                <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><ArrowLeft size={22} color="#080E0A" /></button>
                <h1 className="urdu-text" style={{ fontSize: '18px', fontWeight: 700, color: '#080E0A', lineHeight: 2 }}>
                    {isUrdu ? `آرڈر #${order.id}` : `Order #${order.id}`}
                </h1>
                <div style={{ marginLeft: 'auto', padding: '4px 12px', borderRadius: '9999px', background: isJazzCash ? '#DCFCE7' : '#FEF3C7', color: isJazzCash ? '#16A34A' : '#D97706', fontSize: '12px', fontWeight: 700 }}>
                    {isJazzCash ? 'JazzCash ✓' : 'COD'}
                </div>
            </div>

            <div style={{ padding: '20px 16px' }}>
                {/* Customer Info */}
                <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '12px', borderLeft: `4px solid ${isJazzCash ? '#16A34A' : '#F97316'}` }}>
                    <p className="urdu-text" style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px', lineHeight: 2 }}>{isUrdu ? 'گاہک' : 'Customer'}</p>
                    <h3 className="urdu-text" style={{ fontSize: '18px', fontWeight: 700, color: '#080E0A', lineHeight: 2 }}>{order.customer}</h3>
                    <a href={`tel:${order.phone}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16A34A', textDecoration: 'none', fontSize: '15px', fontWeight: 600, marginTop: '8px' }}>
                        <Phone size={16} />
                        <span>{order.phone}</span>
                    </a>
                    <p className="urdu-text" style={{ color: '#6B7280', fontSize: '13px', marginTop: '6px', lineHeight: 1.8 }}>📍 {order.address}</p>
                </div>

                {/* Items */}
                <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '12px' }}>
                    <h3 className="urdu-text" style={{ fontWeight: 700, marginBottom: '12px', color: '#080E0A', lineHeight: 2 }}>{isUrdu ? 'آرڈر آئٹمز' : 'Order Items'}</h3>
                    {order.items.map((item, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < order.items.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
                            <div>
                                <p className="urdu-text" style={{ fontSize: '14px', fontWeight: 600, color: '#080E0A', lineHeight: 2 }}>{item.name}</p>
                                <p style={{ fontSize: '12px', color: '#6B7280' }}>x{item.qty}</p>
                            </div>
                            <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#080E0A' }}>Rs {item.price}</p>
                        </div>
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px', marginTop: '4px', borderTop: '2px solid #F3F4F6' }}>
                        <p className="urdu-text" style={{ fontWeight: 700, color: '#080E0A', lineHeight: 2 }}>{isUrdu ? 'کل' : 'Total'}</p>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', fontWeight: 700, color: '#16A34A' }}>Rs {order.total}</p>
                    </div>
                </div>

                {/* Payment */}
                <div style={{ background: '#fff', borderRadius: '16px', padding: '16px 20px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="urdu-text" style={{ fontSize: '14px', color: '#6B7280', lineHeight: 2 }}>{isUrdu ? 'ادائیگی' : 'Payment'}</span>
                        <span style={{ fontWeight: 700, color: isJazzCash ? '#16A34A' : '#D97706', fontSize: '14px' }}>
                            {isJazzCash ? 'JazzCash ✓ ادا شدہ' : 'COD — نقد لیں'}
                        </span>
                    </div>
                </div>

                {/* Deliver Button */}
                <button
                    style={{ width: '100%', height: '64px', background: '#16A34A', color: '#fff', border: 'none', borderRadius: '16px', fontSize: '18px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 24px rgba(22,163,74,0.35)', transition: 'all 0.2s ease' }}
                    onClick={() => navigate('/rider/otp-verify', { state: { order } })}
                    id="deliver-btn"
                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(22,163,74,0.45)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(22,163,74,0.35)' }}
                >
                    <span className="urdu-text" style={{ lineHeight: 2 }}>آرڈر ڈیلیور کر دیا ✓</span>
                </button>
            </div>
        </div>
    )
}
