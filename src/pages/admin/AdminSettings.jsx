import { AdminLayout } from '../../components/admin/AdminLayout'

export default function AdminSettings() {
    return (
        <AdminLayout title="Settings">
            <div style={{ maxWidth: '600px' }}>
                {[
                    { section: 'Delivery Settings', fields: [{ label: 'Minimum Order (COD)', val: 'Rs 200' }, { label: 'Delivery Charge', val: 'Rs 0 (Free)' }, { label: 'Delivery Areas', val: 'Lahore' }] },
                    { section: 'Payment', fields: [{ label: 'JazzCash Merchant ID', val: 'MC123456' }, { label: 'COD Enabled', val: 'Yes' }] },
                    { section: 'Coins System', fields: [{ label: 'Base Earn Rate', val: '1% per order' }, { label: 'JazzCash OTP Bonus', val: '25%' }, { label: 'Redemption Threshold', val: '500 coins → Rs 500' }] },
                ].map((s, i) => (
                    <div key={i} className="admin-card" style={{ marginBottom: '16px' }}>
                        <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>{s.section}</h3>
                        {s.fields.map((f, j) => (
                            <div key={j} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: j < s.fields.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{f.label}</span>
                                <span style={{ fontSize: '13px', fontWeight: 600, color: '#4ADE80', fontFamily: 'var(--font-mono)' }}>{f.val}</span>
                            </div>
                        ))}
                    </div>
                ))}
                <button className="btn-primary">Save Settings</button>
            </div>
        </AdminLayout>
    )
}
