import { useState } from 'react'
import { AdminLayout } from '../../components/admin/AdminLayout'

export default function AdminContent() {
    const [heroText, setHeroText] = useState({ ur: 'ہائیڈروپونک سبزیاں — براہ راست آپ کے دروازے تک', en: 'Hydroponic Greens — Fresh to Your Doorstep' })
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)

    const save = () => {
        setSaving(true)
        setTimeout(() => { setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2000) }, 800)
    }

    return (
        <AdminLayout title="Content Management">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Hero Text */}
                <div className="admin-card">
                    <h3 style={{ fontWeight: 700, fontSize: '15px', marginBottom: '16px' }}>🦸 Hero Section Text</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '6px' }}>Urdu Headline</label>
                            <textarea className="input-field urdu-text" rows={3} value={heroText.ur} onChange={e => setHeroText(p => ({ ...p, ur: e.target.value }))} style={{ resize: 'none', lineHeight: 2 }} id="hero-ur" />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '6px' }}>English Headline</label>
                            <textarea className="input-field" rows={3} value={heroText.en} onChange={e => setHeroText(p => ({ ...p, en: e.target.value }))} style={{ resize: 'none' }} id="hero-en" />
                        </div>
                    </div>
                    {saved && <p style={{ color: '#4ADE80', fontSize: '12px', marginBottom: '8px' }}>✅ Saved!</p>}
                    <button className="btn-primary" onClick={save} disabled={saving} style={{ justifyContent: 'center' }}>
                        {saving ? <div className="spinner" /> : 'Save Changes'}
                    </button>
                </div>

                {/* Banners */}
                <div className="admin-card">
                    <h3 style={{ fontWeight: 700, fontSize: '15px', marginBottom: '16px' }}>🖼️ App Banners</h3>
                    {[
                        { title: 'تازہ ترین سبزیاں', subtitle: 'آج ہی آرڈر کریں', emoji: '🌿' },
                        { title: 'مفت ڈیلیوری', subtitle: 'Rs 500 سے اوپر آرڈر پر', emoji: '🚀' },
                        { title: 'TowerGreens Coins', subtitle: 'آرڈر کریں اور کوائنز کمائیں', emoji: '🪙' },
                    ].map((b, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', marginBottom: '8px' }}>
                            <span style={{ fontSize: '24px' }}>{b.emoji}</span>
                            <div style={{ flex: 1 }}>
                                <p className="urdu-text" style={{ fontWeight: 600, lineHeight: 2 }}>{b.title}</p>
                                <p className="urdu-text" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: 2 }}>{b.subtitle}</p>
                            </div>
                            <button style={{ background: 'rgba(59,130,246,0.15)', color: '#60A5FA', border: 'none', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', fontSize: '12px' }}>Edit</button>
                        </div>
                    ))}
                    <button className="btn-ghost" style={{ marginTop: '8px', fontSize: '13px', padding: '10px 20px' }}>+ Add Banner</button>
                </div>

                {/* Social Links */}
                <div className="admin-card">
                    <h3 style={{ fontWeight: 700, fontSize: '15px', marginBottom: '16px' }}>🔗 Social Links</h3>
                    {[
                        { l: 'YouTube', v: 'https://youtube.com/@TowerGreens' },
                        { l: 'Instagram', v: '' },
                        { l: 'Facebook', v: '' },
                    ].map((s, i) => (
                        <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '10px' }}>
                            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', width: '80px', flexShrink: 0, paddingTop: '14px' }}>{s.l}</span>
                            <input className="input-field" defaultValue={s.v} placeholder={`Enter ${s.l} URL`} />
                        </div>
                    ))}
                    <button className="btn-primary" style={{ marginTop: '8px', justifyContent: 'center' }}>Save Links</button>
                </div>
            </div>
        </AdminLayout>
    )
}
