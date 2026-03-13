import { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { authService } from '../../lib/authService'
import { Eye, EyeOff } from 'lucide-react'

export default function SignupPage() {
    const { signup, verifyEmail, loginWithGoogle, showToast, language } = useApp()
    const navigate = useNavigate()
    const isUrdu = language === 'ur' || !language

    const [step, setStep] = useState('form') // 'form' | 'verify'
    const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', agreed: false })
    const [showPw, setShowPw] = useState(false)
    const [loading, setLoading] = useState(false)
    const [otpDigits, setOtpDigits] = useState(Array(6).fill(''))
    const otpRefs = useRef([])

    const handleSignup = async (e) => {
        e.preventDefault()
        if (!form.agreed) { showToast(isUrdu ? 'شرائط قبول کریں' : 'Accept terms first', 'error'); return }
        if (form.password.length < 8) { showToast(isUrdu ? 'پاس ورڈ کم از کم 8 حروف' : 'Password min 8 chars', 'error'); return }
        setLoading(true)
        try {
            const data = await signup({ email: form.email, password: form.password, name: form.name })
            if (data?.requireEmailVerification) {
                setStep('verify')
                showToast(isUrdu ? 'تصدیقی کوڈ بھیج دیا گیا' : 'Verification code sent', 'success')
            } else if (data?.accessToken) {
                showToast(isUrdu ? 'اکاؤنٹ بن گیا!' : 'Account created!', 'success')
                navigate('/app/home', { replace: true })
            }
        } catch (err) {
            const msg = err.message?.includes('exist')
                ? (isUrdu ? 'یہ ای میل پہلے سے موجود ہے' : 'Email already exists')
                : (err.message || (isUrdu ? 'رجسٹریشن ناکام' : 'Registration failed'))
            showToast(msg, 'error')
        } finally {
            setLoading(false)
        }
    }

    const handleOtpInput = (i, val) => {
        if (!/^[0-9]?$/.test(val)) return
        const next = [...otpDigits]
        next[i] = val
        setOtpDigits(next)
        if (val && i < 5) otpRefs.current[i + 1]?.focus()
    }

    const handleOtpKeyDown = (i, e) => {
        if (e.key === 'Backspace' && !otpDigits[i] && i > 0) otpRefs.current[i - 1]?.focus()
    }

    const handleVerify = async (e) => {
        e.preventDefault()
        const otp = otpDigits.join('')
        if (otp.length < 6) { showToast(isUrdu ? '6 ہندسے درج کریں' : 'Enter 6-digit code', 'error'); return }
        setLoading(true)
        try {
            await verifyEmail(form.email, otp)
            showToast(isUrdu ? 'اکاؤنٹ تصدیق ہو گئی! خوش آمدید 🎉' : 'Account verified! Welcome 🎉', 'success', 4000)
            navigate('/app/home', { replace: true })
        } catch (err) {
            showToast(isUrdu ? 'غلط یا میعاد کٹا کوڈ' : 'Invalid or expired code', 'error')
        } finally {
            setLoading(false)
        }
    }

    const resendCode = async () => {
        try {
            await authService.resendVerificationEmail({ email: form.email })
            showToast(isUrdu ? 'کوڈ دوبارہ بھیج دیا' : 'Code resent', 'success')
        } catch { showToast('Resend failed', 'error') }
    }

    if (step === 'verify') return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 16px' }}>
            <div className="glass-card" style={{ width: '100%', maxWidth: '380px', padding: '32px', textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📧</div>
                <h2 className="urdu-text" style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text)', lineHeight: 2, marginBottom: '8px' }}>
                    {isUrdu ? 'ای میل تصدیق' : 'Verify Email'}
                </h2>
                <p className="urdu-text" style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: 2, marginBottom: '24px' }}>
                    {isUrdu ? `${form.email} پر 6 ہندسوں کا کوڈ بھیجا گیا` : `6-digit code sent to ${form.email}`}
                </p>
                <form onSubmit={handleVerify}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
                        {otpDigits.map((d, i) => (
                            <input key={i} ref={el => otpRefs.current[i] = el}
                                type="tel" inputMode="numeric" maxLength={1} value={d}
                                onChange={e => handleOtpInput(i, e.target.value)}
                                onKeyDown={e => handleOtpKeyDown(i, e)}
                                autoFocus={i === 0}
                                id={`verify-otp-${i}`}
                                style={{ width: '44px', height: '52px', textAlign: 'center', fontSize: '22px', fontWeight: 700, background: d ? 'rgba(74,222,128,0.1)' : 'rgba(255,255,255,0.04)', color: d ? '#4ADE80' : 'var(--text)', border: `2px solid ${d ? 'rgba(74,222,128,0.5)' : 'rgba(74,222,128,0.15)'}`, borderRadius: '12px', outline: 'none', transition: 'all 0.2s' }}
                            />
                        ))}
                    </div>
                    <button type="submit" className="btn-primary w-full" style={{ justifyContent: 'center', marginBottom: '12px' }} disabled={loading} id="verify-submit-btn">
                        {loading ? <div className="spinner" /> : <span className="urdu-text">{isUrdu ? 'تصدیق کریں' : 'Verify'}</span>}
                    </button>
                </form>
                <button onClick={resendCode} style={{ background: 'none', border: 'none', color: '#4ADE80', cursor: 'pointer', fontSize: '13px' }} id="resend-code-btn">
                    <span className="urdu-text" style={{ lineHeight: 2 }}>{isUrdu ? 'کوڈ دوبارہ بھیجیں' : 'Resend code'}</span>
                </button>
            </div>
        </div>
    )

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 16px' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <img src="/logo.png" alt="TowerGreens" style={{ height: '56px', marginBottom: '10px' }} />
                <h1 className="urdu-text" style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text)', lineHeight: 2 }}>
                    {isUrdu ? 'نیا اکاؤنٹ بنائیں' : 'Create Account'}
                </h1>
            </div>

            <div className="glass-card" style={{ width: '100%', maxWidth: '380px', padding: '28px' }}>
                <button onClick={loginWithGoogle} disabled={loading} id="google-signup-btn"
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '12px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', color: 'var(--text)', cursor: 'pointer', fontSize: '14px', fontWeight: 600, marginBottom: '16px', transition: 'all 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}>
                    <svg width="18" height="18" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    <span className="urdu-text" style={{ lineHeight: 2 }}>{isUrdu ? 'گوگل سے رجسٹر' : 'Continue with Google'}</span>
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
                    <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{isUrdu ? 'یا' : 'or'}</span>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
                </div>

                <form onSubmit={handleSignup}>
                    {[
                        { key: 'name', label: isUrdu ? 'نام' : 'Name', type: 'text', ph: isUrdu ? 'آپ کا نام' : 'Your Name', id: 'signup-name' },
                        { key: 'email', label: isUrdu ? 'ای میل' : 'Email', type: 'email', ph: 'email@example.com', id: 'signup-email' },
                        { key: 'phone', label: isUrdu ? 'فون (اختیاری)' : 'Phone (optional)', type: 'tel', ph: '03001234567', id: 'signup-phone' },
                    ].map(f => (
                        <div key={f.key} style={{ marginBottom: '12px' }}>
                            <label className="urdu-text" style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px', lineHeight: 2 }}>{f.label}</label>
                            <input id={f.id} type={f.type} className="input-field" placeholder={f.ph} value={form[f.key]}
                                onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} />
                        </div>
                    ))}
                    <div style={{ marginBottom: '14px', position: 'relative' }}>
                        <label className="urdu-text" style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px', lineHeight: 2 }}>{isUrdu ? 'پاس ورڈ' : 'Password'}</label>
                        <input id="signup-password" type={showPw ? 'text' : 'password'} className="input-field" placeholder="••••••••" value={form.password}
                            onChange={e => setForm(p => ({ ...p, password: e.target.value }))} required style={{ paddingRight: '44px' }} />
                        <button type="button" onClick={() => setShowPw(p => !p)} style={{ position: 'absolute', right: '12px', bottom: '12px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>

                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '16px', cursor: 'pointer' }}>
                        <input type="checkbox" checked={form.agreed} onChange={e => setForm(p => ({ ...p, agreed: e.target.checked }))} id="terms-agreed" style={{ marginTop: '4px', accentColor: '#4ADE80' }} />
                        <span className="urdu-text" style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 2 }}>
                            {isUrdu ? 'میں ' : 'I agree to '}<Link to="/app/terms" style={{ color: '#4ADE80', textDecoration: 'none' }}>{isUrdu ? 'شرائط' : 'Terms'}</Link>{isUrdu ? ' اور ' : ' & '}<Link to="/app/privacy" style={{ color: '#4ADE80', textDecoration: 'none' }}>{isUrdu ? 'پرائیویسی پالیسی' : 'Privacy Policy'}</Link>{isUrdu ? ' سے متفق ہوں' : ''}
                        </span>
                    </label>

                    <button type="submit" className="btn-primary w-full" style={{ justifyContent: 'center' }} disabled={loading} id="signup-submit-btn">
                        {loading ? <div className="spinner" /> : <span className="urdu-text">{isUrdu ? 'اکاؤنٹ بنائیں' : 'Create Account'}</span>}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '13px', color: 'var(--text-muted)' }}>
                    <span className="urdu-text" style={{ lineHeight: 2 }}>{isUrdu ? 'پہلے سے اکاؤنٹ ہے؟ ' : 'Already have account? '}</span>
                    <Link to="/app/login" style={{ color: '#4ADE80', textDecoration: 'none', fontWeight: 600 }}>
                        <span className="urdu-text">{isUrdu ? 'لاگ ان کریں' : 'Sign In'}</span>
                    </Link>
                </p>
            </div>
        </div>
    )
}
