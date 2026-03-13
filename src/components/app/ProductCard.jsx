import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { Plus, Minus } from 'lucide-react'

export default function ProductCard({ product, compact = false }) {
    const navigate = useNavigate()
    const { cart, addToCart, updateCartQuantity, language } = useApp()
    const cartItem = cart.find(i => i.id === product.id)
    const [adding, setAdding] = useState(false)

    const handleAdd = (e) => {
        e.stopPropagation()
        setAdding(true)
        addToCart(product)
        setTimeout(() => setAdding(false), 300)
    }

    const handleUpdate = (e, qty) => {
        e.stopPropagation()
        updateCartQuantity(product.id, qty)
    }

    return (
        <div
            className="product-card"
            onClick={() => navigate(`/app/product/${product.id}`)}
            id={`product-card-${product.id}`}
            role="button"
            tabIndex={0}
        >
            <div className="overflow-hidden" style={{ position: 'relative' }}>
                <img
                    src={product.images[0]}
                    alt={product.nameUrdu}
                    className="product-card__image"
                    loading="lazy"
                />
                {!product.isAvailable && (
                    <div style={{
                        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <span className="urdu-text" style={{ color: '#ef4444', fontWeight: 700 }}>دستیاب نہیں</span>
                    </div>
                )}
                {product.isFeatured && (
                    <div style={{
                        position: 'absolute', top: '8px', left: '8px',
                        background: 'rgba(74,222,128,0.9)', color: '#080E0A',
                        padding: '2px 8px', borderRadius: '9999px', fontSize: '10px', fontWeight: 700
                    }}>
                        ⭐ Featured
                    </div>
                )}
            </div>

            <div style={{ padding: compact ? '10px' : '14px' }}>
                <div className="divider" style={{ marginBottom: '10px' }} />
                <p className="urdu-text" style={{
                    fontSize: compact ? '14px' : '16px',
                    fontWeight: 600, color: 'var(--text)',
                    marginBottom: '8px'
                }}>
                    {language === 'en' ? product.nameEn : product.nameUrdu}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span className="pill pill-amber" style={{ fontSize: '11px' }}>
                        {getCategoryLabel(product.category)}
                    </span>
                    <span style={{
                        fontFamily: 'var(--font-mono)', color: 'var(--accent)',
                        fontSize: compact ? '14px' : '16px', fontWeight: 700
                    }}>
                        Rs {product.price}
                    </span>
                </div>

                {product.isAvailable && (
                    !cartItem ? (
                        <button
                            className="btn-primary"
                            style={{
                                width: '100%',
                                fontSize: '13px',
                                padding: '10px',
                                justifyContent: 'center',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                            }}
                            onClick={handleAdd}
                            id={`add-to-cart-${product.id}`}
                        >
                            <Plus size={14} />
                            <span className="urdu-text" style={{ fontSize: '12px' }}>کارٹ میں شامل</span>
                        </button>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                            <button
                                className="btn-ghost"
                                style={{ padding: '8px 12px', minWidth: '36px', fontSize: '14px' }}
                                onClick={(e) => handleUpdate(e, cartItem.quantity - 1)}
                            >
                                <Minus size={14} />
                            </button>
                            <span className="mono-md" style={{ minWidth: '24px', textAlign: 'center' }}>
                                {cartItem.quantity}
                            </span>
                            <button
                                className="btn-primary"
                                style={{ padding: '8px 12px', minWidth: '36px', fontSize: '14px' }}
                                onClick={(e) => handleUpdate(e, cartItem.quantity + 1)}
                            >
                                <Plus size={14} />
                            </button>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

function getCategoryLabel(cat) {
    const map = {
        veggies: 'سبزیاں',
        salads: 'سلاد',
        'healthy-food': 'صحت مند کھانا',
        'chinese-style': 'چائنیز اسٹائل',
        'super-healthy': 'سپر ہیلتھی',
        'processed-food': 'پروسیسڈ فوڈ',
    }
    return map[cat] || cat
}
