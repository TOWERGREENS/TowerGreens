import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { ChevronRight } from 'lucide-react'
import BottomNav from '../../components/app/BottomNav'
import AppHeader from '../../components/app/AppHeader'

const STATUS_STEPS = ['Placed', 'Accepted', 'Preparing', 'Out for Delivery', 'Delivered']
const STATUS_LABELS = { Placed: 'موصول', Accepted: 'قبول', Preparing: 'تیاری', 'Out for Delivery': 'راستے میں', Delivered: 'پہنچ گیا', Rejected: 'مسترد' }

const STATUS_COLORS = { pending: '#F59E0B', accepted: '#4ADE80', preparing: '#60A5FA', dispatched: '#818CF8', delivered: '#22C55E', cancelled: '#EF4444', rejected: '#EF4444' }

export default function OrdersPage() {
    const { orders, loadOrders, language } = useApp()
    const navigate = useNavigate()
    const isUrdu = language === 'ur' || !language

    useEffect(() => { loadOrders() }, [])

    const displayOrders = orders

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: '80px' }}>
            <AppHeader title={isUrdu ? 'میرے آرڈرز' : 'My Orders'} />
            <div style={{ padding: '16px' }}>
                {mockOrders.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '80px 0' }}>
                        <div style={{ fontSize: '64px', marginBottom: '16px' }}>📦</div>
                        <p className="urdu-text" style={{ color: 'var(--text-muted)', fontSize: '18px', lineHeight: 2 }}>
                            {isUrdu ? 'کوئی آرڈر نہیں' : 'No orders yet'}
                        </p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {displayOrders.map(order => {
                            const status = order.status
                            const statusColor = STATUS_COLORS[status] || '#4ADE80'
                            const steps = ['pending', 'accepted', 'preparing', 'dispatched', 'delivered']
                            const statusIdx = steps.indexOf(status)
                            return (
                                <div key={order.id} className="glass-card" onClick={() => navigate(`/app/orders/${order.id}`, { state: { order } })} style={{ padding: '16px', cursor: 'pointer', transition: 'all 0.2s ease', borderLeft: `3px solid ${statusColor}` }} id={`order-${order.id}`}
                                    onMouseEnter={e => e.currentTarget.style.borderColor = statusColor}
                                    onMouseLeave={e => e.currentTarget.style.borderLeftColor = statusColor}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                        <div>
                                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent)', marginBottom: '4px' }}>{order.id}</p>
                                            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{new Date(order.created_at).toLocaleDateString('ur-PK')}</p>
                                        </div>
                                        <span style={{ padding: '4px 10px', borderRadius: '99px', background: `${statusColor}20`, color: statusColor, fontSize: '11px', fontWeight: 700 }}>
                                            <span className="urdu-text" style={{ lineHeight: 2 }}>{STATUS_LABELS[status] || status}</span>
                                        </span>
                                    </div>
                                    {/* Status bar */}
                                    {order.orderStatus !== 'Rejected' && (
                                        <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                                            {STATUS_STEPS.slice(0, 5).map((s, i) => (
                                                <div key={s} style={{ flex: 1, height: '3px', borderRadius: '2px', background: i <= statusIdx ? '#4ADE80' : 'rgba(74,222,128,0.15)', transition: 'background 0.3s ease' }} />
                                            ))}
                                        </div>
                                    )}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span className="urdu-text" style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 2 }}>
                                            {order.order_items?.length || 0} {isUrdu ? 'آئٹم' : 'items'} • {order.payment_method?.toUpperCase()}
                                        </span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent)' }}>Rs {order.total}</span>
                                            <ChevronRight size={16} color="var(--text-muted)" />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
            <BottomNav />
        </div>
    )
}
