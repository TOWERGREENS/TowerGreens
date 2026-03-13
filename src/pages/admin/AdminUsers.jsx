import { AdminLayout } from '../../components/admin/AdminLayout'

const MOCK_USERS = [
    { id: '1', name: 'احمد علی', email: 'ahmed@gmail.com', phone: '03001234567', role: 'customer', orders: 12, coins: 350, joinDate: 'Jan 2026' },
    { id: '2', name: 'فاطمہ زہراء', email: 'fatima@gmail.com', phone: '03011234567', role: 'customer', orders: 7, coins: 125, joinDate: 'Feb 2026' },
    { id: '3', name: 'عمر شیخ', email: 'omar@gmail.com', phone: '03211234567', role: 'customer', orders: 3, coins: 0, joinDate: 'Mar 2026' },
]

export default function AdminUsers() {
    return (
        <AdminLayout title="Users Management">
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                {[{ l: 'Total Users', v: MOCK_USERS.length }, { l: 'Active', v: 2 }, { l: 'Banned', v: 0 }].map((s, i) => (
                    <div key={i} className="admin-card" style={{ flex: 1 }}>
                        <p style={{ fontSize: '24px', fontWeight: 700, color: '#fff' }}>{s.v}</p>
                        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{s.l}</p>
                    </div>
                ))}
            </div>
            <div className="admin-card">
                <table className="admin-table">
                    <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Orders</th><th>Coins</th><th>Joined</th><th>Actions</th></tr></thead>
                    <tbody>
                        {MOCK_USERS.map(u => (
                            <tr key={u.id}>
                                <td><span className="urdu-text" style={{ lineHeight: 2 }}>{u.name}</span></td>
                                <td style={{ fontSize: '13px' }}>{u.email}</td>
                                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}>{u.phone}</td>
                                <td><span className="status-badge status-accepted">{u.orders}</span></td>
                                <td style={{ color: '#F59E0B', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>🪙 {u.coins}</td>
                                <td style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{u.joinDate}</td>
                                <td>
                                    <div style={{ display: 'flex', gap: '6px' }}>
                                        <button style={{ background: 'rgba(74,222,128,0.15)', color: '#4ADE80', border: 'none', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', fontSize: '12px' }}>View</button>
                                        <button style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444', border: 'none', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', fontSize: '12px' }}>Ban</button>
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
