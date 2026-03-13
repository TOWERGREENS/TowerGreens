import { useState } from 'react'
import { AdminLayout } from '../../components/admin/AdminLayout'
import { CheckCircle, XCircle } from 'lucide-react'

const MOCK_MSG = [
    { id: 1, user: 'احمد علی', email: 'ahmed@gmail.com', message: 'میرا آرڈر TG-4821 ابھی تک نہیں آیا، کیا ہوا؟', reply: null, isResolved: false, createdAt: '11 مارچ، 9:30 AM' },
    { id: 2, user: 'فاطمہ زہراء', email: 'fatima@gmail.com', message: 'مکس سلاد باول میں لیٹس نہیں تھی۔', reply: 'معذرت! اگلے آرڈر پر ڈسکاؤنٹ دیا جائے گا۔', isResolved: true, createdAt: '10 مارچ، 4:10 PM' },
]

export default function AdminMessages() {
    const [msgs, setMsgs] = useState(MOCK_MSG)
    const [selected, setSelected] = useState(null)
    const [replyText, setReplyText] = useState('')

    const sendReply = () => {
        if (!replyText.trim() || !selected) return
        setMsgs(prev => prev.map(m => m.id === selected.id ? { ...m, reply: replyText, isResolved: true } : m))
        setSelected(null)
        setReplyText('')
    }

    return (
        <AdminLayout title="Support Messages">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
                {/* List */}
                <div className="admin-card" style={{ padding: '0' }}>
                    {msgs.map(m => (
                        <div key={m.id} onClick={() => setSelected(m)} style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', background: selected?.id === m.id ? 'rgba(74,222,128,0.06)' : 'transparent', transition: 'background 0.2s' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                <span className="urdu-text" style={{ fontSize: '14px', fontWeight: 600, lineHeight: 2 }}>{m.user}</span>
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: m.isResolved ? '#4ADE80' : '#F59E0B', flexShrink: 0, marginTop: '8px' }} />
                            </div>
                            <p className="urdu-text" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.message}</p>
                            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', marginTop: '4px' }}>{m.createdAt}</p>
                        </div>
                    ))}
                </div>

                {/* Detail */}
                <div className="admin-card">
                    {selected ? (
                        <>
                            <div style={{ marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <span className="urdu-text" style={{ fontWeight: 700, fontSize: '16px', lineHeight: 2 }}>{selected.user}</span>
                                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>{selected.createdAt}</span>
                                </div>
                                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>{selected.email}</p>
                            </div>

                            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '14px', marginBottom: '16px' }}>
                                <p className="urdu-text" style={{ fontSize: '14px', lineHeight: 2.2, color: 'rgba(255,255,255,0.85)' }}>{selected.message}</p>
                            </div>

                            {selected.reply ? (
                                <div style={{ background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.15)', borderRadius: '10px', padding: '14px', marginBottom: '16px' }}>
                                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginBottom: '6px' }}>Your reply</p>
                                    <p className="urdu-text" style={{ fontSize: '14px', lineHeight: 2, color: '#4ADE80' }}>{selected.reply}</p>
                                </div>
                            ) : (
                                <>
                                    <textarea className="input-field" rows={4} value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="جواب لکھیں..." style={{ marginBottom: '12px', resize: 'none' }} id="reply-textarea" />
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button className="btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={sendReply} id="reply-send-btn">Send Reply & Mark Resolved</button>
                                        <button className="btn-ghost" style={{ justifyContent: 'center', padding: '13px 16px' }} onClick={() => { setMsgs(prev => prev.map(m => m.id === selected.id ? { ...m, isResolved: true } : m)); setSelected(null) }}>
                                            <CheckCircle size={16} />
                                        </button>
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px', color: 'rgba(255,255,255,0.25)' }}>
                            <p>Select a message to view or reply</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    )
}
