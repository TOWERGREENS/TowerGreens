import { useState, useRef } from 'react'
import { useApp } from '../../context/AppContext'

export default function OtpCoinsPopup({ order, onClose }) {
    const { showToast, language, claimOtpCoins } = useApp()
    const [otp, setOtp] = useState(Array(8).fill(''))
    const [status, setStatus] = useState('idle') // idle | loading | success | error
    const inputs = useRef([])
    const isUrdu = language === 'ur' || !language

    const coins = order?.coins_earned || order?.coinsEarned || 125
    const hoursLeft = 18
    const minsLeft = 42

    const handleInput = (i, val) => {
        if (!/^[0-9]?$/.test(val)) return
        const next = [...otp]
        next[i] = val
        setOtp(next)
        if (val && i < 7) inputs.current[i + 1]?.focus()
    }

    const handleKeyDown = (i, e) => {
        if (e.key === 'Backspace' && !otp[i] && i > 0) inputs.current[i - 1]?.focus()
    }

    const handlePaste = (e) => {
        e.preventDefault()
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 8)
        const next = Array(8).fill('')
        pasted.split('').forEach((c, i) => { if (i < 8) next[i] = c })
        setOtp(next)
        inputs.current[Math.min(pasted.length, 7)]?.focus()
    }

    const handleVerify = async () => {
        const entered = otp.join('')
        if (entered.length < 8) return
        setStatus('loading')
        try {
            // Try real claimOtpCoins if available
            if (claimOtpCoins && order?.id) {
                await claimOtpCoins(order.id, entered)
            }
            setStatus('success')
            showToast(`${coins} Coins آپ کے اکاؤنٹ میں شامل ہو گئے! 🪙`, 'success', 4000)
            setTimeout(onClose, 2500)
        } catch (err) {
            setStatus('error')
            setOtp(Array(8).fill(''))
            inputs.current[0]?.focus()
            setTimeout(() => setStatus('idle'), 1500)
        }
    }

    return (
        <div className="overlay" style={{ alignItems: 'flex-end' }}>
            <div className="modal" style={{ width: '100%', maxWidth: '420px', margin: '0 auto 0', borderRadius: '24px 24px 0 0' }}>
                {status === 'success' ? (
                    <div style={{ textAlign: 'center', padding: '16px 0' }}>
                        <div style={{ fontSize: '64px', animation: 'float 2s ease-in-out infinite', marginBottom: '12px' }}>🪙</div>
                        <h3 className="urdu-text" style={{ fontSize: '22px', fontWeight: 700, color: '#F59E0B', lineHeight: 2 }}>مبارک ہو!</h3>
                        <p className="urdu-text" style={{ color: 'var(--text-muted)', lineHeight: 2 }}>
                            {coins} Coins آپ کے اکاؤنٹ میں شامل ہو گئے
                        </p>
                    </div>
                ) : (
                    <>
                        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                            <div style={{ fontSize: '48px', marginBottom: '8px' }}>🪙</div>
                            <h3 className="urdu-text" style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text)', lineHeight: 2, marginBottom: '4px' }}>مبارک ہو!</h3>
                            <p className="urdu-text" style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 2 }}>
                                آپ کے آرڈر #{order?.id || 'TG-4821'} کی ڈیلیوری مکمل ہو گئی۔
                            </p>
                            <p className="urdu-text" style={{ fontSize: '14px', color: '#F59E0B', fontWeight: 600, lineHeight: 2 }}>
                                اپنے {coins} TowerGreens Coins حاصل کرنے کے لیے OTP درج کریں:
                            </p>
                        </div>

                        {/* 8-box OTP */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8,1fr)', gap: '5px', marginBottom: '12px' }}>
                            {otp.map((val, i) => (
                                <input
                                    key={i}
                                    ref={el => inputs.current[i] = el}
                                    type="tel"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={val}
                                    onChange={e => handleInput(i, e.target.value)}
                                    onKeyDown={e => handleKeyDown(i, e)}
                                    onPaste={handlePaste}
                                    autoFocus={i === 0}
                                    id={`coins-otp-${i}`}
                                    style={{
                                        width: '100%', height: '48px', textAlign: 'center',
                                        fontSize: '20px', fontWeight: 700, fontFamily: 'var(--font-mono)',
                                        background: val ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.04)',
                                        color: val ? '#F59E0B' : 'var(--text)',
                                        border: status === 'error'
                                            ? '2px solid rgba(239,68,68,0.7)'
                                            : val ? '2px solid rgba(245,158,11,0.5)' : '1.5px solid rgba(74,222,128,0.15)',
                                        borderRadius: '10px', outline: 'none',
                                        animation: status === 'error' ? 'shake 0.5s ease' : 'none',
                                        transition: 'border-color 0.2s ease',
                                    }}
                                />
                            ))}
                        </div>

                        {status === 'error' && (
                            <p className="urdu-text" style={{ color: '#ef4444', fontSize: '12px', textAlign: 'center', marginBottom: '10px', lineHeight: 2 }}>
                                غلط OTP — دوبارہ کوشش کریں
                            </p>
                        )}

                        <button
                            className="btn-primary w-full"
                            onClick={handleVerify}
                            disabled={otp.join('').length < 8 || status === 'loading'}
                            style={{ justifyContent: 'center', marginBottom: '10px' }}
                            id="coins-otp-verify-btn"
                        >
                            {status === 'loading' ? <div className="spinner" /> : <span className="urdu-text">تصدیق کریں</span>}
                        </button>

                        <button
                            onClick={onClose}
                            style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '10px', color: 'var(--text-muted)', fontSize: '13px' }}
                            id="coins-otp-later-btn"
                        >
                            <span className="urdu-text" style={{ lineHeight: 2 }}>بعد میں</span>
                        </button>

                        <div style={{ textAlign: 'center', marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '14px' }}>⏱️</span>
                            <span className="urdu-text" style={{ fontSize: '12px', color: 'rgba(245,158,11,0.7)', lineHeight: 2 }}>
                                {hoursLeft} گھنٹے {minsLeft} منٹ باقی ہیں
                            </span>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
