import { useNavigate } from 'react-router-dom'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import logo from '/logo.png'

function LandingShell({ children, title }) {
    const navigate = useNavigate()
    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
            <div style={{ background: 'rgba(8,14,10,0.95)', borderBottom: '1px solid rgba(74,222,128,0.08)', padding: '16px 32px', display: 'flex', alignItems: 'center', gap: '16px', position: 'sticky', top: 0, zIndex: 100 }}>
                <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '20px' }}>←</button>
                <img src={logo} alt="TowerGreens" style={{ height: '32px', width: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                <h1 className="urdu-text" style={{ fontSize: '18px', fontWeight: 700, color: '#F0F7F1', lineHeight: 2 }}>{title}</h1>
            </div>
            <div className="container-narrow" style={{ padding: '60px 24px' }}>{children}</div>
        </div>
    )
}

export function AboutPage() {
    const navigate = useNavigate()
    return (
        <LandingShell title="ہمارے بارے میں">
            <h2 className="urdu-text" style={{ fontSize: '32px', color: '#F0F7F1', marginBottom: '16px', lineHeight: 2 }}>TowerGreens کی کہانی</h2>
            <p className="urdu-text urdu-body" style={{ color: 'rgba(240,247,241,0.7)', lineHeight: 2.4, marginBottom: '24px' }}>
                TowerGreens لاہور کا پہلا ہائیڈروپونک فارم ہے جہاں سبزیاں مٹی اور کیمیکل کے بغیر اُگائی جاتی ہیں۔ ہم یقین رکھتے ہیں کہ صاف، تازہ سبزیاں ہر گھر تک پہنچنی چاہئیں۔
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '40px' }}>
                {[['🌱', '100% کیمیکل فری'], ['💧', 'مٹی کے بغیر'], ['⚡', 'LED روشنی سے'], ['🏙️', 'لاہور میں اُگتا ہے']].map(([icon, label], i) => (
                    <div key={i} className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
                        <span style={{ fontSize: '32px', display: 'block', marginBottom: '8px' }}>{icon}</span>
                        <span className="urdu-text" style={{ fontSize: '14px', color: '#4ADE80', lineHeight: 2 }}>{label}</span>
                    </div>
                ))}
            </div>
            <button className="btn-primary" onClick={() => navigate('/app')}>
                <span className="urdu-text">ابھی آرڈر کریں</span>
            </button>
        </LandingShell>
    )
}

export function HowItWorksPage() {
    return (
        <LandingShell title="یہ کیسے کام کرتا ہے؟">
            <h2 className="urdu-text" style={{ fontSize: '28px', color: '#F0F7F1', marginBottom: '32px', lineHeight: 2 }}>ہائیڈروپونکس کیا ہے؟</h2>
            {[
                { num: '01', title: 'پانی بنیاد ہے', body: 'ہائیڈروپونکس میں پانی ہی غذائی اجزاء کا ذریعہ ہے۔ مٹی کی بالکل ضرورت نہیں۔', icon: '💧' },
                { num: '02', title: 'LED روشنی', body: 'خاص LED لائٹس پودے کو سورج کی جگہ روشنی دیتی ہیں۔ ہر موسم میں کام کرتا ہے۔', icon: '💡' },
                { num: '03', title: 'صاف ہوا', body: 'فارم کے اندر صاف ہوا اور کنٹرول درجۂ حرارت — مثالی ماحول۔', icon: '🌬️' },
                { num: '04', title: 'آپ کا کھانا', body: 'تازہ کٹی ہوئی سبزیاں سیدھے آپ کے دروازے تک۔', icon: '🏠' },
            ].map((step, i) => (
                <div key={i} className="glass-card" style={{ padding: '24px', marginBottom: '12px', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '32px', flexShrink: 0 }}>{step.icon}</span>
                    <div>
                        <span style={{ fontFamily: 'var(--font-mono)', color: 'rgba(74,222,128,0.6)', fontSize: '12px', display: 'block', marginBottom: '4px' }}>{step.num}</span>
                        <h3 className="urdu-text" style={{ fontSize: '18px', fontWeight: 700, color: '#F0F7F1', marginBottom: '8px', lineHeight: 2 }}>{step.title}</h3>
                        <p className="urdu-text urdu-body" style={{ color: 'rgba(240,247,241,0.65)', lineHeight: 2.2 }}>{step.body}</p>
                    </div>
                </div>
            ))}
        </LandingShell>
    )
}

