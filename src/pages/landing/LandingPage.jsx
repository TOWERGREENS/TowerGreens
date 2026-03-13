import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useScrollReveal, useCountUp } from '../../hooks/useScrollReveal'
import { ChevronDown, Star, ExternalLink, Youtube } from 'lucide-react'
import logo from '/logo.png'

// ─── Landing Header ───
function LandingHeader({ lang, setLang }) {
    const navigate = useNavigate()
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 80)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <header style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 'var(--z-overlay)',
            background: scrolled ? 'rgba(8,14,10,0.92)' : 'transparent',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            transition: 'background 400ms ease, backdrop-filter 400ms ease',
            padding: '16px 32px',
            display: 'flex', alignItems: 'center',
            borderBottom: scrolled ? '1px solid rgba(74,222,128,0.08)' : 'none',
        }}>
            <img src={logo} alt="TowerGreens" style={{ height: '40px', width: '40px', borderRadius: '50%', objectFit: 'cover', cursor: 'pointer' }} onClick={() => navigate('/')} />

            <nav className="hide-mobile" style={{ display: 'flex', gap: '32px', marginLeft: '48px', flex: 1 }}>
                {[
                    ['ہوم', '/'],
                    ['ہائیڈروپونکس', '/how-it-works'],
                    ['بارے میں', '/about'],
                    ['رابطہ', '/contact'],
                ].map(([label, path]) => (
                    <a key={path} href={path} className="urdu-text" style={{
                        fontSize: '14px', color: 'rgba(240,247,241,0.8)',
                        transition: 'color 0.2s', lineHeight: 2,
                    }}
                        onMouseEnter={e => e.target.style.color = '#4ADE80'}
                        onMouseLeave={e => e.target.style.color = 'rgba(240,247,241,0.8)'}
                    >{label}</a>
                ))}
            </nav>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginLeft: 'auto' }}>
                <button
                    onClick={() => setLang(lang === 'ur' ? 'en' : 'ur')}
                    style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: '9999px', padding: '6px 14px', color: '#4ADE80', fontSize: '13px', cursor: 'pointer' }}
                    id="landing-lang-toggle"
                >
                    {lang === 'ur' ? 'EN' : 'اردو'}
                </button>
                <button
                    className="btn-primary hide-mobile"
                    onClick={() => navigate('/app')}
                    style={{ padding: '10px 20px', fontSize: '14px' }}
                    id="landing-order-btn"
                >
                    <span className="urdu-text" style={{ fontSize: '13px' }}>ابھی آرڈر کریں</span>
                </button>
                {/* Mobile hamburger */}
                <button className="show-mobile" style={{ display: 'none', background: 'none', border: 'none', color: '#F0F7F1', cursor: 'pointer' }} onClick={() => setMobileOpen(!mobileOpen)}>
                    <div style={{ width: '24px', height: '2px', background: 'currentColor', marginBottom: '5px', transition: 'all 0.3s', transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
                    <div style={{ width: '24px', height: '2px', background: 'currentColor', marginBottom: '5px', opacity: mobileOpen ? 0 : 1, transition: 'opacity 0.3s' }} />
                    <div style={{ width: '24px', height: '2px', background: 'currentColor', transition: 'all 0.3s', transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div style={{
                    position: 'fixed', inset: 0, background: '#080E0A',
                    zIndex: 'var(--z-modal)', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: '32px',
                }}>
                    <button onClick={() => setMobileOpen(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#F0F7F1', cursor: 'pointer', fontSize: '24px' }}>✕</button>
                    {[
                        ['ہوم', '/'],
                        ['ہائیڈروپونکس', '/how-it-works'],
                        ['بارے میں', '/about'],
                        ['رابطہ', '/contact'],
                    ].map(([label, path]) => (
                        <a key={path} href={path} className="urdu-text" style={{ fontSize: '28px', color: '#F0F7F1' }} onClick={() => setMobileOpen(false)}>{label}</a>
                    ))}
                    <button className="btn-primary" onClick={() => navigate('/app')} style={{ marginTop: '16px' }}>
                        <span className="urdu-text">ابھی آرڈر کریں</span>
                    </button>
                </div>
            )}
        </header>
    )
}

// ─── Section 1: HERO ───
function HeroSection({ lang }) {
    const navigate = useNavigate()
    const [animated, setAnimated] = useState(false)

    useEffect(() => {
        const t = setTimeout(() => setAnimated(true), 100)
        return () => clearTimeout(t)
    }, [])

    const anim = (delay, extra = {}) => ({
        opacity: animated ? 1 : 0,
        transform: animated ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        ...extra,
    })

    return (
        <section style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Animated background - Three.js fallback with CSS */}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, #0F2E15 0%, #080E0A 70%)' }} />
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `radial-gradient(circle at 30% 50%, rgba(74,222,128,0.08) 0%, transparent 60%), radial-gradient(circle at 70% 30%, rgba(57,255,20,0.05) 0%, transparent 50%)`,
            }} />
            {/* Film grain via SVG noise */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.03, pointerEvents: 'none' }}>
                <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
                <rect width="100%" height="100%" filter="url(#noise)" />
            </svg>
            {/* Floating particles */}
            <FloatingParticles />
            {/* Vignette */}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 40%, rgba(8,14,10,0.6) 100%)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', background: 'linear-gradient(transparent, #080E0A)' }} />

            {/* Content */}
            <div className="container-narrow" style={{ position: 'relative', textAlign: 'left', zIndex: 2 }}>
                {/* Badge */}
                <div style={{ ...anim(400), display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: '9999px', padding: '8px 16px', marginBottom: '24px' }}>
                    <span style={{ color: '#4ADE80', fontSize: '14px' }}>🌱</span>
                    <span className="urdu-text" style={{ color: '#4ADE80', fontSize: '13px' }}>لاہور کا پہلا ہائیڈروپونک فارم</span>
                </div>

                {/* Headline */}
                <h1>
                    <span className="urdu-text urdu-hero" style={{ ...anim(700), display: 'block', color: '#F0F7F1', fontFamily: 'var(--font-urdu)' }}>صاف ستھری سبزیاں</span>
                    <span className="urdu-text urdu-hero" style={{ ...anim(900), display: 'block', color: '#4ADE80', fontFamily: 'var(--font-urdu)' }}>سیدھا آپ کے</span>
                    <span className="urdu-text urdu-hero" style={{ ...anim(1100), display: 'block', color: '#F0F7F1', fontFamily: 'var(--font-urdu)' }}>دروازے تک</span>
                </h1>

                {/* Subheadline */}
                <p className="urdu-text urdu-body" style={{ ...anim(1400), color: 'rgba(240,247,241,0.75)', marginTop: '16px', maxWidth: '600px' }}>
                    ہائیڈروپونک ٹاورز میں اُگائی گئی — مٹی کے بغیر، کیمیکل کے بغیر
                </p>

                {/* CTAs */}
                <div style={{ ...anim(1700), display: 'flex', gap: '16px', marginTop: '32px', flexWrap: 'wrap' }}>
                    <button className="btn-primary" onClick={() => navigate('/app')} id="hero-order-btn" style={{ padding: '16px 36px', fontSize: '16px' }}>
                        <span className="urdu-text">ابھی آرڈر کریں</span>
                    </button>
                    <button className="btn-ghost" onClick={() => document.getElementById('how-it-works-section')?.scrollIntoView({ behavior: 'smooth' })} id="hero-how-btn" style={{ padding: '15px 36px', fontSize: '16px' }}>
                        <span className="urdu-text">یہ کیسے کام کرتا ہے؟</span>
                    </button>
                </div>

                {/* Trust badges */}
                <div style={{ ...anim(2100), display: 'flex', gap: '20px', marginTop: '32px', flexWrap: 'wrap' }}>
                    {['✓ مٹی کے بغیر', '✓ 100% صاف', '✓ لاہور میں ڈیلیوری'].map((badge, i) => (
                        <span key={i} className="urdu-text" style={{ color: 'rgba(240,247,241,0.65)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>{badge}</span>
                    ))}
                </div>
            </div>

            {/* Scroll indicator */}
            <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', ...anim(2300) }}>
                <ChevronDown size={28} color="rgba(74,222,128,0.6)" className="bounce-scroll" />
            </div>
        </section>
    )
}

function FloatingParticles() {
    const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 4,
        duration: Math.random() * 6 + 4,
    }))

    return (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {particles.map(p => (
                <div key={p.id} style={{
                    position: 'absolute',
                    left: `${p.x}%`, top: `${p.y}%`,
                    width: `${p.size}px`, height: `${p.size}px`,
                    borderRadius: '50%',
                    background: 'rgba(74,222,128,0.4)',
                    boxShadow: '0 0 8px rgba(74,222,128,0.6)',
                    animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
                }} />
            ))}
        </div>
    )
}

