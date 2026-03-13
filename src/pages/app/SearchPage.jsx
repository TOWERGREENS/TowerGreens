import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { Search as SearchIcon, X } from 'lucide-react'
import BottomNav from '../../components/app/BottomNav'
import ProductCard from '../../components/app/ProductCard'

export default function SearchPage() {
    const { products, language } = useApp()
    const [query, setQuery] = useState('')
    const navigate = useNavigate()
    const isUrdu = language === 'ur' || !language

    const results = query.length >= 2
        ? products.filter(p => p.nameUrdu.includes(query) || p.nameEn.toLowerCase().includes(query.toLowerCase()) || p.category.includes(query))
        : []

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: '80px' }}>
            <div style={{ padding: '60px 16px 16px', position: 'sticky', top: 0, background: 'var(--bg)', zIndex: 10 }}>
                <div style={{ position: 'relative' }}>
                    <SearchIcon size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        autoFocus
                        type="search"
                        className="input-field"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder={isUrdu ? 'سبزیاں، سلاد... تلاش کریں' : 'Search products...'}
                        style={{ paddingLeft: '44px', paddingRight: '44px' }}
                        id="search-input"
                    />
                    {query && (
                        <button onClick={() => setQuery('')} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                            <X size={16} />
                        </button>
                    )}
                </div>
            </div>
            <div style={{ padding: '0 16px' }}>
                {results.length > 0 ? (
                    <div className="grid-2" style={{ gap: '12px' }}>
                        {results.map(p => <ProductCard key={p.id} product={p} />)}
                    </div>
                ) : query.length >= 2 ? (
                    <div style={{ textAlign: 'center', padding: '60px 0' }}>
                        <p className="urdu-text" style={{ color: 'var(--text-muted)', lineHeight: 2 }}>
                            {isUrdu ? 'کوئی نتیجہ نہیں ملا' : 'No results found'}
                        </p>
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '60px 0' }}>
                        <SearchIcon size={48} color="rgba(240,247,241,0.2)" />
                        <p className="urdu-text" style={{ color: 'var(--text-muted)', marginTop: '16px', lineHeight: 2 }}>
                            {isUrdu ? 'تلاش شروع کریں...' : 'Start searching...'}
                        </p>
                    </div>
                )}
            </div>
            <BottomNav />
        </div>
    )
}
