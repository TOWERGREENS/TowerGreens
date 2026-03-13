import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { Package, Bell, MessageCircle, Globe, FileText, Lock, LogOut, ChevronRight, Edit } from 'lucide-react'
import BottomNav from '../../components/app/BottomNav'
import AppHeader from '../../components/app/AppHeader'

export default function ProfilePage() {
    const { user, logout, language } = useApp()
    const navigate = useNavigate()
    const isUrdu = language === 'ur' || !language

    const handleLogout = () => { logout(); navigate('/app/login') }

    const coins = profile?.coins_balance || 0
    const coinsToNext = Math.max(0, 500 - coins)
    const progress = Math.min(100, (coins / 500) * 100)

    const menuItems = [
        { icon: Package, label: isUrdu ? 'میرے آرڈرز' : 'My Orders', path: '/app/orders' },
        { icon: Bell, label: isUrdu ? 'نوٹیفیکیشنز' : 'Notifications', path: '/app/notifications' },
        { icon: MessageCircle, label: isUrdu ? 'ڈائریکٹ میسج' : 'Direct Message', path: '/app/direct-message' },
        { icon: Globe, label: isUrdu ? 'زبان تبدیل کریں' : 'Change Language', path: '/app/language-select' },
        { icon: FileText, label: isUrdu ? 'شرائط و ضوابط' : 'Terms & Conditions', path: '/app/terms' },
        { icon: Lock, label: isUrdu ? 'رازداری کی پالیسی' : 'Privacy Policy', path: '/app/privacy' },
    ]

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: '80px' }}>
            <AppHeader title={isUrdu ? 'پروفائل' : 'Profile'} />
            <div style={{ padding: '24px 16px' }}>
                {/* Profile Hero */}
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <div style={{ position: 'relative', display: 'inline-block', marginBottom: '16px' }}>
                        <div style={{ width: '96px', height: '96px', borderRadius: '50%', background: 'linear-gradient(135deg, #4ADE80, #16A34A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', fontWeight: 700, color: '#080E0A', border: coins > 0 ? '3px solid #4ADE80' : 'none', boxShadow: coins > 0 ? '0 0 16px rgba(74,222,128,0.4)' : 'none' }}>
                            {(user?.name || 'م')[0]}
                        </div>
                        <button style={{ position: 'absolute', bottom: 0, right: 0, width: '28px', height: '28px', borderRadius: '50%', background: '#4ADE80', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <Edit size={12} color="#080E0A" />
                        </button>
                    </div>
                    <h2 className="urdu-text" style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text)', lineHeight: 2 }}>{user?.name || 'مہمان'}</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{user?.email || 'لاگ ان کریں'}</p>
                    {user && (
                        <button onClick={() => navigate('/app/profile/edit')} className="btn-ghost" style={{ padding: '6px 20px', fontSize: '13px', marginTop: '10px' }} id="edit-profile-btn">
                            <span className="urdu-text" style={{ lineHeight: 2 }}>ترمیم کریں</span>
                        </button>
                    )}
                    {!user && (

                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '12px' }}>
                            <button className="btn-primary" onClick={() => navigate('/app/login')} style={{ padding: '10px 24px', fontSize: '14px' }}>
                                <span className="urdu-text">لاگ ان</span>
                            </button>
                            <button className="btn-ghost" onClick={() => navigate('/app/signup')} style={{ padding: '10px 24px', fontSize: '14px' }}>
                                <span className="urdu-text">سائن اپ</span>
                            </button>
                        </div>
                    )}
                </div>

                {/* Coins card */}
                {user && (
                    <div className="glass-card" onClick={() => navigate('/app/coins')} style={{ marginBottom: '16px', padding: '20px', cursor: 'pointer', background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '24px' }}>🪙</span>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '24px', fontWeight: 700, color: '#F59E0B' }}>{coins}</span>
                            </div>
                            <span className="urdu-text" style={{ color: '#F59E0B', fontSize: '13px', lineHeight: 2 }}>TowerGreens Coins</span>
                        </div>
                        <div style={{ height: '6px', background: 'rgba(245,158,11,0.15)', borderRadius: '3px', overflow: 'hidden', marginBottom: '8px' }}>
                            <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #F59E0B, #D97706)', borderRadius: '3px', transition: 'width 0.5s ease' }} />
                        </div>
                        <p className="urdu-text" style={{ fontSize: '12px', color: 'rgba(245,158,11,0.7)', lineHeight: 2 }}>
                            {coinsToNext > 0 ? `${coinsToNext} مزید Coins پر Rs 500 کی چھوٹ` : '500 Coins مکمل! استعمال کریں'}
                        </p>
                    </div>
                )}

                {/* Menu */}
                <div className="glass-card" style={{ padding: '8px', marginBottom: '16px' }}>
                    {menuItems.map((item, i) => {
                        const Icon = item.icon
                        return (
                            <button key={i} onClick={() => navigate(item.path)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 12px', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '10px', transition: 'background 0.2s ease', textAlign: 'left' }}
                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(74,222,128,0.06)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                id={`profile-menu-${i}`}
                            >
                                <Icon size={18} color="var(--accent)" />
                                <span className="urdu-text" style={{ flex: 1, fontSize: '14px', color: 'var(--text)', lineHeight: 2 }}>{item.label}</span>
                                <ChevronRight size={16} color="var(--text-muted)" style={{ transition: 'transform 0.2s ease' }} />
                            </button>
                        )
                    })}
                </div>

                {/* Logout */}
                {user && (
                    <button onClick={handleLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 12px', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s ease' }}
                        id="logout-btn"
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.12)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.06)'}
                    >
                        <LogOut size={18} color="#ef4444" />
                        <span className="urdu-text" style={{ fontSize: '14px', color: '#ef4444', lineHeight: 2 }}>{isUrdu ? 'لاگ آؤٹ' : 'Logout'}</span>
                    </button>
                )}
            </div>
            <BottomNav />
        </div>
    )
}
