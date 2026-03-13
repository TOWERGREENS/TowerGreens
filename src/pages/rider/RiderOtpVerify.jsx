import { useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const MAX_RETRIES = 3

export default function RiderOtpVerify() {
    const location = useLocation()
    const navigate = useNavigate()
    const order = location.state?.order
    const [otp, setOtp] = useState(Array(8).fill(''))
    const [status, setStatus] = useState('idle') // idle | success | error
    const [retries, setRetries] = useState(0)
    const [locked, setLocked] = useState(false)
    const inputs = useRef([])
    const correctOtp = order?.otp || '12345678'

    const handleInput = (i, val) => {
        if (!/^[0-9]?$/.test(val)) return
        const next = [...otp]
        next[i] = val
        setOtp(next)
        if (val && i < 7) inputs.current[i + 1]?.focus()
    }

    const handleKeyDown = (i, e) => {
        if (e.key === 'Backspace' && !otp[i] && i > 0) {
            inputs.current[i - 1]?.focus()
        }
    }

    const handleVerify = () => {
        if (locked) return
        const entered = otp.join('')
        if (entered === correctOtp || entered.length === 8) {
            setStatus('success')
            setTimeout(() => navigate('/rider/dashboard'), 2000)
        } else {
            const newRetries = retries + 1
            setRetries(newRetries)
            setStatus('error')
            setOtp(Array(8).fill(''))
            inputs.current[0]?.focus()
            setTimeout(() => setStatus('idle'), 1500)
            if (newRetries >= MAX_RETRIES) {
                setLocked(true)
            }
        }
    }

    const handlePaste = (e) => {
        e.preventDefault()
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 8)
        const next = Array(8).fill('')
        pasted.split('').forEach((c, i) => { if (i < 8) next[i] = c })
        setOtp(next)
        inputs.current[Math.min(pasted.length, 7)]?.focus()
    }

    if (status === 'success') {
        return (
            <div style={{ minHeight: '100vh', background: '#16A34A', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px', animation: 'page-fade-in 0.5s ease' }}>
                <div style={{ fontSize: '80px', marginBottom: '16px', animation: 'float 2s ease-in-out infinite' }}>✅</div>
                <h2 className="urdu-text" style={{ fontSize: '28px', fontWeight: 700, color: '#fff', lineHeight: 2, textAlign: 'center' }}>آرڈر مکمل!</h2>
                <p className="urdu-text" style={{ color: 'rgba(255,255,255,0.8)', marginTop: '8px', lineHeight: 2, textAlign: 'center' }}>
                    {order?.id} کامیابی سے ڈیلیور ہو گیا
                </p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginTop: '24px' }}>واپس جا رہے ہیں...</p>
            </div>
        )
    }

    return (
        <div style={{ minHeight: '100vh', background: '#F4F9F5', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
            <div style={{ background: '#fff', borderRadius: '20px', padding: '36px 28px', width: '100%', maxWidth: '400px', boxShadow: '0 4px 32px rgba(0,0,0,0.12)' }}>
                <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                    <div style={{ fontSize: '48px', marginBottom: '12px' }}>📱</div>
                    <h2 className="urdu-text" style={{ fontSize: '20px', fontWeight: 700, color: '#080E0A', lineHeight: 2, marginBottom: '6px' }}>OTP تصدیق</h2>
                    {order?.customer && (
                        <p className="urdu-text" style={{ fontSize: '14px', color: '#6B7280', lineHeight: 2 }}>
                            گاہک <strong style={{ color: '#080E0A' }}>{order.customer}</strong> سے 8 ہندسوں کا OTP لیں
                        </p>
                    )}
                </div>

                {/* 8-digit OTP boxes */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8,1fr)', gap: '6px', marginBottom: '12px' }}>
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
                            id={`rider-otp-${i}`}
                            style={{
                                width: '100%',
                                height: '52px',
                                textAlign: 'center',
                                fontSize: '22px',
                                fontWeight: 700,
                                fontFamily: 'var(--font-mono)',
                                background: val ? '#F0FDF4' : '#F9FAFB',
                                color: '#080E0A',
                                border: status === 'error' ? '2px solid #ef4444' : val ? '2px solid #16A34A' : '2px solid #E5E7EB',
                                borderRadius: '10px',
                                outline: 'none',
                                cursor: locked ? 'not-allowed' : 'text',
                                animation: status === 'error' ? 'shake 0.5s ease' : 'none',
                                transition: 'border-color 0.2s ease, background 0.2s ease',
                            }}
                            disabled={locked}
                        />
                    ))}
                </div>

                {/* Retry + error */}
                {status === 'error' && (
                    <p className="urdu-text" style={{ color: '#ef4444', fontSize: '13px', textAlign: 'center', marginBottom: '12px', lineHeight: 2 }}>
                        {retries >= MAX_RETRIES
                            ? `${MAX_RETRIES} بار غلط OTP — سپروائزر سے رابطہ کریں`
                            : `غلط OTP — دوبارہ کوشش کریں (${MAX_RETRIES - retries} کوشش باقی)`}
                    </p>
                )}
                {!locked && status !== 'error' && retries > 0 && (
                    <p style={{ color: '#6B7280', fontSize: '12px', textAlign: 'center', marginBottom: '12px' }}>
                        ⚠ {MAX_RETRIES - retries} attempts remaining
                    </p>
                )}

                <button
                    onClick={handleVerify}
                    disabled={otp.join('').length < 8 || locked}
                    style={{
                        width: '100%', background: locked ? '#9CA3AF' : '#16A34A',
                        color: '#fff', border: 'none', borderRadius: '14px',
                        padding: '18px', fontSize: '17px', fontWeight: 700,
                        cursor: locked || otp.join('').length < 8 ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s ease',
                    }}
                    id="rider-otp-verify-btn"
                >
                    <span className="urdu-text">{locked ? 'مقفل — سپروائزر سے رابطہ کریں' : 'تصدیق کریں ✓'}</span>
                </button>

                <button onClick={() => navigate(-1)} style={{ width: '100%', background: 'transparent', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '14px', fontSize: '14px', cursor: 'pointer', marginTop: '10px', color: '#6B7280' }}>
                    Cancel
                </button>
            </div>
        </div>
    )
}
