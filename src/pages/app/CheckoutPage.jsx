import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { Check } from 'lucide-react'

export default function CheckoutPage() {
    const { cartTotal, placeOrder, language, showToast, user, profile } = useApp()
    const navigate = useNavigate()
    const [step, setStep] = useState(1)
    const [form, setForm] = useState({
        name: profile?.name || user?.name || '',
        phone: profile?.phone || user?.phone || '',
        address: profile?.address || '',
        city: 'لاہور'
    })
    const [payment, setPayment] = useState('COD')
    const [jazzPhone, setJazzPhone] = useState('')
    const [loading, setLoading] = useState(false)
    const isUrdu = language === 'ur' || !language

    const steps = isUrdu
        ? ['تفصیلات', 'ادائیگی', 'تصدیق']
        : ['Details', 'Payment', 'Confirm']

    const handleOrderPlace = async () => {
        setLoading(true)
        try {
            const order = await placeOrder({
                paymentMethod: payment.toLowerCase(),
                address: `${form.address}, ${form.city} — ${form.name} (${form.phone})`,
                coinsDiscount: 0,
            })
            navigate('/app/order-placed', { state: { order } })
        } catch (err) {
            showToast(isUrdu ? 'آرڈر ناکام — دوبارہ کوشش کریں' : 'Order failed — try again', 'error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', padding: '60px 16px 32px' }}>
            <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                ← <span className="urdu-text" style={{ lineHeight: 2 }}>{isUrdu ? 'واپس' : 'Back'}</span>
            </button>

            {/* Step Indicator */}
            <div className="step-indicator" style={{ marginBottom: '40px' }}>
                {steps.map((s, i) => (
                    <>
                        <div key={i} className={`step-dot ${i + 1 < step ? 'complete' : i + 1 === step ? 'active' : 'future'}`}>
                            {i + 1 < step ? <Check size={14} /> : i + 1}
                        </div>
                        {i < steps.length - 1 && <div className={`step-line${i + 1 < step ? ' complete' : ''}`} />}
                    </>
                ))}
            </div>

            {/* Step labels */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px', marginTop: '-32px', padding: '0 8px' }}>
                {steps.map((s, i) => (
                    <span key={i} className="urdu-text" style={{ fontSize: '12px', color: i + 1 === step ? 'var(--accent)' : 'var(--text-muted)', fontWeight: i + 1 === step ? 700 : 400, lineHeight: 2, textAlign: 'center', flex: 1 }}>{s}</span>
                ))}
            </div>

            <div className="glass-card" style={{ padding: '24px', maxWidth: '480px', margin: '0 auto' }}>
                {step === 1 && (
                    <div>
                        <h2 className="urdu-text" style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', lineHeight: 2 }}>
                            {isUrdu ? 'ڈیلیوری کی تفصیلات' : 'Delivery Details'}
                        </h2>
                        {[
                            { key: 'name', label: isUrdu ? 'نام' : 'Name', type: 'text', placeholder: isUrdu ? 'آپ کا نام' : 'Your Name' },
                            { key: 'phone', label: isUrdu ? 'فون' : 'Phone', type: 'tel', placeholder: '03001234567' },
                            { key: 'address', label: isUrdu ? 'پتہ' : 'Address', type: 'textarea', placeholder: isUrdu ? 'آپ کا مکمل پتہ' : 'Full address' },
                        ].map(f => (
                            <div key={f.key} style={{ marginBottom: '16px' }}>
                                <label className="urdu-text" style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px', lineHeight: 2 }}>{f.label}</label>
                                {f.type === 'textarea' ? (
                                    <textarea className="input-field" value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} rows={3} style={{ resize: 'vertical' }} id={`checkout-${f.key}`} />
                                ) : (
                                    <input type={f.type} className="input-field" value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} id={`checkout-${f.key}`} />
                                )}
                            </div>
                        ))}
                        <div style={{ marginBottom: '20px' }}>
                            <label className="urdu-text" style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px', lineHeight: 2 }}>شہر</label>
                            <input type="text" className="input-field" value={form.city} disabled style={{ opacity: 0.6 }} />
                        </div>
                        <button className="btn-primary w-full" style={{ justifyContent: 'center', padding: '14px' }} onClick={() => { if (!form.name || !form.phone || !form.address) { showToast(isUrdu ? 'تمام خانے پر کریں' : 'Fill all fields', 'error'); return } setStep(2) }} id="checkout-next-1">
                            <span className="urdu-text">{isUrdu ? 'اگلا ←' : 'Next →'}</span>
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <h2 className="urdu-text" style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', lineHeight: 2 }}>
                            {isUrdu ? 'ادائیگی کا طریقہ' : 'Payment Method'}
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                            {[
                                { id: 'JazzCash', label: 'JazzCash', icon: '📱', desc: isUrdu ? 'موبائل والیٹ سے ادائیگی' : 'Mobile wallet payment' },
                                { id: 'COD', label: isUrdu ? 'کیش آن ڈیلیوری' : 'Cash on Delivery', icon: '💵', desc: isUrdu ? 'ڈیلیوری پر ادائیگی' : 'Pay when delivered' },
                            ].map(opt => (
                                <div key={opt.id} onClick={() => setPayment(opt.id)} style={{ padding: '16px', borderRadius: '12px', border: `2px solid ${payment === opt.id ? '#4ADE80' : 'rgba(74,222,128,0.12)'}`, background: payment === opt.id ? 'rgba(74,222,128,0.08)' : 'transparent', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: payment === opt.id ? '0 0 16px rgba(74,222,128,0.15)' : 'none' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: `2px solid ${payment === opt.id ? '#4ADE80' : 'rgba(255,255,255,0.3)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {payment === opt.id && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#4ADE80' }} />}
                                        </div>
                                        <span style={{ fontSize: '20px' }}>{opt.icon}</span>
                                        <div>
                                            <p className="urdu-text" style={{ fontWeight: 700, color: 'var(--text)', lineHeight: 1.8 }}>{opt.label}</p>
                                            <p className="urdu-text" style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.8 }}>{opt.desc}</p>
                                        </div>
                                    </div>
                                    {opt.id === 'JazzCash' && payment === 'JazzCash' && (
                                        <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(74,222,128,0.15)' }}>
                                            <input type="tel" className="input-field" placeholder="03XXXXXXXXX" value={jazzPhone} onChange={e => setJazzPhone(e.target.value)} style={{ fontSize: '14px' }} id="jazzcash-phone" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button className="btn-ghost" onClick={() => setStep(1)} style={{ padding: '14px 20px' }}>
                                <span className="urdu-text">← {isUrdu ? 'واپس' : 'Back'}</span>
                            </button>
                            <button className="btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '14px' }} onClick={() => setStep(3)} id="checkout-next-2">
                                <span className="urdu-text">{isUrdu ? 'اگلا ←' : 'Next →'}</span>
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <h2 className="urdu-text" style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', lineHeight: 2 }}>
                            {isUrdu ? 'تصدیق کریں' : 'Confirm Order'}
                        </h2>
                        <div style={{ marginBottom: '20px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                            <p className="urdu-text" style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px', lineHeight: 2 }}>{isUrdu ? 'ڈیلیوری کا پتہ' : 'Delivery Address'}</p>
                            <p className="urdu-text" style={{ fontWeight: 600, fontSize: '14px', lineHeight: 2 }}>{form.name} — {form.phone}</p>
                            <p className="urdu-text" style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: 2 }}>{form.address}, {form.city}</p>
                        </div>
                        <div style={{ marginBottom: '20px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                            <p className="urdu-text" style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px', lineHeight: 2 }}>{isUrdu ? 'ادائیگی' : 'Payment'}</p>
                            <p className="urdu-text" style={{ fontWeight: 600, fontSize: '14px', lineHeight: 2 }}>{payment === 'JazzCash' ? `JazzCash — ${jazzPhone}` : (isUrdu ? 'کیش آن ڈیلیوری' : 'Cash on Delivery')}</p>
                        </div>
                        <div style={{ marginBottom: '24px', padding: '16px', background: 'rgba(74,222,128,0.05)', borderRadius: '12px', border: '1px solid rgba(74,222,128,0.15)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span className="urdu-text" style={{ fontWeight: 700, fontSize: '16px', lineHeight: 2 }}>{isUrdu ? 'کل رقم' : 'Total'}</span>
                                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '20px', color: 'var(--accent)' }}>Rs {cartTotal}</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button className="btn-ghost" onClick={() => setStep(2)} style={{ padding: '14px 20px' }}>
                                <span className="urdu-text">←</span>
                            </button>
                            <button className="btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '16px', fontSize: '16px' }} onClick={handleOrderPlace} disabled={loading} id="place-order-btn">
                                {loading ? <div className="spinner" /> : <span className="urdu-text">{isUrdu ? 'آرڈر دیں 🚀' : 'Place Order 🚀'}</span>}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
