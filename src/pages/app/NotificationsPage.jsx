import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { Bell } from 'lucide-react'
import BottomNav from '../../components/app/BottomNav'
import AppHeader from '../../components/app/AppHeader'

const MOCK_NOTIFS = [
    { id: 1, title: 'آرڈر موصول', body: 'آپ کا آرڈر TG-4821 موصول ہو گیا', time: '2 منٹ پہلے', read: false, type: 'placed' },
    { id: 2, title: 'آرڈر قبول', body: 'آپ کا آرڈر TG-4820 قبول کر لیا گیا', time: '1 گھنٹہ پہلے', read: true, type: 'accepted' },
    { id: 3, title: 'ڈیلیوری مکمل', body: 'آپ کا آرڈر TG-4819 پہنچ گیا', time: 'کل', read: true, type: 'delivered' },
]

export default function NotificationsPage() {
    const { language } = useApp()
    const isUrdu = language === 'ur' || !language
    const icons = { placed: '📦', accepted: '✅', delivered: '🏠', rejected: '❌' }

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: '80px' }}>
            <AppHeader title={isUrdu ? 'نوٹیفیکیشنز' : 'Notifications'} />
            <div style={{ padding: '16px' }}>
                {MOCK_NOTIFS.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '80px 0' }}>
                        <Bell size={48} color="rgba(240,247,241,0.2)" />
                        <p className="urdu-text" style={{ color: 'var(--text-muted)', marginTop: '16px', lineHeight: 2 }}>
                            {isUrdu ? 'کوئی نوٹیفیکیشن نہیں' : 'No notifications'}
                        </p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {MOCK_NOTIFS.map(n => (
                            <div key={n.id} className="glass-card" style={{ padding: '16px', display: 'flex', gap: '12px', opacity: n.read ? 0.7 : 1, borderColor: !n.read ? 'rgba(74,222,128,0.2)' : 'var(--border)' }}>
                                <span style={{ fontSize: '24px', flexShrink: 0 }}>{icons[n.type] || '🔔'}</span>
                                <div style={{ flex: 1 }}>
                                    <p className="urdu-text" style={{ fontSize: '14px', fontWeight: !n.read ? 700 : 500, color: 'var(--text)', lineHeight: 2, marginBottom: '4px' }}>{n.title}</p>
                                    <p className="urdu-text" style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 2 }}>{n.body}</p>
                                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>{n.time}</p>
                                </div>
                                {!n.read && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', flexShrink: 0, marginTop: '4px' }} />}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <BottomNav />
        </div>
    )
}
