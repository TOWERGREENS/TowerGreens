import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { SlidersHorizontal, ChevronDown } from 'lucide-react'
import BottomNav from '../../components/app/BottomNav'
import AppHeader from '../../components/app/AppHeader'
import ProductCard from '../../components/app/ProductCard'

const CATEGORIES = [
    { id: 'all', ur: 'تمام', en: 'All' },
    { id: 'veggies', ur: 'سبزیاں', en: 'Veggies' },
    { id: 'salads', ur: 'سلاد', en: 'Salads' },
    { id: 'healthy-food', ur: 'صحت مند', en: 'Healthy' },
    { id: 'chinese-style', ur: 'چائنیز', en: 'Chinese' },
    { id: 'super-healthy', ur: 'سپر ہیلتھی', en: 'Super' },
    { id: 'processed-food', ur: 'پروسیسڈ', en: 'Processed' },
]

export default function ProductsPage() {
    const { products, language } = useApp()
    const [cat, setCat] = useState('all')
    const [sort, setSort] = useState('newest')
    const [availOnly, setAvailOnly] = useState(false)
    const [displayCount, setDisplayCount] = useState(8)
    const [loading, setLoading] = useState(false)
    const loaderRef = useRef(null)
    const isUrdu = language === 'ur' || !language

    let filtered = cat === 'all' ? products : products.filter(p => p.category === cat)
    if (availOnly) filtered = filtered.filter(p => p.isAvailable)
    if (sort === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price)

    const visible = filtered.slice(0, displayCount)
    const hasMore = displayCount < filtered.length

    // Infinite scroll
    useEffect(() => {
        const observer = new IntersectionObserver(([e]) => {
            if (e.isIntersecting && hasMore && !loading) {
                setLoading(true)
                setTimeout(() => { setDisplayCount(n => n + 8); setLoading(false) }, 600)
            }
        }, { threshold: 0.5 })
        if (loaderRef.current) observer.observe(loaderRef.current)
        return () => observer.disconnect()
    }, [hasMore, loading])

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: '80px' }}>
            <AppHeader title={isUrdu ? 'تمام پروڈکٹس' : 'All Products'} />

            {/* Filter bar */}
            <div style={{ position: 'sticky', top: '60px', zIndex: 'var(--z-sticky)', background: 'rgba(8,14,10,0.95)', backdropFilter: 'blur(16px)', padding: '12px 16px', borderBottom: '1px solid rgba(74,222,128,0.06)' }}>
                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none' }}>
                    {/* Sort */}
                    <select className="chip" style={{ fontSize: '13px', color: 'var(--text)', background: 'rgba(255,255,255,0.05)' }} value={sort} onChange={e => setSort(e.target.value)} id="products-sort">
                        <option value="newest">{isUrdu ? 'نئے' : 'Newest'}</option>
                        <option value="price-asc">{isUrdu ? 'کم قیمت' : 'Price: Low'}</option>
                        <option value="price-desc">{isUrdu ? 'زیادہ قیمت' : 'Price: High'}</option>
                    </select>
                    {/* Available only */}
                    <button className={`chip${availOnly ? ' active' : ''}`} onClick={() => setAvailOnly(!availOnly)} id="filter-avail">
                        <span className="urdu-text">{isUrdu ? 'صرف دستیاب' : 'Available'}</span>
                    </button>
                </div>
                {/* Category chips */}
                <div className="category-chips" style={{ marginTop: '8px' }}>
                    {CATEGORIES.map(c => (
                        <button key={c.id} className={`chip${cat === c.id ? ' active' : ''}`} onClick={() => { setCat(c.id); setDisplayCount(8) }} id={`cat-${c.id}`}>
                            <span className="urdu-text">{isUrdu ? c.ur : c.en}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ padding: '16px' }}>
                {visible.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '80px 0' }}>
                        <div style={{ fontSize: '64px', marginBottom: '16px' }}>🧺</div>
                        <p className="urdu-text" style={{ fontSize: '18px', color: 'var(--text-muted)', lineHeight: 2 }}>
                            {isUrdu ? 'کوئی پروڈکٹ نہیں ملا' : 'No products found'}
                        </p>
                        <button className="btn-ghost" onClick={() => { setCat('all'); setAvailOnly(false) }} style={{ marginTop: '16px' }}>
                            <span className="urdu-text">{isUrdu ? 'فلٹرز ہٹائیں' : 'Clear Filters'}</span>
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="grid-2" style={{ gap: '12px' }}>
                            {visible.map((p, i) => (
                                <div key={p.id} style={{ opacity: 1, animation: `page-fade-in 0.4s ease ${i * 40}ms both` }}>
                                    <ProductCard product={p} />
                                </div>
                            ))}
                        </div>

                        {/* Infinite scroll loader */}
                        <div ref={loaderRef} style={{ height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '24px' }}>
                            {loading && (
                                <div className="grid-2" style={{ gap: '12px', width: '100%' }}>
                                    {[1, 2, 3, 4].map(i => <div key={i} className="skeleton" style={{ height: '280px', borderRadius: '16px' }} />)}
                                </div>
                            )}
                            {!hasMore && visible.length > 0 && (
                                <p className="urdu-text" style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: 2, textAlign: 'center' }}>
                                    {isUrdu ? 'کوئی مزید پروڈکٹ نہیں' : 'No more products'}
                                </p>
                            )}
                        </div>
                    </>
                )}
            </div>

            <BottomNav />
        </div>
    )
}
