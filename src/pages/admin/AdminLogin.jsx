import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { Eye, EyeOff } from 'lucide-react'
import logo from '/logo.png'

export default function AdminLogin() {
    const { login } = useApp()
    const navigate = useNavigate()
    const [email, setEmail] = useState('admin@towergreens.site')
    const [pass, setPass] = useState('')
    const [showPass, setShowPass] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')
        if (email !== 'admin@towergreens.site') { setError('Only admin@towergreens.site can access this panel'); return }
        setLoading(true)
        setTimeout(() => {
            login(email, pass)
            setLoading(false)
            navigate('/admin/dashboard')
        }, 800)
    }

    return (
        <div style={{ minHeight: '100vh', background: '#0D0F14', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
            <div style={{ background: '#141820', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '48px', width: '100%', maxWidth: '400px' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <img src={logo} alt="TowerGreens" style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 16px' }} />
                    <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>Admin Panel</h1>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>TowerGreens Command Center</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '14px' }}>
                        <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</label>
                        <input type="email" className="input-field" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@towergreens.site" id="admin-email" />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <input type={showPass ? 'text' : 'password'} className="input-field" value={pass} onChange={e => setPass(e.target.value)} placeholder="Password" id="admin-password" style={{ paddingRight: '48px' }} />
                            <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>
                                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>
                    {error && <p style={{ color: '#ef4444', fontSize: '13px', marginBottom: '16px' }}>{error}</p>}
                    <button type="submit" className="btn-primary w-full" style={{ justifyContent: 'center' }} disabled={loading} id="admin-login-btn">
                        {loading ? <div className="spinner" /> : 'Login to Admin Panel'}
                    </button>
                </form>
                <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(74,222,128,0.04)', borderRadius: '10px', border: '1px solid rgba(74,222,128,0.1)', fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>
                    <p>Email: admin@towergreens.site</p>
                    <p>Password: quick@43_21aB (use any for demo)</p>
                </div>
            </div>
        </div>
    )
}
