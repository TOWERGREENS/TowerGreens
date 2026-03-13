import { useState } from 'react'
import { AdminLayout } from '../../components/admin/AdminLayout'
import { Plus, Edit, Trash2, Search } from 'lucide-react'

const INITIAL_PRODUCTS = [
    { id: '1', nameUrdu: 'تازہ لیٹس', nameEn: 'Fresh Lettuce', price: 120, category: 'veggies', isAvailable: true, isFeatured: true, calories: 15 },
    { id: '2', nameUrdu: 'سبز پالک', nameEn: 'Fresh Spinach', price: 150, category: 'veggies', isAvailable: true, isFeatured: true, calories: 23 },
    { id: '3', nameUrdu: 'مکس سلاد باول', nameEn: 'Mix Salad Bowl', price: 350, category: 'salads', isAvailable: true, isFeatured: true, calories: 180 },
    { id: '4', nameUrdu: 'گرین سموتھی', nameEn: 'Green Smoothie', price: 280, category: 'super-healthy', isAvailable: true, isFeatured: false, calories: 220 },
]

const EMPTY_FORM = { nameUrdu: '', nameEn: '', price: '', category: 'veggies', isAvailable: true, isFeatured: false, calories: '' }

export default function AdminProducts() {
    const [products, setProducts] = useState(INITIAL_PRODUCTS)
    const [showForm, setShowForm] = useState(false)
    const [editing, setEditing] = useState(null)
    const [form, setForm] = useState(EMPTY_FORM)
    const [query, setQuery] = useState('')

    const filtered = products.filter(p => p.nameUrdu.includes(query) || p.nameEn.toLowerCase().includes(query.toLowerCase()))

    const handleEdit = (p) => { setEditing(p.id); setForm({ ...p }); setShowForm(true) }
    const handleDelete = (id) => { if (confirm('Delete this product?')) setProducts(prev => prev.filter(p => p.id !== id)) }
    const handleToggleAvail = (id) => setProducts(prev => prev.map(p => p.id === id ? { ...p, isAvailable: !p.isAvailable } : p))

    const handleSave = () => {
        if (editing) setProducts(prev => prev.map(p => p.id === editing ? { ...p, ...form } : p))
        else setProducts(prev => [...prev, { ...form, id: Date.now().toString() }])
        setShowForm(false); setEditing(null); setForm(EMPTY_FORM)
    }

    return (
        <AdminLayout title="Products Management">
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
                    <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products..." id="admin-products-search" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '10px 10px 10px 36px', color: '#fff', outline: 'none', fontSize: '14px' }} />
                </div>
                <button className="btn-primary" onClick={() => { setShowForm(true); setEditing(null); setForm(EMPTY_FORM) }} id="add-product-btn" style={{ padding: '10px 20px', fontSize: '14px' }}>
                    <Plus size={16} /> Add Product
                </button>
            </div>

            <div className="admin-card">
                <table className="admin-table">
                    <thead><tr><th>Urdu Name</th><th>English</th><th>Price</th><th>Category</th><th>Calories</th><th>Featured</th><th>Available</th><th>Actions</th></tr></thead>
                    <tbody>
                        {filtered.map(p => (
                            <tr key={p.id}>
                                <td><span className="urdu-text" style={{ lineHeight: 2 }}>{p.nameUrdu}</span></td>
                                <td>{p.nameEn}</td>
                                <td style={{ fontFamily: 'var(--font-mono)', color: '#4ADE80' }}>Rs {p.price}</td>
                                <td>
                                    <span style={{ fontSize: '12px', background: 'rgba(74,222,128,0.1)', color: '#4ADE80', borderRadius: '6px', padding: '2px 8px' }}>{p.category}</span>
                                </td>
                                <td>{p.calories} kcal</td>
                                <td>
                                    <button onClick={() => setProducts(prev => prev.map(q => q.id === p.id ? { ...q, isFeatured: !q.isFeatured } : q))} style={{ background: p.isFeatured ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.06)', border: 'none', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', color: p.isFeatured ? '#F59E0B' : 'rgba(255,255,255,0.4)', fontSize: '12px' }}>
                                        {p.isFeatured ? '★ Yes' : 'No'}
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handleToggleAvail(p.id)} style={{ background: p.isAvailable ? 'rgba(74,222,128,0.15)' : 'rgba(239,68,68,0.15)', border: 'none', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', color: p.isAvailable ? '#4ADE80' : '#ef4444', fontSize: '12px' }}>
                                        {p.isAvailable ? '● On' : '○ Off'}
                                    </button>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: '6px' }}>
                                        <button onClick={() => handleEdit(p)} style={{ background: 'rgba(59,130,246,0.15)', color: '#60A5FA', border: 'none', borderRadius: '6px', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Edit size={14} /></button>
                                        <button onClick={() => handleDelete(p.id)} style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444', border: 'none', borderRadius: '6px', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Trash2 size={14} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Product Form Modal */}
            {showForm && (
                <div className="overlay" onClick={() => setShowForm(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()} style={{ background: '#141820', color: '#fff', maxWidth: '520px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <h3 style={{ fontWeight: 700 }}>{editing ? 'Edit Product' : 'Add New Product'}</h3>
                            <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '20px' }}>✕</button>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                            {[
                                ['nameUrdu', 'اردو نام', 'text'],
                                ['nameEn', 'English Name', 'text'],
                                ['price', 'Price (Rs)', 'number'],
                                ['calories', 'Calories', 'number'],
                            ].map(([key, label, type]) => (
                                <div key={key}>
                                    <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '5px' }}>{label}</label>
                                    <input type={type} value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} className="input-field" id={`admin-product-${key}`} />
                                </div>
                            ))}
                        </div>
                        <div style={{ marginBottom: '12px' }}>
                            <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '5px' }}>Category</label>
                            <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="input-field" id="admin-product-category">
                                {['veggies', 'salads', 'healthy-food', 'chinese-style', 'super-healthy', 'processed-food'].map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
                            {[['isAvailable', 'Available'], ['isFeatured', 'Featured']].map(([key, label]) => (
                                <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}>
                                    <input type="checkbox" checked={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.checked }))} id={`admin-product-${key}`} />
                                    {label}
                                </label>
                            ))}
                        </div>
                        <button className="btn-primary w-full" style={{ justifyContent: 'center' }} onClick={handleSave} id="admin-product-save-btn">
                            {editing ? 'Save Changes' : 'Add Product'}
                        </button>
                    </div>
                </div>
            )}
        </AdminLayout>
    )
}