export function ContactPage() {
    return (
        <LandingShell title="رابطہ کریں">
            <h2 className="urdu-text" style={{ fontSize: '28px', color: '#F0F7F1', marginBottom: '24px', lineHeight: 2 }}>ہم سے بات کریں</h2>
            <div className="glass-card" style={{ padding: '24px', marginBottom: '16px' }}>
                {[
                    { icon: '📧', label: 'ای میل', val: 'support@towergreens.site' },
                    { icon: '📺', label: 'یوٹیوب', val: 'youtube.com/@TowerGreens' },
                    { icon: '📍', label: 'مقام', val: 'لاہور، پاکستان' },
                ].map((c, i) => (
                    <div key={i} style={{ display: 'flex', gap: '16px', padding: '16px 0', borderBottom: i < 2 ? '1px solid rgba(74,222,128,0.06)' : 'none' }}>
                        <span style={{ fontSize: '24px' }}>{c.icon}</span>
                        <div>
                            <p className="urdu-text" style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 2 }}>{c.label}</p>
                            <p style={{ color: '#4ADE80', fontSize: '14px' }}>{c.val}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="glass-card" style={{ padding: '24px' }}>
                <h3 className="urdu-text" style={{ fontWeight: 700, marginBottom: '16px', lineHeight: 2 }}>پیغام بھیجیں</h3>
                {['نام', 'ای میل', 'پیغام'].map((label, i) => (
                    <div key={i} style={{ marginBottom: '12px' }}>
                        <label className="urdu-text" style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '5px', lineHeight: 2 }}>{label}</label>
                        {i === 2 ? <textarea className="input-field" rows={4} style={{ resize: 'none' }} /> : <input className="input-field" />}
                    </div>
                ))}
                <button className="btn-primary" style={{ justifyContent: 'center', width: '100%' }}>
                    <span className="urdu-text">بھیجیں</span>
                </button>
            </div>
        </LandingShell>
    )
}

export function TermsPage({ lang }) {
    return (
        <LandingShell title={lang === 'en' ? 'Terms & Conditions' : 'شرائط و ضوابط'}>
            <h2 className="urdu-text" style={{ fontSize: '24px', color: '#F0F7F1', marginBottom: '24px', lineHeight: 2 }}>
                {lang === 'en' ? 'Terms & Conditions' : 'شرائط و ضوابط'}
            </h2>
            {['آرڈر اور ادائیگی', 'ڈیلیوری', 'واپسی کی پالیسی', 'TowerGreens Coins', 'گوپنیت'].map((section, i) => (
                <div key={i} className="glass-card" style={{ padding: '20px', marginBottom: '12px' }}>
                    <h3 className="urdu-text" style={{ fontSize: '16px', fontWeight: 700, color: '#4ADE80', marginBottom: '8px', lineHeight: 2 }}>{section}</h3>
                    <p className="urdu-text urdu-body" style={{ color: 'rgba(240,247,241,0.65)', lineHeight: 2.4, fontSize: '14px' }}>
                        یہ حصہ {section} سے متعلق ہمارے قوانین اور شرائط بیان کرتا ہے۔ براہ کرم پڑھیں اور سمجھیں۔
                    </p>
                </div>
            ))}
        </LandingShell>
    )
}

