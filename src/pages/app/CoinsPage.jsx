import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import BottomNav from '../../components/app/BottomNav'
import AppHeader from '../../components/app/AppHeader'

export default function CoinsPage() {
    const { user, language } = useApp()
    const isUrdu = language === 'ur' || !language
    const coins = user?.coinsBalance || 0
    const progress500 = Math.min(100, (coins / 500) * 100)

    const history = [
        { id: 1, type: 'earn', amount: 125, reason: 'آرڈر TG-4820 — OTP تصدیق', date: '5 مارچ 2026' },
        { id: 2, type: 'earn', amount: 45, reason: 'آرڈر TG-4819 — بیس کمائی', date: '4 مارچ 2026' },
        { id: 3, type: 'deduct', amount: 500, reason: 'Rs 500 کی چھوٹ — آرڈر TG-4818', date: '2 مارچ 2026' },
    ]

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: '80px' }}>
            <AppHeader title={isUrdu ? 'TowerGreens Coins' : 'TowerGreens Coins'} />
            <div style={{ padding: '24px 16px' }}>
                {/* Balance card */}
                <div className="glass-card" style={{ padding: '32px', textAlign: 'center', marginBottom: '24px', background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}>
                    <span style={{ fontSize: '48px', display: 'block', marginBottom: '8px' }}>🪙</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '48px', fontWeight: 700, color: '#F59E0B', display: 'block', lineHeight: 1 }}>{coins}</span>
                    <p className="urdu-text" style={{ color: 'rgba(245,158,11,0.7)', fontSize: '14px', marginTop: '8px', lineHeight: 2 }}>TowerGreens Coins</p>
                    {/* Progress */}
                    <div style={{ marginTop: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                            <span className="urdu-text" style={{ fontSize: '12px', color: 'rgba(240,247,241,0.5)', lineHeight: 2 }}>0</span>
                            <span className="urdu-text" style={{ fontSize: '12px', color: 'rgba(240,247,241,0.5)', lineHeight: 2 }}>500 — Rs 500 چھوٹ</span>
                        </div>
                        <div style={{ height: '8px', background: 'rgba(245,158,11,0.15)', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ width: `${progress500}%`, height: '100%', background: 'linear-gradient(90deg, #F59E0B, #D97706)', borderRadius: '4px', transition: 'width 1s ease' }} />
                        </div>
                    </div>
                </div>

                {/* How to earn */}
                <div className="glass-card" style={{ padding: '20px', marginBottom: '24px' }}>
                    <h3 className="urdu-text" style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', lineHeight: 2 }}>
                        {isUrdu ? 'Coins کیسے کمائیں؟' : 'How to Earn Coins?'}
                    </h3>
                    {[
                        { icon: '📦', desc: isUrdu ? 'ہر آرڈر پر 1-5% Coins' : '1-5% coins on every order' },
                        { icon: '📱', desc: isUrdu ? 'JazzCash سے ادائیگی + OTP تصدیق = 25% بونس' : 'JazzCash + OTP verification = 25% bonus' },
                    ].map((tip, i) => (
                        <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                            <span style={{ fontSize: '20px' }}>{tip.icon}</span>
                            <p className="urdu-text" style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 2 }}>{tip.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Transaction History */}
                <h3 className="urdu-text" style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px', lineHeight: 2 }}>
                    {isUrdu ? 'تاریخ' : 'History'}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {history.map(t => (
                        <div key={t.id} className="glass-card" style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <p className="urdu-text" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', lineHeight: 2 }}>{t.reason}</p>
                                <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t.date}</p>
                            </div>
                            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: t.type === 'earn' ? '#4ADE80' : '#ef4444', fontSize: '16px' }}>
                                {t.type === 'earn' ? '+' : '-'}{t.amount}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <BottomNav />
        </div>
    )
}
