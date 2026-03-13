import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

export default function OrderPlacedPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const { language } = useApp()
    const order = location.state?.order
    const orderId = order?.id || `TG-${Date.now()}`
    const isUrdu = language === 'ur' || !language

    const [phase, setPhase] = useState(0)
    const [confettiPieces, setConfettiPieces] = useState([])
    const [timeLeft, setTimeLeft] = useState(35 * 60)

    useEffect(() => {
        const phases = [200, 800, 1200, 1600, 2000]
        phases.forEach((delay, i) => {
            setTimeout(() => setPhase(i + 1), delay)
        })
        setTimeout(() => {
            setConfettiPieces(Array.from({ length: 40 }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                color: i % 2 === 0 ? '#4ADE80' : '#F59E0B',
                delay: Math.random() * 0.5,
                size: Math.random() * 8 + 4,
                rotation: Math.random() * 360,
            })))
        }, 800)
        const timer = setInterval(() => setTimeLeft(t => Math.max(0, t - 1)), 1000)
        return () => clearInterval(timer)
    }, [])

    const mins = Math.floor(timeLeft / 60)
    const secs = String(timeLeft % 60).padStart(2, '0')
    const progress = 1 - timeLeft / (35 * 60)

    return (
        <div style={{ minHeight: '100vh', background: '#080E0A', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 16px', position: 'relative', overflow: 'hidden' }}>
            {/* Confetti */}
            {confettiPieces.map(p => (
                <div key={p.id} className="confetti-particle" style={{ left: `${p.x}%`, background: p.color, width: p.size, height: p.size, animationDelay: `${p.delay}s`, borderRadius: p.id % 3 === 0 ? '50%' : '2px', transform: `rotate(${p.rotation}deg)` }} />
            ))}

            {/* Checkmark */}
            {phase >= 1 && (
                <svg viewBox="0 0 80 80" width="100" height="100" style={{ marginBottom: '16px' }}>
                    <circle cx="40" cy="40" r="38" fill="none" stroke="rgba(74,222,128,0.2)" strokeWidth="2" />
                    <circle cx="40" cy="40" r="38" fill="none" stroke="#4ADE80" strokeWidth="3" strokeDasharray="240" strokeDashoffset={240 - (phase >= 1 ? 240 : 0)} style={{ transition: 'stroke-dashoffset 0.6s ease', transformOrigin: 'center', transform: 'rotate(-90deg)' }} />
                    <polyline points="24,42 36,54 56,28" fill="none" stroke="#4ADE80" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="60" strokeDashoffset={phase >= 1 ? 0 : 60} style={{ transition: 'stroke-dashoffset 0.5s ease 0.5s' }} />
                </svg>
            )}

            {/* Message */}
            {phase >= 3 && (
                <h1 className="urdu-text" style={{ fontSize: 'clamp(24px,5vw,36px)', fontWeight: 700, color: '#F0F7F1', textAlign: 'center', marginBottom: '8px', lineHeight: 2, animation: 'page-fade-in 0.6s ease' }}>
                    {isUrdu ? 'آپ کا آرڈر موصول ہو گیا!' : 'Order Received!'}
                </h1>
            )}
            {phase >= 4 && (
                <p style={{ fontFamily: 'var(--font-mono)', color: 'rgba(240,247,241,0.5)', fontSize: '14px', marginBottom: '32px', animation: 'page-fade-in 0.5s ease' }}>
                    {orderId}
                </p>
            )}

            {/* Delivery Timer */}
            {phase >= 5 && (
                <div style={{ textAlign: 'center', marginBottom: '40px', animation: 'page-fade-in 0.6s ease' }}>
                    <div style={{ position: 'relative', width: '160px', height: '160px', margin: '0 auto 16px' }}>
                        <svg viewBox="0 0 160 160" style={{ transform: 'rotate(-90deg)' }}>
                            <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(74,222,128,0.1)" strokeWidth="8" />
                            <circle cx="80" cy="80" r="70" fill="none" stroke="#4ADE80" strokeWidth="8" strokeDasharray={440} strokeDashoffset={440 * (1 - progress)} style={{ transition: 'stroke-dashoffset 1s ease', strokeLinecap: 'round' }} />
                        </svg>
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '28px', fontWeight: 700, color: '#4ADE80', lineHeight: 1 }}>{mins}:{secs}</span>
                            <span className="urdu-text" style={{ fontSize: '11px', color: 'rgba(240,247,241,0.5)', lineHeight: 2 }}>{isUrdu ? 'منٹ' : 'mins'}</span>
                        </div>
                    </div>
                    <p className="urdu-text" style={{ color: 'rgba(240,247,241,0.7)', fontSize: '15px', lineHeight: 2 }}>
                        {isUrdu ? `آپ کا آرڈر ${mins} منٹ میں پہنچ جائے گا` : `Your order will arrive in ${mins} minutes`}
                    </p>
                </div>
            )}

            {/* Buttons */}
            {phase >= 5 && (
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', animation: 'page-fade-in 0.5s ease' }}>
                    <button className="btn-ghost" onClick={() => navigate('/app/orders')} id="track-order-btn">
                        <span className="urdu-text">{isUrdu ? 'آرڈر ٹریک کریں' : 'Track Order'}</span>
                    </button>
                    <button className="btn-primary" onClick={() => navigate('/app/home')} id="back-home-btn">
                        <span className="urdu-text">{isUrdu ? 'ہوم پر واپس' : 'Back to Home'}</span>
                    </button>
                </div>
            )}
        </div>
    )
}
