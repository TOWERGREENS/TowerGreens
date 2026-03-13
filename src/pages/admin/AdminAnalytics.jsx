import { AdminLayout } from '../../components/admin/AdminLayout'
import { BarChart2, TrendingUp, ShoppingBag, Users } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts'

const DAILY_REVENUE = [
    { day: '1', revenue: 2400 }, { day: '3', revenue: 1800 }, { day: '5', revenue: 3200 },
    { day: '7', revenue: 2800 }, { day: '9', revenue: 4100 }, { day: '11', revenue: 3600 },
    { day: '13', revenue: 5200 }, { day: '15', revenue: 4700 }, { day: '17', revenue: 6100 },
    { day: '19', revenue: 5400 }, { day: '21', revenue: 7200 }, { day: '23', revenue: 6800 },
    { day: '25', revenue: 8100 }, { day: '27', revenue: 7600 }, { day: '29', revenue: 9200 },
]

const CAT_DATA = [
    { name: 'سبزیاں', value: 40, color: '#4ADE80' },
    { name: 'سلاد', value: 25, color: '#F59E0B' },
    { name: 'صحت مند', value: 20, color: '#60A5FA' },
    { name: 'چائنیز', value: 10, color: '#8B5CF6' },
    { name: 'دیگر', value: 5, color: '#F97316' },
]

const TOP_PRODUCTS = [
    { name: 'مکس سلاد باول', orders: 87 },
    { name: 'تازہ لیٹس', orders: 74 },
    { name: 'گرین سموتھی', orders: 62 },
    { name: 'چائنیز مکس ویج', orders: 51 },
    { name: 'سبز پالک', orders: 48 },
]

const CUSTOM_TOOLTIP = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{ background: '#141820', border: '1px solid rgba(74,222,128,0.2)', borderRadius: '8px', padding: '8px 12px' }}>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>Day {label}</p>
                <p style={{ color: '#4ADE80', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>Rs {payload[0].value.toLocaleString()}</p>
            </div>
        )
    }
    return null
}

export default function AdminAnalytics() {
    return (
        <AdminLayout title="Analytics">
            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '24px' }}>
                {[
                    { icon: TrendingUp, label: 'Total Revenue (Mar)', value: 'Rs 87,400', change: '+23%', color: '#4ADE80' },
                    { icon: ShoppingBag, label: 'Total Orders', value: '312', change: '+18%', color: '#60A5FA' },
                    { icon: Users, label: 'Active Users', value: '248', change: '+9%', color: '#F59E0B' },
                    { icon: BarChart2, label: 'Avg Order Value', value: 'Rs 280', change: '+5%', color: '#8B5CF6' },
                ].map((s, i) => {
                    const Icon = s.icon
                    return (
                        <div key={i} className="admin-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</p>
                                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '22px', fontWeight: 700, color: '#fff' }}>{s.value}</p>
                                </div>
                                <div style={{ background: `${s.color}1A`, borderRadius: '8px', padding: '8px' }}><Icon size={18} color={s.color} /></div>
                            </div>
                            <span style={{ fontSize: '11px', color: '#4ADE80', marginTop: '8px', display: 'block' }}>↑ {s.change} vs last month</span>
                        </div>
                    )
                })}
            </div>

            {/* Revenue chart */}
            <div className="admin-card" style={{ marginBottom: '24px' }}>
                <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Revenue — March 2026</h3>
                <ResponsiveContainer width="100%" height={240}>
                    <AreaChart data={DAILY_REVENUE}>
                        <defs>
                            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#4ADE80" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid stroke="rgba(255,255,255,0.04)" />
                        <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} />
                        <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} />
                        <Tooltip content={<CUSTOM_TOOLTIP />} />
                        <Area type="monotone" dataKey="revenue" stroke="#4ADE80" strokeWidth={2} fill="url(#revGrad)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {/* Category pie */}
                <div className="admin-card">
                    <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Sales by Category</h3>
                    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                        <PieChart width={160} height={160}>
                            <Pie data={CAT_DATA} cx={75} cy={75} innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                                {CAT_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                            </Pie>
                        </PieChart>
                        <div style={{ flex: 1 }}>
                            {CAT_DATA.map((c, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: c.color, flexShrink: 0 }} />
                                        <span className="urdu-text" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', lineHeight: 2 }}>{c.name}</span>
                                    </div>
                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: c.color }}>{c.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Top Products bar */}
                <div className="admin-card">
                    <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Top Products (Orders)</h3>
                    <ResponsiveContainer width="100%" height={160}>
                        <BarChart data={TOP_PRODUCTS} layout="vertical">
                            <XAxis type="number" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} />
                            <YAxis type="category" dataKey="name" tick={({ payload, x, y }) => (
                                <text x={x} y={y} dy={4} textAnchor="end" fill="rgba(255,255,255,0.5)" fontSize={10} fontFamily="var(--font-urdu)">{payload.value}</text>
                            )} width={90} />
                            <Tooltip contentStyle={{ background: '#141820', border: '1px solid rgba(74,222,128,0.2)', borderRadius: '8px', fontSize: '12px' }} />
                            <Bar dataKey="orders" fill="#4ADE80" radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </AdminLayout>
    )
}
