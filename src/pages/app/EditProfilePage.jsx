import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { ArrowLeft, Camera } from 'lucide-react'
import BottomNav from '../../components/app/BottomNav'

export default function EditProfilePage() {
    const { user, setUser, showToast, language } = useApp()
    const navigate = useNavigate()
    const isUrdu = language === 'ur' || !language
    const [form, setForm] = useState({ name: user?.name || '', phone: user?.phone || '', email: user?.email || '' })
    const [saving, setSaving] = useState(false)
    const [avatar, setAvatar] = useState(null)

    const handleSave = (e) => {
        e.preventDefault()
        if (!form.name) return
        setSaving(true)
        setTimeout(() => {
            setUser(prev => ({ ...prev, ...form }))
            setSaving(false)
            showToast(isUrdu ? 'پروفائل اپ ڈیٹ ہو گئی' : 'Profile updated', 'success')
            navigate('/app/profile')
        }, 800)
    }

    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            const url = URL.createObjectURL(file)
            setAvatar(url)
        }
    }

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: '100px' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', position: 'sticky', top: 0, background: 'rgba(8,14,10,0.95)', backdropFilter: 'blur(16px)', zIndex: 50, borderBottom: '1px solid rgba(74,222,128,0.08)' }}>
                <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer' }}><ArrowLeft size={20} /></button>
                <h1 className="urdu-text" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text)', lineHeight: 2 }}>
                    {isUrdu ? 'پروفائل ترمیم' : 'Edit Profile'}
                </h1>
            </div>

            <div style={{ padding: '32px 16px' }}>
                {/* Avatar */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                        <div style={{ width: '96px', height: '96px', borderRadius: '50%', overflow: 'hidden', border: '3px solid #4ADE80', boxShadow: '0 0 20px rgba(74,222,128,0.3)' }}>
                            {avatar ? (
                                <img src={avatar} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #4ADE80, #16A34A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', fontWeight: 700, color: '#080E0A' }}>
                                    {(form.name || 'م')[0]}
                                </div>
                            )}
                        </div>
                        <label htmlFor="avatar-input" style={{ position: 'absolute', bottom: 0, right: 0, width: '32px', height: '32px', borderRadius: '50%', background: '#4ADE80', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <Camera size={14} color="#080E0A" />
                        </label>
                        <input id="avatar-input" type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
                    </div>
                    <p className="urdu-text" style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '10px', lineHeight: 2 }}>
                        {isUrdu ? 'تصویر تبدیل کرنے کے لیے ٹیپ کریں' : 'Tap to change photo'}
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSave} className="glass-card" style={{ padding: '24px' }}>
                    {[
                        { key: 'name', label: isUrdu ? 'نام' : 'Name', type: 'text', ph: isUrdu ? 'آپ کا نام' : 'Your Name' },
                        { key: 'email', label: isUrdu ? 'ای میل' : 'Email', type: 'email', ph: 'email@example.com' },
                        { key: 'phone', label: isUrdu ? 'فون نمبر' : 'Phone', type: 'tel', ph: '03001234567' },
                    ].map(f => (
                        <div key={f.key} style={{ marginBottom: '16px' }}>
                            <label className="urdu-text" style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px', lineHeight: 2 }}>{f.label}</label>
                            <input
                                type={f.type}
                                className="input-field"
                                value={form[f.key]}
                                onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                                placeholder={f.ph}
                                id={`edit-profile-${f.key}`}
                            />
                        </div>
                    ))}
                    <button type="submit" className="btn-primary w-full" style={{ justifyContent: 'center', marginTop: '8px' }} disabled={saving} id="save-profile-btn">
                        {saving ? <div className="spinner" /> : <span className="urdu-text">{isUrdu ? 'محفوظ کریں' : 'Save Changes'}</span>}
                    </button>
                </form>
            </div>
            <BottomNav />
        </div>
    )
}
