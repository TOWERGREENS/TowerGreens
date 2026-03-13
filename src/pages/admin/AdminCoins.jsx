import { useState } from 'react'
import { AdminLayout } from '../../components/admin/AdminLayout'

const MOCK_USERS_WITH_COINS = [
    { id: '1', name: 'احمد علی', email: 'ahmed@gmail.com', coins: 350, orders: 12 },
    { id: '2', name: 'فاطمہ زہراء', email: 'fatima@gmail.com', coins: 125, orders: 7 },
    { id: '3', name: 'عمر شیخ', email: 'omar@gmail.com', coins: 0, orders: 3 },
]

export default function AdminCoins() {
    const [rate, setRate] = useState(1)
    const [adjustUser, setAdjustUser] = useState(null)
    const [adjustAmount, setAdjustAmount] = useState('')

    return (
        <AdminLayout title="Coins Management">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div className="admin-card">
                    <h3 style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Earn Rate Config</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <input type="number" min="1" max="5" value={rate} onChange={e => setRate(e.target.value)} className="input-field" style={{ width: '80px' }} />
                        <span style={{ color: 'rgba(255,255,255,0.5)' }}>% per order</span>
                        <button className="btn-primary" style={{ padding: '10px 20px', fontSize: '13px' }}>Save</button>
                    </div>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginTop: '8px' }}>Range: 1–5%. JazzCash + OTP bonus is always 25% on top.</p>
                </div>
                <div className="admin-card">
                    <h3 style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Coins Issued</h3>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '32px', fontWeight: 700, color: '#F59E0B' }}>🪙 475</p>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>Across all users</p>
                </div>
            </div>

            <div className="admin-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'center' }}>
                    <h3 style={{ fontWeight: 700, fontSize: '15px' }}>User Coin Balances</h3>
                </div>
                <table className="admin-table">
                    <thead><tr><th>User</th><th>Email</th><th>Orders</th><th>Coins Balance</th><th>Actions</th></tr></thead>
                    <tbody>
                        {MOCK_USERS_WITH_COINS.map(u => (
                            <tr key={u.id}>
                                <td><span className="urdu-text" style={{ lineHeight: 2 }}>{u.name}</span></td>
                                <td style={{ fontSize: '12px' }}>{u.email}</td>
                                <td>{u.orders}</td>
                                <td><span style={{ fontFamily: 'var(--font-mono)', color: '#F59E0B', fontWeight: 700 }}>🪙 {u.coins}</span></td>
                                <td>
                                    <button onClick={() => setAdjustUser(u)} style={{ background: 'rgba(245,158,11,0.15)', color: '#F59E0B', border: 'none', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', fontSize: '12px' }}>
                                        Adjust
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {adjustUser && (
                <div className="overlay" onClick={() => setAdjustUser(null)}>
                    <div className="modal" onClick={e => e.stopPropagation()} style={{ background: '#141820', color: '#fff' }}>
                        <h3 style={{ fontWeight: 700, marginBottom: '16px' }}>Adjust Coins — {adjustUser.name}</h3>
                        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '16px' }}>Current: 🪙 {adjustUser.coins}</p>
                        <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Amount (+/-)</label>
                        <input type="number" className="input-field" value={adjustAmount} onChange={e => setAdjustAmount(e.target.value)} placeholder="+100 or -50" style={{ marginBottom: '16px' }} />
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button className="btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => { setAdjustUser(null); setAdjustAmount('') }}>Apply</button>
                            <button className="btn-ghost" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setAdjustUser(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    )
}