// ─── Section 2: Numbers ───
function NumbersSection() {
    const [ref, isVisible] = useScrollReveal()
    const stats = [
        { value: 100, suffix: '%', labelUr: 'کیمیکل فری', icon: '🧪' },
        { value: 0, suffix: '', labelUr: 'مٹی نہیں', icon: '🌱' },
        { value: 24, suffix: '/7', labelUr: 'تازگی', icon: '⏰' },
        { value: 49, suffix: '/5', labelUr: 'ریٹنگ', icon: '⭐' },
    ]

    return (
        <section ref={ref} style={{ padding: '80px 0', background: 'linear-gradient(135deg, #080E0A 0%, #0A1A0E 100%)' }}>
            <div className="container">
                <div className="grid-4" style={{ gap: '24px' }}>
                    {stats.map((stat, i) => (
                        <StatCard key={i} stat={stat} isVisible={isVisible} delay={i * 150} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function StatCard({ stat, isVisible, delay }) {
    const count = useCountUp(stat.value, isVisible)
    const [hovered, setHovered] = useState(false)

    return (
        <div
            className="glass-card"
            style={{
                padding: '32px 24px', textAlign: 'center',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
                border: hovered ? '1px solid rgba(74,222,128,0.3)' : undefined,
                boxShadow: hovered ? '0 0 24px rgba(74,222,128,0.1)' : undefined,
                cursor: 'default',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div style={{ fontSize: '36px', marginBottom: '8px' }}>{stat.icon}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '40px', fontWeight: 700, color: '#4ADE80', lineHeight: 1 }}>
                {count}{stat.suffix}
            </div>
            <p className="urdu-text" style={{ marginTop: '8px', color: 'rgba(240,247,241,0.7)', fontSize: '15px' }}>{stat.labelUr}</p>
        </div>
    )
}

// ─── Section 3: The Story ───
function StorySection() {
    const [leftRef, leftVisible] = useScrollReveal()
    const [rightRef, rightVisible] = useScrollReveal()

    return (
        <section style={{ padding: '100px 0', background: '#030608' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: '55% 45%', gap: '64px', alignItems: 'center' }}>
                    <div ref={leftRef} style={{ opacity: leftVisible ? 1 : 0, transform: leftVisible ? 'translateX(0)' : 'translateX(-40px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
                        <span className="urdu-text" style={{ color: 'var(--accent-amber)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px', display: 'block' }}>ہم کیا کرتے ہیں؟</span>
                        <h2 className="urdu-text urdu-heading" style={{ color: '#F0F7F1', marginBottom: '24px', lineHeight: 2 }}>
                            روایتی دکانوں سے<br />ہٹ کر، کچھ نیا
                        </h2>
                        <p className="urdu-text urdu-body" style={{ color: 'rgba(240,247,241,0.7)', marginBottom: '24px' }}>
                            TowerGreens لاہور کا پہلا ہائیڈروپونک فارم ہے جہاں سبزیاں مٹی اور کیمیکل کے بغیر اُگائی جاتی ہیں۔ ہمارے ٹاورز میں LED روشنی اور پانی کے نظام سے پاک، صاف سبزیاں تیار ہوتی ہیں۔
                        </p>
                        {['مٹی کے بغیر اُگائی گئی', '100% کیمیکل فری', 'ہر موسم میں دستیاب'].map((pt, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px', opacity: leftVisible ? 1 : 0, transform: leftVisible ? 'translateX(0)' : 'translateX(-20px)', transition: `opacity 0.5s ease ${300 + i * 100}ms, transform 0.5s ease ${300 + i * 100}ms` }}>
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ADE80', boxShadow: '0 0 6px rgba(74,222,128,0.6)', marginTop: '8px', flexShrink: 0 }} />
                                <span className="urdu-text urdu-body" style={{ color: 'rgba(240,247,241,0.8)' }}>{pt}</span>
                            </div>
                        ))}
                    </div>

                    <div ref={rightRef} style={{ opacity: rightVisible ? 1 : 0, transform: rightVisible ? 'scale(1)' : 'scale(0.95)', transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s', position: 'relative' }}>
                        <div style={{
                            height: '500px', borderRadius: '24px', overflow: 'hidden', position: 'relative',
                            background: 'linear-gradient(180deg, #0A2E10 0%, #041508 100%)',
                            boxShadow: 'inset 0 0 60px rgba(74,222,128,0.15), 0 0 40px rgba(74,222,128,0.1)'
                        }}>
                            <img src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600" alt="Hydroponic Tower" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
                            <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 40px rgba(74,222,128,0.2)' }} />
                            {/* Annotation bubbles */}
                            {[
                                { label: 'روشنی', top: '15%', right: '-20px' },
                                { label: 'پانی', top: '45%', right: '-20px' },
                                { label: 'سبزی', bottom: '20%', right: '-20px' },
                            ].map((ann, i) => (
                                <div key={i} style={{
                                    position: 'absolute', ...ann,
                                    background: 'rgba(8,14,10,0.9)', border: '1px solid rgba(74,222,128,0.4)',
                                    borderRadius: '12px', padding: '8px 14px',
                                    animation: `float ${3 + i * 0.5}s ease-in-out ${i * 0.5}s infinite`,
                                }}>
                                    <span className="urdu-text" style={{ color: '#4ADE80', fontSize: '13px' }}>{ann.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

// ─── Section 4: Products Showcase ───
function ProductsShowcase({ lang }) {
    const navigate = useNavigate()
    const [ref, isVisible] = useScrollReveal()
    const [active, setActive] = useState('all')
    const PRODUCTS = [
        { id: '1', name: 'تازہ لیٹس', price: 120, cat: 'veggies', img: 'https://images.unsplash.com/photo-1518977676405-d4b8e4c2c1b9?w=600' },
        { id: '2', name: 'مکس سلاد', price: 350, cat: 'salads', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600' },
        { id: '3', name: 'گرین سموتھی', price: 280, cat: 'super-healthy', img: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=600' },
        { id: '4', name: 'چائنیز ویج', price: 420, cat: 'chinese-style', img: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600' },
        { id: '5', name: 'سبز پالک', price: 150, cat: 'veggies', img: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600' },
        { id: '6', name: 'مائیکرو گرینز', price: 200, cat: 'super-healthy', img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600' },
    ]
    const cats = [
        { id: 'all', label: 'تمام' },
        { id: 'veggies', label: 'سبزیاں' },
        { id: 'salads', label: 'سلاد' },
        { id: 'super-healthy', label: 'سپر ہیلتھی' },
        { id: 'chinese-style', label: 'چائنیز اسٹائل' },
    ]
    const filtered = active === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === active)

    return (
        <section ref={ref} style={{ padding: '100px 0', background: 'linear-gradient(#0A1A0E, #080E0A)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <h2 className="urdu-text urdu-heading" style={{ color: '#F0F7F1', marginBottom: '8px' }}>ہمارے پروڈکٹس</h2>
                    <p className="urdu-text urdu-body" style={{ color: 'rgba(240,247,241,0.6)' }}>تازہ، صاف، آپ کے لیے</p>
                </div>
                <div className="category-chips" style={{ justifyContent: 'center', marginBottom: '40px' }}>
                    {cats.map(c => (
                        <button key={c.id} className={`chip${active === c.id ? ' active' : ''}`} onClick={() => setActive(c.id)} id={`filter-${c.id}`}>
                            <span className="urdu-text">{c.label}</span>
                        </button>
                    ))}
                </div>
                <div className="grid-3" style={{ gap: '24px' }}>
                    {filtered.map((p, i) => (
                        <LandingProductCard key={p.id} product={p} delay={i * 80} isVisible={isVisible} navigate={navigate} />
                    ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: '48px' }}>
                    <button className="btn-ghost" onClick={() => navigate('/app/products')} id="view-all-products-btn" style={{ padding: '14px 40px' }}>
                        <span className="urdu-text">تمام پروڈکٹس دیکھیں</span>
                    </button>
                </div>
            </div>
        </section>
    )
}

function LandingProductCard({ product, delay, isVisible, navigate }) {
    const [hovered, setHovered] = useState(false)
    return (
        <div
            onClick={() => navigate('/app')}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: 'rgba(255,255,255,0.04)', border: `1px solid ${hovered ? 'rgba(74,222,128,0.25)' : 'rgba(74,222,128,0.08)'}`,
                borderRadius: '16px', overflow: 'hidden', cursor: 'pointer',
                transform: isVisible ? (hovered ? 'translateY(-6px)' : 'translateY(0)') : 'translateY(40px)',
                opacity: isVisible ? 1 : 0,
                transition: `opacity 0.6s ease ${delay}ms, transform 0.3s ease`,
                boxShadow: hovered ? '0 16px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(74,222,128,0.1)' : 'none',
            }}
        >
            <div style={{ overflow: 'hidden', aspectRatio: '4/3' }}>
                <img src={product.img} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', transform: hovered ? 'scale(1.05)' : 'scale(1)' }} />
            </div>
            <div style={{ padding: '16px' }}>
                <div style={{ height: '1px', background: 'rgba(74,222,128,0.15)', marginBottom: '12px' }} />
                <p className="urdu-text" style={{ fontSize: '16px', fontWeight: 600, color: '#F0F7F1', marginBottom: '8px', lineHeight: 1.8 }}>{product.name}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span className="pill pill-amber" style={{ fontSize: '11px' }}>ہائیڈروپونک</span>
                    <span style={{ fontFamily: 'var(--font-mono)', color: '#4ADE80', fontSize: '16px', fontWeight: 700 }}>Rs {product.price}</span>
                </div>
                <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '10px', fontSize: '13px' }}>
                    <span className="urdu-text">کارٹ میں شامل کریں</span>
                </button>
            </div>
        </div>
    )
}

// ─── Section 5: How It Works ───
function HowItWorksSection() {
    const [ref, isVisible] = useScrollReveal()
    const steps = [
        { num: '01', icon: '📱', titleUr: 'آرڈر کریں', descUr: 'ہماری ویب سائٹ یا ایپ سے تازہ سبزیاں منتخب کریں' },
        { num: '02', icon: '🌿', titleUr: 'ہم تیار کریں', descUr: 'ہمارے ہائیڈروپونک فارم سے تازہ کٹائی کریں' },
        { num: '03', icon: '🚀', titleUr: 'آپ تک پہنچائیں', descUr: 'تازہ ترین سبزیاں آپ کے دروازے تک پہنچائیں' },
    ]

    return (
        <section id="how-it-works-section" ref={ref} style={{ padding: '100px 0', background: '#030608', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(74,222,128,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div className="container">
                <div className="text-center" style={{ marginBottom: '64px' }}>
                    <h2 className="urdu-text urdu-heading" style={{ color: '#F0F7F1', marginBottom: '8px' }}>یہ کیسے کام کرتا ہے؟</h2>
                    <p className="urdu-text urdu-body" style={{ color: 'rgba(240,247,241,0.6)' }}>تین آسان قدم</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: '0', position: 'relative' }}>
                    {/* Connecting line */}
                    <div style={{
                        position: 'absolute', top: '36px', left: '20%', right: '20%', height: '2px',
                        background: 'linear-gradient(90deg, transparent, rgba(74,222,128,0.4), rgba(74,222,128,0.4), transparent)',
                        overflow: 'hidden',
                    }}>
                        <div style={{
                            height: '100%', background: 'linear-gradient(90deg, #4ADE80, #16A34A)',
                            width: isVisible ? '100%' : '0%', transition: 'width 1200ms ease 300ms'
                        }} />
                    </div>
                    {steps.map((step, i) => (
                        <div key={i} style={{
                            flex: 1, textAlign: 'center', padding: '0 24px', position: 'relative',
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'scale(1)' : 'scale(0.8)',
                            transition: `opacity 0.5s ease ${400 + i * 200}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${400 + i * 200}ms`,
                        }}>
                            <div style={{
                                width: '72px', height: '72px', borderRadius: '50%',
                                background: 'linear-gradient(135deg, #4ADE80, #16A34A)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                margin: '0 auto 24px', fontSize: '28px',
                                boxShadow: '0 0 24px rgba(74,222,128,0.3)',
                            }}>
                                {step.icon}
                            </div>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#4ADE80', letterSpacing: '0.1em', display: 'block', marginBottom: '8px' }}>{step.num}</span>
                            <h3 className="urdu-text" style={{ fontSize: '20px', fontWeight: 700, color: '#F0F7F1', marginBottom: '8px', lineHeight: 1.8 }}>{step.titleUr}</h3>
                            <p className="urdu-text urdu-body" style={{ color: 'rgba(240,247,241,0.6)', fontSize: '14px' }}>{step.descUr}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// ─── Section 6: Bento Grid Dishes ───
function BentoGridSection() {
    const [ref, isVisible] = useScrollReveal()
    const navigate = useNavigate()
    const dishes = [
        { name: 'گرین سلاد باول', price: 'Rs 350', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', large: true },
        { name: 'مکس ویج', price: 'Rs 280', img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600' },
        { name: 'لیٹس رول', price: 'Rs 320', img: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600' },
        { name: 'چائنیز نوڈلز', price: 'Rs 450', img: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800', wide: true },
        { name: 'ٹماٹر سوپ', price: 'Rs 220', img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600' },
        { name: 'مائیکرو گرینز', price: 'Rs 200', img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600' },
    ]

    return (
        <section ref={ref} style={{ padding: '100px 0', background: '#020305' }}>
            <div className="container">
                <div className="text-center" style={{ marginBottom: '48px' }}>
                    <h2 className="urdu-text urdu-heading" style={{ color: '#F0F7F1', marginBottom: '8px' }}>مشہور ڈشز</h2>
                    <p className="urdu-text urdu-body" style={{ color: 'rgba(240,247,241,0.6)' }}>ہمارے ہائیڈروپونک سبزیوں سے تیار</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: 'auto auto', gap: '12px' }}>
                    {dishes.map((dish, i) => (
                        <DishCard key={i} dish={dish} idx={i} isVisible={isVisible} onClick={() => navigate('/app')} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function DishCard({ dish, idx, isVisible, onClick }) {
    const [hovered, setHovered] = useState(false)
    const gridCol = idx === 0 ? '1 / 2' : idx === 3 ? '2 / 4' : 'auto'
    const gridRow = idx === 0 ? '1 / 3' : 'auto'

    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: 'relative', borderRadius: '16px', overflow: 'hidden',
                height: idx === 0 ? '500px' : idx === 3 ? '220px' : '240px',
                cursor: 'pointer', gridColumn: gridCol, gridRow: gridRow,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.5s ease ${idx * 60}ms, transform 0.5s ease ${idx * 60}ms`,
            }}
        >
            <img src={dish.img} alt={dish.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', transform: hovered ? 'scale(1.05)' : 'scale(1)' }} loading="lazy" />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 40%, rgba(8,14,10,0.92) 100%)' }} />
            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
                transform: hovered ? 'translateY(-4px)' : 'translateY(0)', transition: 'transform 0.3s ease',
            }}>
                <span className="urdu-text" style={{ color: '#F0F7F1', fontSize: '16px', fontWeight: 600, lineHeight: 1.6 }}>{dish.name}</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: '#4ADE80', fontWeight: 700 }}>{dish.price}</span>
            </div>
        </div>
    )
}

// ─── Section 7: Testimonials Marquee ───
function TestimonialsSection() {
    const testimonials = [
        { name: 'امجد احمد', city: 'لاہور', rating: 5, quote: 'بہترین سبزیاں! بالکل تازہ اور صاف۔ روایتی بازار کی ضرورت ہی نہیں رہی۔' },
        { name: 'فاطمہ زہراء', city: 'لاہور', rating: 5, quote: 'سلاد کا ذائقہ لاجواب ہے۔ گھر میں سب کو بہت پسند آئی۔' },
        { name: 'بلال رضا', city: 'ڈیفنس، لاہور', rating: 5, quote: 'ڈیلیوری بہت تیز اور پیکنگ بہترین۔ ضرور دوبارہ آرڈر کریں گے۔' },
        { name: 'عائشہ خان', city: 'گلبرگ', rating: 5, quote: 'مٹی کے بغیر سبزیاں؟ یقین نہیں آتا لیکن TowerGreens نے کر دکھایا!' },
        { name: 'محمد علی', city: 'کینال روڈ', rating: 5, quote: 'صحت مند کھانا اب آسان ہو گیا ہے۔ شکریہ TowerGreens!' },
    ]
    const doubled = [...testimonials, ...testimonials]

    return (
        <section style={{ padding: '80px 0', background: '#0A1A0E', overflow: 'hidden' }}>
            <div className="container" style={{ marginBottom: '40px', textAlign: 'center' }}>
                <h2 className="urdu-text urdu-heading" style={{ color: '#F0F7F1' }}>ہمارے گاہکوں کی رائے</h2>
            </div>
            <div className="marquee-wrapper">
                <div className="marquee-track">
                    {doubled.map((t, i) => (
                        <div key={i} className="glass-card" style={{ minWidth: '320px', padding: '24px', flexShrink: 0 }}>
                            <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                                {Array.from({ length: t.rating }).map((_, j) => <Star key={j} size={14} fill="#F59E0B" color="#F59E0B" />)}
                            </div>
                            <p className="urdu-text urdu-body" style={{ color: 'rgba(240,247,241,0.8)', marginBottom: '16px', lineHeight: 2.2 }}>"{t.quote}"</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #4ADE80, #16A34A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#080E0A', fontSize: '16px' }}>
                                    {t.name[0]}
                                </div>
                                <div>
                                    <p className="urdu-text" style={{ fontSize: '14px', fontWeight: 600, color: '#F0F7F1', lineHeight: 1.5 }}>{t.name}</p>
                                    <p className="urdu-text" style={{ fontSize: '12px', color: 'rgba(240,247,241,0.5)', lineHeight: 1.5 }}>{t.city}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// ─── Section 8: Tower Showcase ───
function TowerShowcaseSection() {
    const [ref, isVisible] = useScrollReveal()
    const navigate = useNavigate()
    const annotations = [
        { label: 'LED گرو لائٹس', style: { top: '10%', left: '-120px' } },
        { label: 'پانی کا نظام', style: { top: '35%', right: '-120px' } },
        { label: 'سبزی کی جگہ', style: { top: '62%', left: '-120px' } },
        { label: 'کوئی مٹی نہیں', style: { bottom: '8%', right: '-120px' } },
    ]

    return (
        <section ref={ref} style={{ padding: '100px 0', background: '#020305', overflow: 'visible' }}>
            <div className="container">
                <div className="text-center" style={{ marginBottom: '48px' }}>
                    <h2 className="urdu-text urdu-heading" style={{ color: '#F0F7F1', marginBottom: '8px' }}>ہائیڈروپونک ٹاور — اندر سے دیکھیں</h2>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', maxWidth: '400px', margin: '0 auto' }}>
                    <div style={{
                        width: '100%', height: '600px', borderRadius: '24px', overflow: 'hidden',
                        opacity: isVisible ? 1 : 0, transform: isVisible ? 'scale(1)' : 'scale(0.95)',
                        transition: 'opacity 0.7s ease, transform 0.7s ease',
                        boxShadow: '0 0 60px rgba(74,222,128,0.15)',
                    }}>
                        <img src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600" alt="Hydroponic Tower" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 60px rgba(74,222,128,0.1)' }} />
                    </div>
                    {annotations.map((ann, i) => (
                        <div key={i} style={{
                            position: 'absolute', ...ann.style,
                            background: 'rgba(8,14,10,0.92)', border: '1px solid rgba(74,222,128,0.4)',
                            borderRadius: '12px', padding: '8px 16px', width: '110px',
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
                            transition: `opacity 0.5s ease ${300 + i * 150}ms, transform 0.5s ease ${300 + i * 150}ms`,
                            animation: isVisible ? `float ${3 + i * 0.7}s ease-in-out ${i * 0.3}s infinite` : 'none',
                        }}>
                            <span className="urdu-text" style={{ color: '#4ADE80', fontSize: '12px', lineHeight: 1.8 }}>{ann.label}</span>
                        </div>
                    ))}
                </div>
                <div className="text-center" style={{ marginTop: '40px' }}>
                    <button className="btn-ghost" onClick={() => navigate('/how-it-works')} id="learn-more-tower-btn">
                        <span className="urdu-text">مزید جانیں</span>
                    </button>
                </div>
            </div>
        </section>
    )
}

// ─── Section 9: Final CTA ───
function FinalCtaSection() {
    const navigate = useNavigate()
    const [ref, isVisible] = useScrollReveal()

    return (
        <section ref={ref} style={{ padding: '120px 0', background: 'linear-gradient(135deg, #0A2E10, #080E0A)', position: 'relative', overflow: 'hidden' }}>
            <div className="glow-pulse" style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: '600px', height: '600px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(74,222,128,0.12) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />
            <div className="container-narrow text-center" style={{ position: 'relative' }}>
                <h2 className="urdu-text urdu-hero" style={{
                    color: '#F0F7F1', marginBottom: '16px',
                    opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'opacity 0.7s ease, transform 0.7s ease'
                }}>
                    آج ہی شامل ہوں<br />
                    <span style={{ color: '#4ADE80' }}>TowerGreens</span> فیملی میں
                </h2>
                <p className="urdu-text urdu-body" style={{ color: 'rgba(240,247,241,0.7)', marginBottom: '40px', opacity: isVisible ? 1 : 0, transition: 'opacity 0.7s ease 0.2s' }}>
                    لاہور کی سب سے صاف سبزیاں، ابھی آرڈر کریں
                </p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '32px', opacity: isVisible ? 1 : 0, transition: 'opacity 0.7s ease 0.4s' }}>
                    <button className="btn-primary" onClick={() => navigate('/app')} id="final-cta-order-btn" style={{ padding: '18px 48px', fontSize: '18px' }}>
                        <span className="urdu-text">ابھی آرڈر کریں</span>
                    </button>
                    <button className="btn-ghost" onClick={() => navigate('/app/signup')} id="final-cta-signup-btn" style={{ padding: '17px 48px', fontSize: '18px' }}>
                        <span className="urdu-text">اکاؤنٹ بنائیں</span>
                    </button>
                </div>
                <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap', opacity: isVisible ? 1 : 0, transition: 'opacity 0.7s ease 0.6s' }}>
                    {['100% محفوظ', 'JazzCash ادائیگی', 'تیز ڈیلیوری'].map((t, i) => (
                        <span key={i} className="urdu-text" style={{ color: 'rgba(240,247,241,0.5)', fontSize: '13px' }}>✓ {t}</span>
                    ))}
                </div>
            </div>
        </section>
    )
}

// ─── Footer ───
function LandingFooter() {
    const navigate = useNavigate()
    return (
        <footer style={{ background: '#030608', borderTop: '1px solid rgba(74,222,128,0.1)', paddingTop: '80px' }}>
            <div className="shimmer-border" />
            <div className="container" style={{ paddingTop: '40px' }}>
                <div className="grid-4" style={{ gap: '48px', marginBottom: '60px' }}>
                    {/* Column 1: Brand */}
                    <div className="scroll-reveal">
                        <img src={logo} alt="TowerGreens" style={{ height: '48px', width: '48px', borderRadius: '50%', objectFit: 'cover', marginBottom: '16px' }} />
                        <p className="urdu-text" style={{ color: '#4ADE80', fontWeight: 700, fontSize: '18px', marginBottom: '8px', lineHeight: 2 }}>TowerGreens</p>
                        <p className="urdu-text urdu-body" style={{ color: 'rgba(240,247,241,0.5)', fontSize: '13px' }}>صاف ستھری سبزیاں، ہمیشہ تازہ</p>
                    </div>
                    {/* Column 2: Quick Links */}
                    <div className="scroll-reveal">
                        <h4 className="urdu-text" style={{ color: '#F0F7F1', fontSize: '15px', fontWeight: 700, marginBottom: '20px', lineHeight: 2 }}>روابط</h4>
                        {[['ہم کون ہیں', '/about'], ['ہائیڈروپونکس', '/how-it-works'], ['رابطہ', '/contact'], ['اکثر پوچھے گئے سوالات', '/faq']].map(([l, p]) => (
                            <a key={p} href={p} className="urdu-text" style={{ display: 'block', color: 'rgba(240,247,241,0.55)', fontSize: '14px', marginBottom: '10px', lineHeight: 2, transition: 'color 0.2s' }}
                                onMouseEnter={e => e.target.style.color = '#4ADE80'} onMouseLeave={e => e.target.style.color = 'rgba(240,247,241,0.55)'}>{l}</a>
                        ))}
                    </div>
                    {/* Column 3: Categories */}
                    <div className="scroll-reveal">
                        <h4 className="urdu-text" style={{ color: '#F0F7F1', fontSize: '15px', fontWeight: 700, marginBottom: '20px', lineHeight: 2 }}>کیٹیگریز</h4>
                        {[['سبزیاں', '/app/products'], ['سلاد', '/app/products'], ['صحت مند کھانا', '/app/products'], ['چائنیز اسٹائل', '/app/products']].map(([l, p]) => (
                            <a key={l} href={p} className="urdu-text" style={{ display: 'block', color: 'rgba(240,247,241,0.55)', fontSize: '14px', marginBottom: '10px', lineHeight: 2, transition: 'color 0.2s' }}
                                onMouseEnter={e => e.target.style.color = '#4ADE80'} onMouseLeave={e => e.target.style.color = 'rgba(240,247,241,0.55)'}>{l}</a>
                        ))}
                    </div>
                    {/* Column 4: Contact */}
                    <div className="scroll-reveal">
                        <h4 className="urdu-text" style={{ color: '#F0F7F1', fontSize: '15px', fontWeight: 700, marginBottom: '20px', lineHeight: 2 }}>رابطہ</h4>
                        <a href="mailto:support@towergreens.site" style={{ display: 'block', color: 'rgba(240,247,241,0.55)', fontSize: '13px', marginBottom: '12px', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#4ADE80'} onMouseLeave={e => e.target.style.color = 'rgba(240,247,241,0.55)'}>support@towergreens.site</a>
                        <a href="https://youtube.com/@TowerGreens" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', fontSize: '13px', marginBottom: '12px' }}>
                            <Youtube size={16} /> YouTube
                        </a>
                        <button onClick={() => navigate('/app/direct-message')} className="urdu-text" style={{ background: 'none', border: '1px solid rgba(74,222,128,0.3)', borderRadius: '8px', padding: '8px 16px', color: '#4ADE80', cursor: 'pointer', fontSize: '13px', lineHeight: 2 }}>
                            ڈائریکٹ میسج
                        </button>
                    </div>
                </div>

                <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '24px' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
                    <p style={{ color: 'rgba(240,247,241,0.4)', fontSize: '13px' }}>© 2026 TowerGreens. All rights reserved.</p>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        {[['شرائط', '/terms'], ['رازداری', '/privacy'], ['اردو', '#'], ['EN', '#']].map(([l, p]) => (
                            <a key={l} href={p} className="urdu-text" style={{ color: 'rgba(240,247,241,0.4)', fontSize: '12px', lineHeight: 2, transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#4ADE80'} onMouseLeave={e => e.target.style.color = 'rgba(240,247,241,0.4)'}>{l}</a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}

// ─── Main Landing Page ───
export default function LandingPage() {
    const [lang, setLang] = useState('ur')

    // Scroll reveal setup
    useEffect(() => {
        const els = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right')
        const observer = new IntersectionObserver(
            (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
            { threshold: 0.1 }
        )
        els.forEach(el => observer.observe(el))
        return () => observer.disconnect()
    }, [])

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', overflowX: 'hidden' }}>
            <LandingHeader lang={lang} setLang={setLang} />
            <HeroSection lang={lang} />
            <NumbersSection />
            <StorySection />
            <ProductsShowcase lang={lang} />
            <HowItWorksSection />
            <BentoGridSection />
            <TestimonialsSection />
            <TowerShowcaseSection />
            <FinalCtaSection />
            <LandingFooter />
        </div>
    )
}
