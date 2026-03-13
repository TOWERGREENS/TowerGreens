import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { ArrowLeft, Share2, ChevronDown, ChevronUp, Play, Pause, Volume2, Maximize } from 'lucide-react'
import BottomNav from '../../components/app/BottomNav'
import ProductCard from '../../components/app/ProductCard'

export default function ProductDetailPage() {
    const { id } = useParams()
    const { products, addToCart, cart, updateCartQuantity, language } = useApp()
    const navigate = useNavigate()
    const product = products.find(p => p.id === id) || products[0]
    const cartItem = cart.find(i => i.id === product?.id)
    const [activeImg, setActiveImg] = useState(0)
    const [accordions, setAccordions] = useState({})
    const [showStickyCTA, setShowStickyCTA] = useState(false)
    const priceRef = useRef(null)
    const isUrdu = language === 'ur' || !language

    useEffect(() => {
        const observer = new IntersectionObserver(([e]) => setShowStickyCTA(!e.isIntersecting), { threshold: 0.5 })
        if (priceRef.current) observer.observe(priceRef.current)
        return () => observer.disconnect()
    }, [])

    const images = product?.images?.length >= 4
        ? product.images
        : [...(product?.images || []), ...Array(4 - (product?.images?.length || 0)).fill(product?.images?.[0] || 'https://images.unsplash.com/photo-1518977676405-d4b8e4c2c1b9?w=800')]

    const related = products.filter(p => p.id !== product?.id && p.category === product?.category).slice(0, 4)

    const toggleAccordion = (key) => setAccordions(prev => ({ ...prev, [key]: !prev[key] }))

    if (!product) return <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>Product not found</div>

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: '100px' }}>
            {/* Top overlay */}
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '16px', display: 'flex', justifyContent: 'space-between', pointerEvents: 'none' }}>
                <button onClick={() => navigate(-1)} style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(8,14,10,0.7)', backdropFilter: 'blur(8px)', border: '1px solid rgba(74,222,128,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', pointerEvents: 'auto', color: 'var(--text)' }}>
                    <ArrowLeft size={18} />
                </button>
                <button style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(8,14,10,0.7)', backdropFilter: 'blur(8px)', border: '1px solid rgba(74,222,128,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', pointerEvents: 'auto', color: 'var(--text)' }}>
                    <Share2 size={18} />
                </button>
            </div>

            {/* Image Gallery */}
            <div style={{ position: 'relative', background: '#0F1A12' }}>
                <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
                    <img src={images[activeImg]} alt={product.nameUrdu} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s ease' }} />
                </div>
                {/* Thumbnails */}
                <div style={{ display: 'flex', gap: '8px', padding: '12px 16px', overflowX: 'auto', scrollbarWidth: 'none' }}>
                    {images.map((img, i) => (
                        <img key={i} src={img} alt="" onClick={() => setActiveImg(i)} style={{ width: '64px', height: '48px', objectFit: 'cover', borderRadius: '8px', cursor: 'pointer', border: i === activeImg ? '2px solid #4ADE80' : '2px solid transparent', opacity: i === activeImg ? 1 : 0.6, transition: 'all 0.2s ease', flexShrink: 0 }} />
                    ))}
                </div>
            </div>

            {/* Content Card */}
            <div style={{ background: 'var(--bg)', borderRadius: '24px 24px 0 0', marginTop: '-16px', position: 'relative', padding: '24px 16px' }}>
                {/* Category + meta */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                    <span className="pill pill-amber">{getCatLabel(product.category)}</span>
                    {product.calories && (
                        <span className="pill pill-green">🔥 {product.calories} kcal</span>
                    )}
                </div>

                <h1 className="urdu-text" style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text)', marginBottom: '8px', lineHeight: 2 }}>
                    {isUrdu ? product.nameUrdu : product.nameEn}
                </h1>

                <div ref={priceRef} style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '28px', fontWeight: 700, color: 'var(--accent)' }}>Rs {product.price}</span>
                    {!cartItem ? (
                        <button className="btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => addToCart(product)} id="product-detail-add-btn">
                            <span className="urdu-text">{isUrdu ? 'کارٹ میں شامل کریں' : 'Add to Cart'}</span>
                        </button>
                    ) : (
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                            <button className="btn-ghost" style={{ padding: '10px 20px' }} onClick={() => updateCartQuantity(product.id, cartItem.quantity - 1)}>-</button>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', fontWeight: 700 }}>{cartItem.quantity}</span>
                            <button className="btn-primary" style={{ padding: '10px 20px' }} onClick={() => updateCartQuantity(product.id, cartItem.quantity + 1)}>+</button>
                        </div>
                    )}
                </div>

                {/* Accordions */}
                {[
                    { key: 'ingredients', label: isUrdu ? 'اجزاء' : 'Ingredients', content: product.ingredients },
                    { key: 'nutrition', label: isUrdu ? 'کیلوریز کی تفصیل' : 'Nutrition', content: `${product.calories} کیلوریز` },
                    { key: 'delivery', label: isUrdu ? 'ڈیلیوری کی معلومات' : 'Delivery Info', content: isUrdu ? 'لاہور میں ڈیلیوری — 30-60 منٹ' : 'Lahore delivery — 30-60 minutes' },
                ].map(({ key, label, content }) => (
                    <div key={key} className="glass-card" style={{ marginBottom: '8px', border: '1px solid var(--border)' }}>
                        <div className="accordion-header" onClick={() => toggleAccordion(key)}>
                            <span className="urdu-text" style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)', lineHeight: 2 }}>{label}</span>
                            {accordions[key] ? <ChevronUp size={16} className="accordion-icon open" /> : <ChevronDown size={16} className="accordion-icon" />}
                        </div>
                        {accordions[key] && (
                            <div style={{ padding: '0 16px 16px' }}>
                                <p className="urdu-text urdu-body" style={{ color: 'var(--text-muted)', lineHeight: 2 }}>{content}</p>
                            </div>
                        )}
                    </div>
                ))}

                {/* Description */}
                <div style={{ marginTop: '16px', marginBottom: '32px' }}>
                    <h3 className="urdu-text" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)', marginBottom: '8px', lineHeight: 2 }}>
                        {isUrdu ? 'تفصیل' : 'Description'}
                    </h3>
                    <p className="urdu-text urdu-body" style={{ color: 'var(--text-muted)', lineHeight: 2.4 }}>
                        {isUrdu ? product.descriptionUrdu : product.nameEn}
                    </p>
                </div>

                {/* Related products */}
                {related.length > 0 && (
                    <div>
                        <h3 className="urdu-text" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)', marginBottom: '16px', lineHeight: 2 }}>
                            {isUrdu ? 'متعلقہ پروڈکٹس' : 'Related Products'}
                        </h3>
                        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '8px' }}>
                            {related.map(p => (
                                <div key={p.id} style={{ minWidth: '180px', flexShrink: 0 }}>
                                    <ProductCard product={p} compact />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Sticky CTA (mobile) */}
            {showStickyCTA && (
                <div style={{
                    position: 'fixed', bottom: '72px', left: 0, right: 0,
                    padding: '12px 16px', background: 'rgba(8,14,10,0.95)',
                    backdropFilter: 'blur(16px)', borderTop: '1px solid rgba(74,222,128,0.1)',
                    display: 'flex', gap: '12px', alignItems: 'center',
                    animation: 'page-fade-in 0.3s ease',
                }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', fontWeight: 700, color: 'var(--accent)' }}>Rs {product.price}</span>
                    <button className="btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => addToCart(product)} id="sticky-add-btn">
                        <span className="urdu-text">{isUrdu ? 'کارٹ میں شامل کریں' : 'Add to Cart'}</span>
                    </button>
                </div>
            )}

            <BottomNav />
        </div>
    )
}

function getCatLabel(cat) {
    const m = { veggies: 'سبزیاں', salads: 'سلاد', 'healthy-food': 'صحت مند', 'chinese-style': 'چائنیز', 'super-healthy': 'سپر ہیلتھی', 'processed-food': 'پروسیسڈ' }
    return m[cat] || cat
}
