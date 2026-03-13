import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { ArrowLeft } from 'lucide-react'
import BottomNav from '../../components/app/BottomNav'

const TERMS_UR = [
    {
        title: 'خدمت کی تفصیل',
        body: 'TowerGreens لاہور میں ہائیڈروپونک طریقے سے اُگائی گئی تازہ سبزیاں اور صحت مند کھانا آپ کے دروازے تک پہنچاتا ہے۔ ہماری تمام مصنوعات مٹی اور کیمیکل کے بغیر اُگائی جاتی ہیں۔'
    },
    {
        title: 'آرڈر اور منسوخی کی پالیسی',
        body: 'آرڈر دینے کے بعد 5 منٹ کے اندر منسوخ کیا جا سکتا ہے۔ اگر آرڈر "تیاری جاری ہے" کے مرحلے میں چلا جائے تو منسوخی ممکن نہیں۔ خراب یا غلط پروڈکٹ ملنے پر 24 گھنٹے کے اندر support@towergreens.site سے رابطہ کریں۔'
    },
    {
        title: 'ادائیگی کی شرائط',
        body: 'ہم JazzCash (آن لائن) اور Cash on Delivery (COD) قبول کرتے ہیں۔ JazzCash ادائیگی فوری طور پر مکمل ہوتی ہے۔ COD کی صورت میں ڈیلیوری کے وقت نقد ادائیگی کریں۔ کم از کم آرڈر: Rs 200۔'
    },
    {
        title: 'TowerGreens Coins کی شرائط',
        body: 'ہر آرڈر پر آرڈر کی قیمت کا 1-5% Coins ملتا ہے (Admin کی طرف سے مقرر کردہ)۔ JazzCash سے ادائیگی اور 24 گھنٹے کے اندر OTP تصدیق پر 25% اضافی Coins۔ 500 Coins پر Rs 500 کی چھوٹ لی جا سکتی ہے، صرف JazzCash ادائیگی کے ساتھ۔ 5000 Coins پر Rs 5000 کی چھوٹ۔ اگر آرڈر کی قیمت چھوٹ سے کم ہو تو آرڈر مفت ہو گا لیکن Coins واپس نہیں ملیں گے۔ Coins منتقل یا فروخت نہیں کیے جا سکتے۔'
    },
    {
        title: 'OTP عمل',
        body: 'ڈیلیوری مکمل ہونے پر Rider کی طرف سے OTP جنریٹ ہوتا ہے۔ یہ OTP آپ کی ای میل پر بھیجا جائے گا۔ OTP 24 گھنٹے تک درست ہے۔ آن لائن ادائیگی والے آرڈروں میں OTP تصدیق سے Coins ملتے ہیں۔'
    },
    {
        title: 'ڈیلیوری کی ذمہ داری',
        body: 'TowerGreens لاہور کے اندر ڈیلیوری کرتا ہے۔ تخمینہ ڈیلیوری وقت: 30-60 منٹ۔ ٹریفک یا موسمی حالات کی وجہ سے تاخیر کی صورت میں TowerGreens ذمہ دار نہیں۔ غلط پتہ فراہم کرنے پر ڈیلیوری ناکام ہو سکتی ہے۔'
    },
    {
        title: 'صارف کی ذمہ داریاں',
        body: 'آپ کا اکاؤنٹ صرف آپ کے استعمال کے لیے ہے۔ غلط معلومات فراہم کرنا، دھوکہ دہی، یا سسٹم کا غلط استعمال اکاؤنٹ کی فوری بندش کا سبب بن سکتا ہے۔'
    },
    {
        title: 'ممنوع استعمال',
        body: 'ہماری سروس کا استعمال کسی غیرقانونی مقصد کے لیے، ہمارے سسٹم کو نقصان پہنچانے کے لیے، یا ہمارے دیگر صارفین کو تنگ کرنے کے لیے کرنا سختی سے منع ہے۔'
    },
    {
        title: 'قانونی دائرہ کار',
        body: 'یہ شرائط پاکستان کے قوانین کے تحت چلتی ہی۔ کسی بھی تنازعے کی صورت میں لاہور کی عدالتیں مستند ہوں گی۔'
    }
]

