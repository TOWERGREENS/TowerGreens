import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import logo from '/logo.png'

export default function LanguageSelect() {
    const { selectLanguage } = useApp()
    const navigate = useNavigate()

    const handleSelect = (lang) => {
        selectLanguage(lang)
        navigate('/app/home')
    }

    return (
        <div style={{
            minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', padding: '32px',
            background: 'radial-gradient(ellipse at center, #0F2E15 0%, #080E0A 70%)',
        }}>
            <img src={logo} alt="TowerGreens" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginBottom: '32px', boxShadow: '0 0 32px rgba(74,222,128,0.3)' }} />
            <h1 className="urdu-text" style={{ fontSize: '28px', fontWeight: 700, color: '#F0F7F1', marginBottom: '8px', textAlign: 'center', lineHeight: 2 }}>زبان منتخب کریں</h1>
            <p style={{ color: 'rgba(240,247,241,0.5)', fontSize: '14px', marginBottom: '48px' }}>Select Language</p>

            <div style={{ display: 'flex', gap: '16px', width: '100%', maxWidth: '480px', flexDirection: 'column' }}>
                {/* Urdu — Recommended */}
                <button
                    id="lang-select-urdu"
                    onClick={() => handleSelect('ur')}
                    style={{
                        background: 'rgba(74,222,128,0.08)', border: '2px solid rgba(74,222,128,0.5)',
                        borderRadius: '16px', padding: '24px', cursor: 'pointer', textAlign: 'left',
                        position: 'relative', transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(74,222,128,0.12)'; e.currentTarget.style.boxShadow = '0 0 24px rgba(74,222,128,0.2)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(74,222,128,0.08)'; e.currentTarget.style.boxShadow = 'none' }}
                >
                    <span style={{ position: 'absolute', top: '12px', right: '12px', background: 'linear-gradient(135deg, #4ADE80, #16A34A)', color: '#080E0A', borderRadius: '9999px', padding: '2px 10px', fontSize: '11px', fontWeight: 700 }}>RECOMMENDED</span>
                    <p className="urdu-text" style={{ fontSize: '24px', fontWeight: 700, color: '#4ADE80', lineHeight: 2 }}>اردو</p>
                    <p className="urdu-text" style={{ fontSize: '14px', color: 'rgba(240,247,241,0.6)', lineHeight: 1.8 }}>تجویز کردہ</p>
                </button>

                {/* English */}
                <button
                    id="lang-select-english"
                    onClick={() => handleSelect('en')}
                    style={{
                        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '16px', padding: '20px', cursor: 'pointer', textAlign: 'left',
                        transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
                >
                    <p style={{ fontSize: '20px', fontWeight: 700, color: '#F0F7F1' }}>English</p>
                    <p style={{ fontSize: '13px', color: 'rgba(240,247,241,0.5)' }}>Continue in English</p>
                </button>
            </div>
        </div>
    )
}
