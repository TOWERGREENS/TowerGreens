import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { Search, ChevronRight } from 'lucide-react'
import BottomNav from '../../components/app/BottomNav'
import AppHeader from '../../components/app/AppHeader'
import ProductCard from '../../components/app/ProductCard'
import OtpCoinsPopup from '../../components/app/OtpCoinsPopup'

export default function AppHome() {
    const { user, language, products, banners } = useApp()
    const navigate = useNavigate()
    const [activeCategory, setActiveCategory] = useState('all')
    const [bannerIndex, setBannerIndex] = useState(0)
    const [loading, setLoading] = useState(true)
    const [showOtpCoins, setShowOtpCoins] = useState(false)

    // Simulate loading
    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 600)
        return () => clearTimeout(t)
    }, [])

    // Auto-rotate banners every 4s
    useEffect(() => {
        const t = setInterval(() => setBannerIndex(i => (i + 1) % banners.length), 4000)
        return () => clearInterval(t)
    }, [banners.length])

    const isUrdu = language === 'ur' || !language
    const t = id => isUrdu ? URDU[id] : ENGLISH[id]

    const categories = [
        { id: 'all', ur: 'تمام', en: 'All' },
        { id: 'veggies', ur: 'سبزیاں', en: 'Veggies' },
        { id: 'salads', ur: 'سلاد', en: 'Salads' },
        { id: 'healthy-food', ur: 'صحت مند', en: 'Healthy' },
        { id: 'chinese-style', ur: 'چائنیز', en: 'Chinese' },
        { id: 'super-healthy', ur: 'سپر ہیلتھی', en: 'Super' },
    ]
    const featured = products.filter(p => p.isFeatured)
    const filtered = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory)

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: '80px' }}>
            <AppHeader />

            <div style={{ padding: '20px 16px 0' }}>
                {/* Greeting */}
                {!loading ? (
                    <div className="fade-in" style={{ marginBottom: '20px' }}>
                        <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text)', marginBottom: '4px' }}>
                            <span className="urdu-text">{t('greeting')}, {user?.name || 'مہمان'} 👋</span>
                        </h1>
                        <p className="urdu-text" style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 2 }}>{t('subGreeting')}</p>
                    </div>
                ) : <SkeletonBlock height={52} style={{ marginBottom: '20px' }} />}

                {/* Search */}
                <div onClick={() => navigate('/app/search')} style={{ position: 'relative', marginBottom: '20px', cursor: 'pointer' }}>
                    <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <div className="input-field" style={{ paddingLeft: '44px', cursor: 'pointer', color: 'var(--text-muted)' }}>
                        <span className="urdu-text" style={{ lineHeight: 2, fontSize: '14px' }}>{t('searchPlaceholder')}</span>
                    </div>
                </div>

                {/* Category chips */}
                <div className="category-chips" style={{ marginBottom: '20px' }}>
                    {categories.map(c => (
                        <button key={c.id} className={`chip${activeCategory === c.id ? ' active' : ''}`} onClick={() => setActiveCategory(c.id)} id={`home-chip-${c.id}`}>
                            <span className="urdu-text">{isUrdu ? c.ur : c.en}</span>
                        </button>
                    ))}
                </div>

                {/* Banner Carousel */}
                {!loading ? (
                    <div className="glass-card" style={{ marginBottom: '24px', padding: '0', overflow: 'hidden', aspectRatio: '16/7', position: 'relative' }}>
                        {banners.map((banner, i) => (
                            <div key={banner.id} style={{
                                position: 'absolute', inset: 0,
                                background: `linear-gradient(135deg, #0A2E10, #4ADE80)`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
                                opacity: i === bannerIndex ? 1 : 0, transition: 'opacity 300ms ease',
                            }}>
                                <span style={{ fontSize: '48px', marginBottom: '8px' }}>{banner.emoji}</span>
                                <h2 className="urdu-text" style={{ fontSize: '20px', fontWeight: 700, color: '#080E0A', lineHeight: 2, textAlign: 'center' }}>{banner.title}</h2>
                                <p className="urdu-text" style={{ fontSize: '13px', color: 'rgba(8,14,10,0.7)', lineHeight: 2 }}>{banner.subtitle}</p>
                            </div>
                        ))}
                        <div style={{ position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px' }}>
                            {banners.map((_, i) => (
                                <button key={i} onClick={() => setBannerIndex(i)} style={{ width: i === bannerIndex ? '20px' : '6px', height: '6px', borderRadius: '3px', background: '#080E0A', opacity: i === bannerIndex ? 0.9 : 0.3, border: 'none', cursor: 'pointer', transition: 'all 0.3s ease' }} />
                            ))}
                        </div>
                    </div>
                ) : <SkeletonBlock height={180} style={{ marginBottom: '24px' }} />}

                {/* Coins widget */}
                {profile && profile.coins_balance > 0 && (
                    <div onClick={() => navigate('/app/coins')} className="glass-card" style={{ marginBottom: '24px', padding: '16px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '28px', animation: 'float 3s ease-in-out infinite' }}>🪙</span>
                        <div style={{ flex: 1 }}>
                            <p className="urdu-text" style={{ fontSize: '14px', fontWeight: 600, color: '#F59E0B', lineHeight: 2 }}>
                                آپ کے پاس {profile.coins_balance} TowerGreens Coins ہیں
                            </p>
                            <p className="urdu-text" style={{ fontSize: '12px', color: 'rgba(245,158,11,0.7)', lineHeight: 1.8 }}>
                                500 پر 500 روپے کی چھوٹ ملے گی
                            </p>
                        </div>
                        <ChevronRight size={18} color="rgba(245,158,11,0.7)" />
                    </div>
                )}

                {/* Featured Products Row */}
                <div style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h2 className="urdu-text" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text)', lineHeight: 2 }}>{t('latestProducts')}</h2>
                        <button onClick={() => navigate('/app/products')} style={{ color: 'var(--accent)', fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span className="urdu-text" style={{ lineHeight: 2 }}>سب دیکھیں</span>
                            <ChevronRight size={14} />
                        </button>
                    </div>
                    {!loading ? (
                        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', scrollSnapType: 'x mandatory', paddingBottom: '8px', scrollbarWidth: 'none' }}>
                            {featured.map(p => (
                                <div key={p.id} style={{ minWidth: '200px', scrollSnapAlign: 'start' }}>
                                    <ProductCard product={p} compact />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ display: 'flex', gap: '12px' }}>
                            {[1, 2, 3].map(i => <SkeletonBlock key={i} height={220} style={{ minWidth: '160px', flex: 1 }} />)}
                        </div>
                    )}
                </div>

                {/* Popular Dishes Grid */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h2 className="urdu-text" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text)', lineHeight: 2 }}>{t('popularDishes')}</h2>
                    </div>
                    {!loading ? (
                        <div className="grid-2" style={{ gap: '12px' }}>
                            {filtered.slice(0, 4).map(p => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    ) : (
                        <div className="grid-2" style={{ gap: '12px' }}>
                            {[1, 2, 3, 4].map(i => <SkeletonBlock key={i} height={280} />)}
                        </div>
                    )}
                </div>

                {/* Demo OTP Coins trigger — shown when user has a delivered order */}
                {user && (
                    <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '24px' }}>🪙</span>
                        <div style={{ flex: 1 }}>
                            <p className="urdu-text" style={{ fontSize: '13px', fontWeight: 600, color: '#F59E0B', lineHeight: 2 }}>آپ کا آرڈر TG-4821 ڈیلیور ہو گیا!</p>
                            <p className="urdu-text" style={{ fontSize: '11px', color: 'rgba(245,158,11,0.6)', lineHeight: 2 }}>Coins حاصل کرنے کے لیے OTP تصدیق کریں</p>
                        </div>
                        <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '12px' }} onClick={() => setShowOtpCoins(true)} id="claim-coins-btn">
                            <span className="urdu-text" style={{ lineHeight: 2 }}>حاصل کریں</span>
                        </button>
                    </div>
                )}
            </div>

            <BottomNav />
            {showOtpCoins && (
                <OtpCoinsPopup
                    order={{ id: 'TG-4821', coinsEarned: 125, otp: '12345678' }}
                    onClose={() => setShowOtpCoins(false)}
                />
            )}
        </div>
    )
}

function SkeletonBlock({ height, style }) {
    return <div className="skeleton" style={{ height, borderRadius: '12px', ...style }} />
}

const URDU = {
    greeting: 'خوش آمدید',
    subGreeting: 'آج کیا کھائیں گے؟',
    searchPlaceholder: 'سبزیاں، سلاد، صحت مند کھانا تلاش کریں...',
    latestProducts: 'تازہ ترین پروڈکٹس',
    popularDishes: 'مشہور ڈشز',
}
const ENGLISH = {
    greeting: 'Welcome',
    subGreeting: "What would you like today?",
    searchPlaceholder: 'Search veggies, salads, healthy food...',
    latestProducts: 'Latest Products',
    popularDishes: 'Popular Dishes',
}