const TERMS_EN = [
    {
        title: 'Service Description',
        body: 'TowerGreens delivers fresh hydroponically grown vegetables and healthy food to your doorstep in Lahore. All products are grown without soil and chemicals in our hydroponic towers.'
    },
    {
        title: 'Order & Cancellation Policy',
        body: 'Orders can be cancelled within 5 minutes of placement. Once the order moves to "Preparing" status, cancellation is not possible. For incorrect or damaged products, contact support@towergreens.site within 24 hours.'
    },
    {
        title: 'Payment Terms',
        body: 'We accept JazzCash (online) and Cash on Delivery (COD). JazzCash payments are processed immediately. COD payment is made at time of delivery. Minimum order: Rs 200.'
    },
    {
        title: 'TowerGreens Coins Terms',
        body: '1-5% of order value earned as Coins per order (admin-configured rate). 25% bonus coins for JazzCash orders verified via OTP within 24 hours. 500 Coins = Rs 500 discount, JazzCash only. 5000 Coins = Rs 5000 discount. If order total is less than the discount amount, the order is free — no Coins refunded. Coins are non-transferable and cannot be sold.'
    },
    {
        title: 'OTP Process',
        body: 'An OTP is generated upon delivery completion. This OTP is sent to your registered email. OTP is valid for 24 hours. For online-paid orders, verifying the OTP in the app within 24 hours earns you Coins.'
    },
    {
        title: 'Delivery Liability',
        body: 'TowerGreens delivers within Lahore. Estimated delivery: 30-60 minutes. TowerGreens is not responsible for delays due to traffic or weather. Incorrect address may result in failed delivery.'
    },
    {
        title: 'User Responsibilities',
        body: 'Your account is for your use only. Providing false information, fraud, or misuse of the system may result in immediate account suspension.'
    },
    {
        title: 'Prohibited Uses',
        body: 'Using our service for illegal purposes, to damage our systems, or to harass other users is strictly prohibited.'
    },
    {
        title: 'Governing Law',
        body: 'These terms are governed by the laws of Pakistan. Any disputes shall be subject to the jurisdiction of courts in Lahore.'
    }
]

export default function AppTermsPage() {
    const { language } = useApp()
    const navigate = useNavigate()
    const isUrdu = language === 'ur' || !language
    const terms = isUrdu ? TERMS_UR : TERMS_EN

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: '100px' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', position: 'sticky', top: 0, background: 'rgba(8,14,10,0.95)', backdropFilter: 'blur(16px)', zIndex: 50, borderBottom: '1px solid rgba(74,222,128,0.08)' }}>
                <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer' }}><ArrowLeft size={20} /></button>
                <h1 className="urdu-text" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text)', lineHeight: 2 }}>
                    {isUrdu ? 'شرائط و ضوابط' : 'Terms & Conditions'}
                </h1>
            </div>

            <div style={{ padding: '20px 16px' }}>
                <div className="glass-card" style={{ padding: '16px 20px', marginBottom: '16px', background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.2)' }}>
                    <p className="urdu-text" style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 2 }}>
                        {isUrdu
                            ? 'آخری اپ ڈیٹ: مارچ 2026 — TowerGreens کی خدمات استعمال کرنے سے آپ ان شرائط سے متفق ہیں۔'
                            : 'Last updated: March 2026 — By using TowerGreens services, you agree to these terms.'}
                    </p>
                </div>

                {terms.map((section, i) => (
                    <div key={i} className="glass-card" style={{ padding: '20px', marginBottom: '10px' }}>
                        <h3 className="urdu-text" style={{ fontSize: '16px', fontWeight: 700, color: '#4ADE80', marginBottom: '8px', lineHeight: 2 }}>
                            {`${i + 1}. ${section.title}`}
                        </h3>
                        <p className="urdu-text urdu-body" style={{ color: 'rgba(240,247,241,0.75)', lineHeight: 2.4, fontSize: '14px' }}>
                            {section.body}
                        </p>
                    </div>
                ))}

                <div className="glass-card" style={{ padding: '16px 20px', marginTop: '8px', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                        support@towergreens.site
                    </p>
                    <p className="urdu-text" style={{ color: 'var(--text-muted)', fontSize: '12px', lineHeight: 2 }}>
                        {isUrdu ? '© 2026 TowerGreens — لاہور، پاکستان' : '© 2026 TowerGreens — Lahore, Pakistan'}
                    </p>
                </div>
            </div>
            <BottomNav />
        </div>
    )
}
