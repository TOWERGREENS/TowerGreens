import { AdminLayout } from '../../components/admin/AdminLayout'

const RIDERS = [
    { id: 'R1', name: 'علی حسین', phone: '03001112233', area: 'گلبرگ', ordersToday: 4, earnings: 'Rs 400', status: 'active' },
    { id: 'R2', name: 'احمد رضوی', phone: '03111112233', area: 'ڈیفنس', ordersToday: 2, earnings: 'Rs 200', status: 'on-delivery' },
    { id: 'R3', name: 'محمد کاشف', phone: '03211112233', area: 'فیصل ٹاؤن', ordersToday: 6, earnings: 'Rs 600', status: 'inactive' },
]

const STATUS = { active: { color: '#4ADE80', label: 'Active' }, 'on-delivery': { color: '#F59E0B', label: 'On Delivery' }, inactive: { color: '#ef4444', label: 'Offline' } }

export default function AdminRiders() {
    return (
        <AdminLayout title="Riders Management">
            <div className="admin-card">
                <table className="admin-table">
                    <thead><tr><th>Rider</th><th>Phone</th><th>Area</th><th>Today Orders</th><th>Earnings</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>
                        {RIDERS.map(r => (
                            <tr key={r.id}>
                                <td><span className="urdu-text" style={{ lineHeight: 2 }}>{r.name}</span></td>
                                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}>{r.phone}</td>
                                <td><span className="urdu-text" style={{ lineHeight: 2 }}>{r.area}</span></td>
                                <td style={{ fontFamily: 'var(--font-mono)' }}>{r.ordersToday}</td>
                                <td style={{ fontFamily: 'var(--font-mono)', color: '#4ADE80' }}>{r.earnings}</td>
                                <td>
                                    <span style={{ padding: '4px 10px', borderRadius: '9999px', fontSize: '12px', fontWeight: 600, background: `${STATUS[r.status].color}20`, color: STATUS[r.status].color }}>
                                        ● {STATUS[r.status].label}
                                    </span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: '6px' }}>
                                        <button style={{ background: 'rgba(74,222,128,0.15)', color: '#4ADE80', border: 'none', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', fontSize: '12px' }}>Assign</button>
                                        <button style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444', border: 'none', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', fontSize: '12px' }}>Remove</button>
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
