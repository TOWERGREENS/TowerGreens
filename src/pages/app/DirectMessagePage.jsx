import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { Send } from 'lucide-react'
import BottomNav from '../../components/app/BottomNav'
import AppHeader from '../../components/app/AppHeader'

const MOCK_MESSAGES = [
    { id: 1, from: 'admin', text: 'السلام علیکم! TowerGreens میں خوش آمدید 🌿 کوئی سوال ہو تو پوچھیں۔', time: '10:00' },
]

export default function DirectMessagePage() {
    const { language, user } = useApp()
    const [msgs, setMsgs] = useState(MOCK_MESSAGES)
    const [input, setInput] = useState('')
    const isUrdu = language === 'ur' || !language

    const send = () => {
        if (!input.trim()) return
        setMsgs(prev => [...prev, { id: Date.now(), from: 'user', text: input, time: new Date().toLocaleTimeString('ur-PK', { hour: '2-digit', minute: '2-digit' }) }])
        setInput('')
        setTimeout(() => setMsgs(prev => [...prev, { id: Date.now() + 1, from: 'admin', text: 'شکریہ! آپ کا پیغام موصول ہو گیا۔ جلد جواب دیں گے۔', time: new Date().toLocaleTimeString('ur-PK', { hour: '2-digit', minute: '2-digit' }) }]), 1500)
    }

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingBottom: '80px' }}>
            <AppHeader title={isUrdu ? 'ڈائریکٹ میسج' : 'Direct Message'} />
            <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto' }}>
                {msgs.map(m => (
                    <div key={m.id} style={{ display: 'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start' }}>
                        <div style={{ maxWidth: '75%', padding: '12px 16px', borderRadius: m.from === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px', background: m.from === 'user' ? 'linear-gradient(135deg, #4ADE80, #16A34A)' : 'rgba(255,255,255,0.06)', border: m.from !== 'user' ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                            <p className="urdu-text" style={{ fontSize: '14px', color: m.from === 'user' ? '#080E0A' : 'var(--text)', lineHeight: 2 }}>{m.text}</p>
                            <p style={{ fontSize: '10px', color: m.from === 'user' ? 'rgba(8,14,10,0.6)' : 'var(--text-muted)', textAlign: 'right', marginTop: '4px' }}>{m.time}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ padding: '12px 16px', background: 'rgba(8,14,10,0.92)', backdropFilter: 'blur(16px)', borderTop: '1px solid rgba(74,222,128,0.08)', display: 'flex', gap: '8px', position: 'sticky', bottom: '64px' }}>
                <input type="text" className="input-field" value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && send()} placeholder={isUrdu ? 'پیغام لکھیں...' : 'Type a message...'} id="dm-input" style={{ flex: 1 }} />
                <button className="btn-primary" style={{ padding: '14px', minWidth: '48px', justifyContent: 'center' }} onClick={send} id="dm-send-btn">
                    <Send size={18} />
                </button>
            </div>
        </div>
    )
}
