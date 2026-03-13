import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { Package, MapPin, Check } from 'lucide-react'
import logo from '/logo.png'

const MOCK_ORDERS = [
    { id: 'TG-4821', customer: 'احمد علی', address: 'گلبرگ III، لاہور', phone: '03001234567', amount: 870, status: 'Out for Delivery', items: ['تازہ لیٹس ×2', 'مکس سلاد ×1'], payment: 'JazzCash', otp: '2847' },
    { id: 'TG-4820', customer: 'فاطمہ', address: 'ڈیفنس، لاہور', phone: '03011234567', amount: 350, status: 'Out for Delivery', items: ['مکس سلاد باول ×1'], payment: 'COD', otp: '5932' },
]

export default function RiderDashboard() {
    const navigate = useNavigate()
    const [activeOrder, setActiveOrder] = useState(null)
    const [showOtp, setShowOtp] = useState(false)

    return (
        <div style={{ background: '#F4F9F5', minHeight: '100vh' }}>
            {/* Rider Header */}
            <div style={{ background: '#080E0A', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <img src={logo} alt="" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                <span style={{ color: '#4ADE80', fontWeight: 700, fontSize: '15px' }}>RIDER PANEL</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ADE80', boxShadow: '0 0 8px rgba(74,222,128,0.6)' }} />
                    <span style={{ color: '#4ADE80', fontSize: '13px' }}>Online</span>
                </div>
            </div>

            <div style={{ padding: '16px' }}>
                {/* Today's stats */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                    {[{ l: 'Orders Done', v: 4 }, { l: 'Earnings', v: 'Rs 400' }, { l: 'Pending', v: 2 }].map((s, i) => (
                        <div key={i} style={{ background: '#fff', borderRadius: '12px', padding: '16px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                            <p style={{ fontSize: '20px', fontWeight: 700, color: '#080E0A', fontFamily: 'var(--font-mono)' }}>{s.v}</p>
                            <p style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>{s.l}</p>
                        </div>
                    ))}
                </div>

                {/* Orders */}
                <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#080E0A', marginBottom: '12px' }}>
                    Active Orders ({MOCK_ORDERS.length})
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {MOCK_ORDERS.map(order => (
                        <div key={order.id} className="rider-order-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                <div>
                                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#4ADE80', fontWeight: 700 }}>{order.id}</p>
                                    <p className="urdu-text" style={{ fontSize: '15px', fontWeight: 700, color: '#080E0A', lineHeight: 2 }}>{order.customer}</p>
                                </div>
                                <span style={{ background: 'rgba(74,222,128,0.15)', color: '#16A34A', borderRadius: '9999px', padding: '4px 12px', fontSize: '12px', fontWeight: 700 }}>
                                    {order.payment}
                                </span>
                            </div>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', marginBottom: '8px' }}>
                                <MapPin size={16} color="#6B7280" style={{ flexShrink: 0, marginTop: '2px' }} />
                                <p className="urdu-text" style={{ fontSize: '13px', color: '#374151', lineHeight: 2 }}>{order.address}</p>
                            </div>
                            <p className="urdu-text" style={{ fontSize: '12px', color: '#6B7280', marginBottom: '12px', lineHeight: 2 }}>
                                {order.items.join(' · ')}
                            </p>
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#080E0A', fontSize: '18px' }}>Rs {order.amount}</span>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <a href={`tel:${order.phone}`} style={{ background: '#F3F4F6', border: 'none', borderRadius: '10px', padding: '10px 16px', fontSize: '13px', fontWeight: 600, color: '#374151', textDecoration: 'none', display: 'inline-block' }}>
                                        📞 Call
                                    </a>
                                    <button onClick={() => { setActiveOrder(order); setShowOtp(true) }} style={{ background: '#16A34A', color: '#fff', border: 'none', borderRadius: '10px', padding: '10px 16px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Check size={14} /> Delivered
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* OTP Modal */}
            {showOtp && activeOrder && (
                <div className="overlay">
                    <div style={{ background: '#fff', borderRadius: '20px', padding: '32px', width: '90%', maxWidth: '360px', animation: 'modal-in 0.3s ease' }}>
                        <h3 className="urdu-text" style={{ fontSize: '18px', fontWeight: 700, color: '#080E0A', textAlign: 'center', marginBottom: '8px', lineHeight: 2 }}>ڈیلیوری تصدیق</h3>
                        <p className="urdu-text" style={{ color: '#6B7280', fontSize: '13px', textAlign: 'center', marginBottom: '24px', lineHeight: 2 }}>
                            گاہک سے OTP لیں — {activeOrder.customer}
                        </p>
                        <button onClick={() => navigate('/rider/otp-verify', { state: { order: activeOrder } })} style={{ width: '100%', background: '#16A34A', color: '#fff', border: 'none', borderRadius: '12px', padding: '16px', fontSize: '16px', fontWeight: 700, cursor: 'pointer' }}>
                            <span className="urdu-text">OTP درج کریں</span>
                        </button>
                        <button onClick={() => setShowOtp(false)} style={{ width: '100%', background: 'transparent', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '14px', fontSize: '14px', cursor: 'pointer', marginTop: '8px', color: '#6B7280' }}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
