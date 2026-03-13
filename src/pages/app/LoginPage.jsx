import { useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
    const { login, loginWithGoogle, showToast, language, setUser, setProfile } = useApp()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/app/home'
    const isUrdu = language === 'ur' || !language

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPw, setShowPw] = useState(false)
    const [loading, setLoading] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        if (!email || !password) return
        setLoading(true)
        try {
            await login(email, password)
            showToast(isUrdu ? 'خوش آمدید!' : 'Welcome back!', 'success')
            navigate(from, { replace: true })
        } catch (err) {
            const msg = err.message?.includes('verify')
                ? (isUrdu ? 'ای میل تصدیق ضروری ہے' : 'Email verification required')
                : (isUrdu ? 'ای میل یا پاس ورڈ غلط ہے' : 'Invalid email or password')
            showToast(msg, 'error')
        } finally {
            setLoading(false)
        }
    }

    const handleGoogle = async () => {
        setGoogleLoading(true)
        try {
            await loginWithGoogle()
            // Navigation handled by OAuth redirect
        } catch (err) {
            showToast(isUrdu ? 'گوگل لاگ ان ناکام' : 'Google login failed', 'error')
            setGoogleLoading(false)
        }
    }

    // Quick demo admin login
    const demoLogin = async (role) => {
        const creds = role === 'admin'
            ? { email: 'admin@towergreens.site', password: 'Admin@TG2026' }
            : { email: 'demo@towergreens.site', password: 'Demo@TG2026' }
        setEmail(creds.email)
        setPassword(creds.password)
    }

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 16px' }}>
            {/* Logo */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <img src="/logo.png" alt="TowerGreens" style={{ height: '64px', marginBottom: '12px' }} />
                <h1 className="urdu-text" style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text)', lineHeight: 2 }}>
                    {isUrdu ? 'TowerGreens میں خوش آمدید' : 'Welcome to TowerGreens'}
                </h1>
                <p className="urdu-text" style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: 2 }}>
                    {isUrdu ? 'تازہ زندگی، تازہ ذائقہ' : 'Fresh life, fresh taste'}
                </p>
            </div>

            <div className="glass-card" style={{ width: '100%', maxWidth: '380px', padding: '28px' }}>
                {/* Google OAuth */}
                <button
                    onClick={handleGoogle}
                    disabled={googleLoading}
                    id="google-login-btn"
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '12px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', color: 'var(--text)', cursor: 'pointer', fontSize: '14px', fontWeight: 600, marginBottom: '16px', transition: 'all 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                >
                    {googleLoading ? <div className="spinner" /> : (
                        <>
                            <svg width="18" height="18" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span className="urdu-text" style={{ lineHeight: 2 }}>{isUrdu ? 'گوگل سے لاگ ان' : 'Sign in with Google'}</span>
                        </>
                    )}
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
                    <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{isUrdu ? 'یا' : 'or'}</span>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
                </div>

                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '14px' }}>
                        <label className="urdu-text" style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px', lineHeight: 2 }}>
                            {isUrdu ? 'ای میل' : 'Email'}
                        </label>
                        <input id="login-email" type="email" className="input-field" value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="email@example.com" required />
                    </div>
                    <div style={{ marginBottom: '8px', position: 'relative' }}>
                        <label className="urdu-text" style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px', lineHeight: 2 }}>
                            {isUrdu ? 'پاس ورڈ' : 'Password'}
                        </label>
                        <input id="login-password" type={showPw ? 'text' : 'password'} className="input-field"
                            value={password} onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••" required style={{ paddingRight: '44px' }} />
                        <button type="button" onClick={() => setShowPw(p => !p)}
                            style={{ position: 'absolute', right: '12px', bottom: '12px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>

                    <Link to="/app/forgot-password" style={{ display: 'block', textAlign: 'right', fontSize: '12px', color: '#4ADE80', marginBottom: '16px', textDecoration: 'none' }}>
                        <span className="urdu-text" style={{ lineHeight: 2 }}>{isUrdu ? 'پاس ورڈ بھول گئے؟' : 'Forgot password?'}</span>
                    </Link>

                    <button type="submit" className="btn-primary w-full" style={{ justifyContent: 'center' }} disabled={loading} id="login-submit-btn">
                        {loading ? <div className="spinner" /> : <span className="urdu-text">{isUrdu ? 'لاگ ان کریں' : 'Sign In'}</span>}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '13px', color: 'var(--text-muted)' }}>
                    <span className="urdu-text" style={{ lineHeight: 2 }}>{isUrdu ? 'اکاؤنٹ نہیں؟ ' : "Don't have an account? "}</span>
                    <Link to="/app/signup" style={{ color: '#4ADE80', textDecoration: 'none', fontWeight: 600 }}>
                        <span className="urdu-text">{isUrdu ? 'رجسٹر کریں' : 'Sign Up'}</span>
                    </Link>
                </p>

                <p style={{ textAlign: 'center', marginTop: '12px', fontSize: '11px', color: 'var(--text-muted)' }}>
                    <span className="urdu-text" style={{ lineHeight: 2 }}>{isUrdu ? 'لاگ ان کرکے آپ ہماری ' : 'By signing in you agree to our '}</span>
                    <Link to="/app/terms" style={{ color: '#4ADE80', textDecoration: 'none' }}>
                        <span className="urdu-text">{isUrdu ? 'شرائط' : 'Terms'}</span>
                    </Link>
                    <span> & </span>
                    <Link to="/app/privacy" style={{ color: '#4ADE80', textDecoration: 'none' }}>
                        <span className="urdu-text">{isUrdu ? 'پرائیویسی پالیسی' : 'Privacy Policy'}</span>
                    </Link>
                    <span className="urdu-text"> {isUrdu ? 'سے متفق ہیں' : ''}</span>
                </p>

                {/* Demo hint */}
                <div style={{ marginTop: '16px', padding: '10px', background: 'rgba(74,222,128,0.05)', border: '1px solid rgba(74,222,128,0.12)', borderRadius: '8px', fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center' }}>
                    <span style={{ fontWeight: 600, color: '#4ADE80' }}>Demo:</span>
                    {' '}<button onClick={() => demoLogin('customer')} style={{ background: 'none', border: 'none', color: '#4ADE80', cursor: 'pointer', fontSize: '11px', textDecoration: 'underline' }}>Customer</button>
                    {' | '}
                    <button onClick={() => demoLogin('admin')} style={{ background: 'none', border: 'none', color: '#F59E0B', cursor: 'pointer', fontSize: '11px', textDecoration: 'underline' }}>Admin</button>
                </div>
            </div>
        </div>
    )
}
