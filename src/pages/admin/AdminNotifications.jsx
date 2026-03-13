import { useState } from 'react'
import { AdminLayout } from '../../components/admin/AdminLayout'
import { Send, Bell, Users } from 'lucide-react'

const HISTORY = [
    { id: 1, title: 'نئی سبزیاں آ گئی!', body: 'تازہ پالک اور لیٹس دستیاب', target: 'all', sentAt: '10 مارچ 2026', count: 248 },
    { id: 2, title: 'مفت ڈیلیوری آج!', body: 'آج کے تمام آرڈرز پر مفت ڈیلیوری', target: 'all', sentAt: '8 مارچ 2026', count: 248 },
]

export default function AdminNotifications() {
    const [form, setForm] = useState({ title: '', body: '', target: 'all' })
    const [sending, setSending] = useState(false)
    const [sent, setSent] = useState(false)

    const handleSend = () => {
        if (!form.title || !form.body) return
        setSending(true)
        setTimeout(() => { setSending(false); setSent(true); setForm({ title: '', body: '', target: 'all' }); setTimeout(() => setSent(false), 3000) }, 1500)
    }

    return (
        <AdminLayout title="Push Notifications">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                {/* Compose */}
                <div className="admin-card">
                    <h3 style={{ fontWeight: 700, fontSize: '15px', marginBottom: '16px' }}>📣 Send Notification</h3>
                    <div style={{ marginBottom: '12px' }}>
                        <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '5px' }}>Title (Urdu)</label>
                        <input className="input-field" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} id="notif-title" placeholder="نوٹیفیکیشن عنوان" />
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                        <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '5px' }}>Body (Urdu)</label>
                        <textarea className="input-field" rows={3} value={form.body} onChange={e => setForm(p => ({ ...p, body: e.target.value }))} id="notif-body" placeholder="پیغام کا متن" style={{ resize: 'none' }} />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '5px' }}>Target</label>
                        <select className="input-field" value={form.target} onChange={e => setForm(p => ({ ...p, target: e.target.value }))} id="notif-target">
                            <option value="all">All Users (248)</option>
                            <option value="jazzcash">JazzCash Users Only</option>
                            <option value="inactive">Inactive (7+ days)</option>
                        </select>
                    </div>
                    {sent && <div style={{ padding: '10px', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: '8px', color: '#4ADE80', fontSize: '13px', marginBottom: '12px' }}>✅ Notification sent!</div>}
                    <button className="btn-primary" onClick={handleSend} disabled={sending} style={{ justifyContent: 'center', width: '100%' }} id="send-notif-btn">
                        {sending ? <div className="spinner" /> : <><Send size={14} /> Send Now</>}
                    </button>
                </div>

                {/* Stats */}
                <div className="admin-card">
                    <h3 style={{ fontWeight: 700, fontSize: '15px', marginBottom: '16px' }}>📊 Stats</h3>
                    {[{ l: 'Subscribed Users', v: '248', icon: '🔔' }, { l: 'Sent Last 30 Days', v: '12', icon: '📤' }, { l: 'Avg Open Rate', v: '64%', icon: '👁️' }].map((s, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>{s.icon} {s.l}</span>
                            <span style={{ fontFamily: 'var(--font-mono)', color: '#4ADE80', fontWeight: 700 }}>{s.v}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="admin-card">
                <h3 style={{ fontWeight: 700, fontSize: '15px', marginBottom: '16px' }}>📋 History</h3>
                <table className="admin-table">
                    <thead><tr><th>Title</th><th>Body</th><th>Target</th><th>Sent</th><th>Delivered</th></tr></thead>
                    <tbody>
                        {HISTORY.map(n => (
                            <tr key={n.id}>
                                <td className="urdu-text" style={{ lineHeight: 2 }}>{n.title}</td>
                                <td className="urdu-text" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', lineHeight: 2 }}>{n.body}</td>
                                <td><span style={{ background: 'rgba(74,222,128,0.1)', color: '#4ADE80', padding: '2px 8px', borderRadius: '6px', fontSize: '12px' }}>{n.target}</span></td>
                                <td style={{ fontSize: '12px' }}>{n.sentAt}</td>
                                <td style={{ fontFamily: 'var(--font-mono)', color: '#4ADE80' }}>{n.count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    )
}