export function PrivacyPage({ lang }) {
    return (
        <LandingShell title={lang === 'en' ? 'Privacy Policy' : 'رازداری کی پالیسی'}>
            <h2 className="urdu-text" style={{ fontSize: '24px', color: '#F0F7F1', marginBottom: '24px', lineHeight: 2 }}>رازداری کی پالیسی</h2>
            <p className="urdu-text urdu-body" style={{ color: 'rgba(240,247,241,0.7)', lineHeight: 2.4, marginBottom: '20px' }}>
                TowerGreens آپ کی ذاتی معلومات کی حفاظت کو اولین ترجیح دیتی ہے۔ ہم آپ کا ڈیٹا کسی تیسرے فریق کو فروخت یا شیئر نہیں کرتے۔
            </p>
            {['ڈیٹا جمع کرنا', 'ڈیٹا استعمال', 'کوکیز', 'آپ کے حقوق'].map((s, i) => (
                <div key={i} className="glass-card" style={{ padding: '20px', marginBottom: '12px' }}>
                    <h3 className="urdu-text" style={{ fontSize: '15px', fontWeight: 700, color: '#4ADE80', marginBottom: '6px', lineHeight: 2 }}>{s}</h3>
                    <p className="urdu-text" style={{ color: 'rgba(240,247,241,0.6)', fontSize: '13px', lineHeight: 2.2 }}>
                        {s} سے متعلق ہماری پالیسی یہ ہے کہ آپ کا ڈیٹا محفوظ رہے۔
                    </p>
                </div>
            ))}
        </LandingShell>
    )
}

export function FaqPage() {
    const [open, setOpen] = useState(null)
    const faqs = [
        { q: 'آرڈر کتنے وقت میں ملتا ہے؟', a: 'ہم 30-60 منٹ میں لاہور کے تمام حصوں میں ڈیلیوری کرتے ہیں۔' },
        { q: 'کیا مٹی کے بغیر سبزیاں واقعی مزیدار ہیں؟', a: 'بالکل! ہائیڈروپونک سبزیاں روایتی سبزیوں سے زیادہ تازہ اور غذائیت سے بھرپور ہوتی ہیں۔' },
        { q: 'JazzCash کیسے ادا کریں؟', a: 'چیک آؤٹ پر JazzCash منتخب کریں، اپنا نمبر درج کریں، اور OTP سے تصدیق کریں۔' },
        { q: 'TowerGreens Coins کیا ہیں؟', a: 'ہر آرڈر پر Coins ملتے ہیں۔ 500 Coins پر Rs 500 کی چھوٹ ملتی ہے۔' },
        { q: 'واپسی کی پالیسی کیا ہے؟', a: 'اگر پروڈکٹ خراب ہو تو 24 گھنٹے کے اندر ہم سے رابطہ کریں، ہم بدل دیں گے۔' },
    ]

    return (
        <LandingShell title="اکثر پوچھے گئے سوالات">
            <h2 className="urdu-text" style={{ fontSize: '28px', color: '#F0F7F1', marginBottom: '32px', lineHeight: 2 }}>FAQ</h2>
            {faqs.map((faq, i) => (
                <div key={i} className="glass-card" style={{ marginBottom: '8px', overflow: 'hidden' }}>
                    <div className="accordion-header" onClick={() => setOpen(open === i ? null : i)}>
                        <span className="urdu-text" style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)', lineHeight: 2 }}>{faq.q}</span>
                        <span style={{ color: '#4ADE80', transition: 'transform 0.3s', transform: open === i ? 'rotate(180deg)' : 'rotate(0)' }}>▾</span>
                    </div>
                    {open === i && (
                        <div style={{ padding: '0 16px 16px' }}>
                            <p className="urdu-text urdu-body" style={{ color: 'rgba(240,247,241,0.7)', lineHeight: 2.2 }}>{faq.a}</p>
                        </div>
                    )}
                </div>
            ))}
        </LandingShell>
    )
}

import { useState } from 'react'

// Default exports for lazy-loadable routes
export default AboutPage
