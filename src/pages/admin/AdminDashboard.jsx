import { useApp } from '../../context/AppContext'
import { AdminLayout } from '../../components/admin/AdminLayout'
import { TrendingUp, TrendingDown, Package, Users, ShoppingBag, AlertCircle } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const STATS = [
    { label: 'Today Orders', value: 24, change: '+12%', up: true, icon: Package, color: '#4ADE80' },
    { label: 'Revenue', value: 'Rs 18,450', change: '+8.5%', up: true, icon: TrendingUp, color: '#F59E0B' },
    { label: 'New Users', value: 7, change: '+3', up: true, icon: Users, color: '#60A5FA' },
    { label: 'Pending', value: 3, change: 'URGENT', up: false, icon: AlertCircle, color: '#ef4444', urgent: true },
]

const CHART_DATA = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    revenue: Math.floor(Math.random() * 15000 + 5000),
    orders: Math.floor(Math.random() * 30 + 10),
}))

const ORDERS = [
    { id: 'TG-4821', customer: 'احمد علی', amount: 870, status: 'Placed', payment: 'JazzCash' },
    { id: 'TG-4820', customer: 'فاطمہ', amount: 350, status: 'Preparing', payment: 'COD' },
    { id: 'TG-4819', customer: 'عمر شیخ', amount: 450, status: 'Out for Delivery', payment: 'JazzCash' },
    { id: 'TG-4818', customer: 'عائشہ', amount: 280, status: 'Delivered', payment: 'COD' },
    { id: 'TG-4817', customer: 'بلال', amount: 620, status: 'Rejected', payment: 'JazzCash' },
]

const STATUS_COLORS = {
    Placed: 'status-placed', Accepted: 'status-accepted', Preparing: 'status-preparing',
    'Out for Delivery': 'status-delivery', Delivered: 'status-delivered', Rejected: 'status-rejected',
}

export default function AdminDashboard() {
    return (
        <AdminLayout title="Dashboard">
            {/* Stat Cards */}
            <div className="grid-4" style={{ gap: '16px', marginBottom: '24px' }}>
                {STATS.map((stat, i) => {
                    const Icon = stat.icon
                    return (
                        <div key={i} className="admin-card" style={{ border: stat.urgent ? '1px solid rgba(239,68,68,0.3)' : undefined }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${stat.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Icon size={20} color={stat.color} />
                                </div>
                                <span style={{ fontSize: '12px', fontWeight: 600, color: stat.up ? '#4ADE80' : '#ef4444', background: stat.up ? 'rgba(74,222,128,0.1)' : 'rgba(239,68,68,0.1)', borderRadius: '6px', padding: '2px 8px' }}>
                                    {stat.change}
                                </span>
                            </div>
                            <div style={{ fontSize: '26px', fontWeight: 700, color: '#fff', marginBottom: '4px', fontFamily: stat.value.toString().startsWith('Rs') ? 'var(--font-mono)' : 'inherit' }}>{stat.value}</div>
                            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{stat.label}</div>
                        </div>
                    )
                })}
            </div>

            {/* Pending alert */}
            <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '12px', padding: '16px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', animation: 'glow-pulse 3s ease-in-out infinite' }}>
                <AlertCircle size={20} color="#F59E0B" />
                <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, color: '#F59E0B', fontSize: '14px' }}>3 Orders Awaiting Action</p>
                    <p style={{ fontSize: '12px', color: 'rgba(245,158,11,0.7)' }}>Review and accept/reject pending orders</p>
                </div>
                <a href="/admin/orders" style={{ background: '#F59E0B', color: '#080E0A', borderRadius: '8px', padding: '6px 14px', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>View Now →</a>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '24px' }}>
                {/* Revenue Chart */}
                <div className="admin-card">
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '20px' }}>Revenue — Last 30 Days</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={CHART_DATA}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 10 }} />
                            <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 10 }} />
                            <Tooltip contentStyle={{ background: '#141820', border: '1px solid rgba(74,222,128,0.2)', borderRadius: '10px', color: '#fff' }} />
                            <Line type="monotone" dataKey="revenue" stroke="#4ADE80" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Low Stock */}
                <div className="admin-card">
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>Low Stock Alerts</h3>
                    {['کیل چپس', 'گرین سموتھی'].map((p, i) => (
                        <div key={i} style={{ padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="urdu-text" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 2 }}>{p}</span>
                            <span className="status-badge status-rejected" style={{ fontSize: '11px' }}>Out of Stock</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Orders Table */}
            <div className="admin-card">
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>Recent Orders</h3>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Amount</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ORDERS.map(order => (
                            <tr key={order.id}>
                                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#4ADE80' }}>{order.id}</td>
                                <td><span className="urdu-text" style={{ lineHeight: 2 }}>{order.customer}</span></td>
                                <td style={{ fontFamily: 'var(--font-mono)' }}>Rs {order.amount}</td>
                                <td><span style={{ fontSize: '12px' }}>{order.payment}</span></td>
                                <td><span className={`status-badge ${STATUS_COLORS[order.status]}`}><span className="urdu-text" style={{ lineHeight: 2 }}>{order.status}</span></span></td>
                                <td>
                                    <div style={{ display: 'flex', gap: '6px' }}>
                                        {order.status === 'Placed' && <>
                                            <button style={{ background: 'rgba(74,222,128,0.15)', color: '#4ADE80', border: 'none', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', fontSize: '12px' }}>Accept</button>
                                            <button style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444', border: 'none', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', fontSize: '12px' }}>Reject</button>
                                        </>}
                                        <button style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', border: 'none', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', fontSize: '12px' }}>Details</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    )
}
