import { AdminLayout } from '../../components/admin/AdminLayout'

export default function AdminCategories() {
    const CATS = [
        { id: '1', nameUrdu: 'سبزیاں', nameEn: 'Veggies', slug: 'veggies', sort: 1 },
        { id: '2', nameUrdu: 'سلاد', nameEn: 'Salads', slug: 'salads', sort: 2 },
        { id: '3', nameUrdu: 'صحت مند کھانا', nameEn: 'Healthy Food', slug: 'healthy-food', sort: 3 },
        { id: '4', nameUrdu: 'چائنیز اسٹائل', nameEn: 'Chinese Style', slug: 'chinese-style', sort: 4 },
        { id: '5', nameUrdu: 'سپر ہیلتھی', nameEn: 'Super Healthy', slug: 'super-healthy', sort: 5 },
        { id: '6', nameUrdu: 'پروسیسڈ فوڈ', nameEn: 'Processed Food', slug: 'processed-food', sort: 6 },
    ]
    return (
        <AdminLayout title="Categories">
            <div className="admin-card">
                <table className="admin-table">
                    <thead><tr><th>Urdu Name</th><th>English</th><th>Slug</th><th>Sort Order</th><th>Actions</th></tr></thead>
                    <tbody>
                        {CATS.map(c => (
                            <tr key={c.id}>
                                <td><span className="urdu-text" style={{ lineHeight: 2 }}>{c.nameUrdu}</span></td>
                                <td>{c.nameEn}</td>
                                <td><span style={{ fontFamily: 'var(--font-mono)', color: '#4ADE80', fontSize: '12px' }}>{c.slug}</span></td>
                                <td>{c.sort}</td>
                                <td>
                                    <div style={{ display: 'flex', gap: '6px' }}>
                                        <button style={{ background: 'rgba(59,130,246,0.15)', color: '#60A5FA', border: 'none', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', fontSize: '12px' }}>Edit</button>
                                        <button style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444', border: 'none', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', fontSize: '12px' }}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    )
}
