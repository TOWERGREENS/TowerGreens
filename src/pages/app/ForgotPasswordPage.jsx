import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import logo from '/logo.png'

export default function ForgotPasswordPage() {
    const { language, showToast } = useApp()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [sent, setSent] = useState(false)
    const [loading, setLoading] = useState(false)
    const isUrdu = language === 'ur' || !language

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email) return
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setSent(true)
            showToast(isUrdu ? 'لنک آپ کی ای میل پر بھیج دیا گیا' : 'Reset link sent to your email', 'success')
        }, 1000)
    }

    return (
        <div style={{ minHeight: '100vh', background: 'radial-gradient(ellipse at center, #0F2E15 0%, #080E0A 70%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
            <div className="glass-card" style={{ width: '100%', maxWidth: '420px', padding: '40px', textAlign: 'center' }}>
                <img src={logo} alt="TowerGreens" style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 16px' }} />
                {!sent ? (
                    <>
                        <h1 className="urdu-text" style={{ fontSize: '22px', fontWeight: 700, color: '#F0F7F1', marginBottom: '8px', lineHeight: 2 }}>
                            {isUrdu ? 'پاسورڈ بھول گئے؟' : 'Forgot Password?'}
                        </h1>
                        <p className="urdu-text" style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '28px', lineHeight: 2 }}>
                            {isUrdu ? 'اپنی ای میل درج کریں۔ ہم آپ کو ری سیٹ لنک بھیجیں گے۔' : 'Enter your email. We will send you a reset link.'}
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '16px', textAlign: 'left' }}>
                                <label className="urdu-text" style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px', lineHeight: 2 }}>
                                    {isUrdu ? 'ای میل' : 'Email'}
                                </label>
                                <input type="email" className="input-field" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com" id="forgot-email" />
                            </div>
                            <button type="submit" className="btn-primary w-full" style={{ justifyContent: 'center', marginBottom: '16px' }} disabled={loading} id="forgot-submit-btn">
                                {loading ? <div className="spinner" /> : <span className="urdu-text">{isUrdu ? 'لنک بھیجیں' : 'Send Reset Link'}</span>}
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <div style={{ fontSize: '56px', marginBottom: '16px' }}>📧</div>
                        <h2 className="urdu-text" style={{ fontSize: '20px', fontWeight: 700, color: '#4ADE80', marginBottom: '8px', lineHeight: 2 }}>
                            {isUrdu ? 'ای میل بھیج دی گئی!' : 'Email Sent!'}
                        </h2>
                        <p className="urdu-text" style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px', lineHeight: 2 }}>
                            {isUrdu ? `${email} پر ری سیٹ لنک بھیجا گیا ہے` : `Reset link sent to ${email}`}
                        </p>
                    </>
                )}
                <Link to="/app/login" style={{ color: '#4ADE80', fontSize: '14px', textDecoration: 'none' }}>
                    <span className="urdu-text" style={{ lineHeight: 2 }}>{isUrdu ? '← لاگ ان پر واپس' : '← Back to Login'}</span>
                </Link>
            </div>
        </div>
    )
}
