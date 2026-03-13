import { useState } from 'react'
import { AdminLayout } from '../../components/admin/AdminLayout'
import { useApp } from '../../context/AppContext'

const STATUS_LABELS = { Placed: 'Pending', Accepted: 'Accepted', Preparing: 'Preparing', 'Out for Delivery': 'Out for Delivery', Delivered: 'Delivered', Rejected: 'Rejected' }
const STATUS_COLORS = { Placed: 'status-placed', Accepted: 'status-accepted', Preparing: 'status-preparing', 'Out for Delivery': 'status-delivery', Delivered: 'status-delivered', Rejected: 'status-rejected' }

const MOCK_ORDERS = [
    { id: 'TG-4821', customer: 'احمد علی', phone: '03001234567', amount: 870, status: 'Placed', payment: 'JazzCash', date: '5 Mar 2026 14:25', items: ['تازہ لیٹس ×2', 'مکس سلاد باول ×1'], address: 'گلبرگ III، لاہور' },
    { id: 'TG-4820', customer: 'فاطمہ زہراء', phone: '03011234567', amount: 350, status: 'Preparing', payment: 'COD', date: '5 Mar 2026 13:10', items: ['مکس سلاد باول ×1'], address: 'ڈیفنس لاہور' },
    { id: 'TG-4819', customer: 'عمر شیخ', phone: '03211234567', amount: 450, status: 'Out for Delivery', payment: 'JazzCash', date: '5 Mar 2026 12:00', items: ['گرین سموتھی ×1', 'مائیکرو گرینز ×1'], address: 'کینال روڈ' },
    { id: 'TG-4818', customer: 'عائشہ خان', phone: '03311234567', amount: 280, status: 'Delivered', payment: 'COD', date: '5 Mar 2026 10:30', items: ['گرین سموتھی ×1'], address: 'سمن آباد' },
    { id: 'TG-4817', customer: 'بلال رضا', phone: '03421234567', amount: 620, status: 'Rejected', payment: 'JazzCash', date: '5 Mar 2026 09:15', items: ['چائنیز مکس ویج ×1', 'سبز پالک ×2'], address: 'فیصل ٹاؤن' },
]

export default function AdminOrders() {
    const [filter, setFilter] = useState('all')
    const [detailOrder, setDetailOrder] = useState(null)
    const [orders, setOrders] = useState(MOCK_ORDERS)

    const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter)

    const updateStatus = (id, newStatus) => {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o))
        setDetailOrder(null)
    }

    const filters = ['all', 'Placed', 'Preparing', 'Out for Delivery', 'Delivered', 'Rejected']

    return (
        <AdminLayout title="Orders Management">
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                {filters.map(f => (
                    <button key={f} onClick={() => setFilter(f)} style={{ padding: '6px 16px', borderRadius: '9999px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, background: filter === f ? '#4ADE80' : 'rgba(255,255,255,0.06)', color: filter === f ? '#080E0A' : 'rgba(255,255,255,0.6)', transition: 'all 0.2s ease' }}>
                        {f === 'all' ? 'All' : STATUS_LABELS[f]} {orders.filter(o => f === 'all' ? true : o.status === f).length}
                    </button>
                ))}
            </div>

            <div className="admin-card">
                <table className="admin-table">
                    <thead><tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Amount</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>
                        {filtered.map(o => (
                            <tr key={o.id}>
                                <td style={{ fontFamily: 'var(--font-mono)', color: '#4ADE80', fontSize: '12px' }}>{o.id}</td>
                                <td>
                                    <div>
                                        <span className="urdu-text" style={{ display: 'block', lineHeight: 2, color: '#fff' }}>{o.customer}</span>
                                        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{o.phone}</span>
                                    </div>
                                </td>
                                <td><span className="urdu-text" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', lineHeight: 2 }}>{o.items.join(', ')}</span></td>
                                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#4ADE80' }}>Rs {o.amount}</td>
                                <td style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{o.date}</td>
                                <td><span className={`status-badge ${STATUS_COLORS[o.status]}`}>{o.status}</span></td>
                                <td>
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        <button onClick={() => setDetailOrder(o)} style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: 'none', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', fontSize: '12px' }}>Details</button>
                                        {o.status === 'Placed' && (
                                            <>
                                                <button onClick={() => updateStatus(o.id, 'Accepted')} style={{ background: 'rgba(74,222,128,0.15)', color: '#4ADE80', border: 'none', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', fontSize: '12px' }}>Accept</button>
                                                <button onClick={() => updateStatus(o.id, 'Rejected')} style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444', border: 'none', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', fontSize: '12px' }}>Reject</button>
                                            </>
                                        )}
                                        {o.status === 'Accepted' && <button onClick={() => updateStatus(o.id, 'Preparing')} style={{ background: 'rgba(139,92,246,0.15)', color: '#8B5CF6', border: 'none', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', fontSize: '12px' }}>Prepare</button>}
                                        {o.status === 'Preparing' && <button onClick={() => updateStatus(o.id, 'Out for Delivery')} style={{ background: 'rgba(249,115,22,0.15)', color: '#F97316', border: 'none', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', fontSize: '12px' }}>→ Rider</button>}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Order Detail Modal */}
            {detailOrder && (
                <div className="overlay" onClick={() => setDetailOrder(null)}>
                    <div className="modal" onClick={e => e.stopPropagation()} style={{ background: '#141820', color: '#fff', maxWidth: '520px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <h3 style={{ fontFamily: 'var(--font-mono)', color: '#4ADE80' }}>{detailOrder.id}</h3>
                            <button onClick={() => setDetailOrder(null)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '20px' }}>✕</button>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                            {[
                                ['Customer', <span className="urdu-text" key="c" style={{ lineHeight: 2 }}>{detailOrder.customer}</span>],
                                ['Phone', detailOrder.phone],
                                ['Payment', detailOrder.payment],
                                ['Amount', `Rs ${detailOrder.amount}`],
                            ].map(([label, val], i) => (
                                <div key={i} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '12px' }}>
                                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
                                    <p style={{ fontWeight: 600 }}>{val}</p>
                                </div>
                            ))}
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '12px', marginBottom: '16px' }}>
                            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Address</p>
                            <p className="urdu-text" style={{ lineHeight: 2 }}>{detailOrder.address}</p>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '12px', marginBottom: '20px' }}>
                            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Items</p>
                            {detailOrder.items.map((item, i) => <p key={i} className="urdu-text" style={{ lineHeight: 2, fontSize: '14px' }}>{item}</p>)}
                        </div>
                        {detailOrder.status === 'Placed' && (
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button onClick={() => updateStatus(detailOrder.id, 'Accepted')} className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>✓ Accept</button>
                                <button onClick={() => updateStatus(detailOrder.id, 'Rejected')} className="btn-danger" style={{ flex: 1 }}>✕ Reject</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </AdminLayout>
    )
}
