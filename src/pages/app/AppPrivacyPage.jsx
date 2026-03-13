import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { ArrowLeft } from 'lucide-react'
import BottomNav from '../../components/app/BottomNav'

const PRIVACY_UR = [
    {
        title: 'ہم کیا ڈیٹا جمع کرتے ہیں؟',
        body: 'ہم وہ معلومات جمع کرتے ہیں جو آپ ہمیں دیتے ہیں: نام، ای میل، فون نمبر، ڈیلیوری پتہ، پروفائل تصویر۔ نیز آرڈر تاریخ، ادائیگی کی معلومات (JazzCash Transaction ID)، اور اپلیکیشن استعمال کا ڈیٹا۔'
    },
    {
        title: 'ڈیٹا کا مقصد',
        body: 'آپ کی معلومات ڈیلیوری مکمل کرنے، آرڈر کی حیثیت بتانے، TowerGreens Coins کا حساب رکھنے، اور آپ کی مدد کرنے کے لیے استعمال ہوتی ہے۔ مارکیٹنگ کے لیے صرف آپ کی اجازت سے استعمال ہوگی۔'
    },
    {
        title: 'تیسرے فریق',
        body: 'ہم درج ذیل تیسرے فریق کے ساتھ ضروری ڈیٹا شیئر کرتے ہیں:\n• insforge.dev — ڈیٹا بیس اور تصدیق\n• JazzCash — ادائیگی کی پروسیسنگ\n• Google OAuth — اکاؤنٹ لاگ ان\n• median.co — APK/iOS ایپ پش نوٹیفیکیشن\n\nہم آپ کا ڈیٹا کبھی فروخت نہیں کرتے۔'
    },
    {
        title: 'ڈیٹا کو کب تک رکھا جائے گا؟',
        body: 'آپ کا ڈیٹا اکاؤنٹ بند ہونے تک محفوظ رہتا ہے۔ آرڈر ڈیٹا قانونی ضروریات کے لیے 5 سال تک رکھا جاتا ہے۔ آپ کسی بھی وقت support@towergreens.site پر ڈیٹا حذف کرنے کی درخواست کر سکتے ہیں۔'
    },
    {
        title: 'آپ کے حقوق',
        body: 'آپ کو حق ہے کہ:\n• اپنا ڈیٹا دیکھیں\n• غلط معلومات درست کروائیں\n• اپنا ڈیٹا حذف کروائیں\n• ڈیٹا پروسیسنگ پر اعتراض کریں\n\nکسی بھی حق کے لیے support@towergreens.site پر لکھیں۔'
    },
    {
        title: 'سیکیورٹی',
        body: 'ہم آپ کے ڈیٹا کی حفاظت کے لیے HTTPS انکرپشن، httpOnly cookies، اور insforge.dev کی سیکیورٹی استعمال کرتے ہیں۔ OTP 24 گھنٹے بعد خودبخود ختم ہو جاتا ہے۔'
    },
    {
        title: 'Cookies',
        body: 'ہم ضروری Cookies استعمال کرتے ہیں تاکہ آپ کا لاگ ان اسٹیٹ محفوظ رہے۔ localStorage میں صرف زبان کی ترجیح ذخیرہ ہوتی ہے۔'
    },
    {
        title: 'رابطہ',
        body: 'رازداری سے متعلق کسی بھی سوال کے لیے:\nای میل: support@towergreens.site\nجگہ: لاہور، پاکستان'
    }
]

const PRIVACY_EN = [
    {
        title: 'What Data We Collect',
        body: 'We collect information you provide: name, email, phone number, delivery address, and profile image. We also collect order history, payment information (JazzCash Transaction ID), and app usage data.'
    },
    {
        title: 'Purpose of Data',
        body: 'Your information is used to fulfill deliveries, communicate order status, manage TowerGreens Coins, and provide support. Marketing communications are sent only with your consent.'
    },
    {
        title: 'Third Parties',
        body: 'We share necessary data with:\n• insforge.dev — Database and authentication\n• JazzCash — Payment processing\n• Google OAuth — Account sign-in\n• median.co — APK/iOS push notifications\n\nWe never sell your data.'
    },
    {
        title: 'Data Retention',
        body: 'Your data is kept until account deletion. Order data is retained for 5 years for legal compliance. You may request data deletion at any time by emailing support@towergreens.site.'
    },
    {
        title: 'Your Rights',
        body: 'You have the right to:\n• Access your data\n• Correct incorrect information\n• Delete your data\n• Object to data processing\n\nContact support@towergreens.site for any rights request.'
    },
    {
        title: 'Security',
        body: 'We protect your data using HTTPS encryption, httpOnly cookies, and insforge.dev security infrastructure. OTPs automatically expire after 24 hours.'
    },
    {
        title: 'Cookies',
        body: 'We use essential cookies to maintain your login session. Only language preference is stored in localStorage.'
    },
    {
        title: 'Contact',
        body: 'For privacy inquiries:\nEmail: support@towergreens.site\nLocation: Lahore, Pakistan'
    }
]

export default function AppPrivacyPage() {
    const { language } = useApp()
    const navigate = useNavigate()
    const isUrdu = language === 'ur' || !language
    const sections = isUrdu ? PRIVACY_UR : PRIVACY_EN

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: '100px' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', position: 'sticky', top: 0, background: 'rgba(8,14,10,0.95)', backdropFilter: 'blur(16px)', zIndex: 50, borderBottom: '1px solid rgba(74,222,128,0.08)' }}>
                <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer' }}><ArrowLeft size={20} /></button>
                <h1 className="urdu-text" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text)', lineHeight: 2 }}>
                    {isUrdu ? 'رازداری کی پالیسی' : 'Privacy Policy'}
                </h1>
            </div>

            <div style={{ padding: '20px 16px' }}>
                <div className="glass-card" style={{ padding: '16px 20px', marginBottom: '16px', background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.2)' }}>
                    <p className="urdu-text" style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 2 }}>
                        {isUrdu
                            ? 'آخری اپ ڈیٹ: مارچ 2026 — TowerGreens آپ کی رازداری کی حفاظت کو اولین ترجیح دیتا ہے۔'
                            : 'Last updated: March 2026 — TowerGreens treats your privacy as a top priority.'}
                    </p>
                </div>

                {sections.map((section, i) => (
                    <div key={i} className="glass-card" style={{ padding: '20px', marginBottom: '10px' }}>
                        <h3 className="urdu-text" style={{ fontSize: '16px', fontWeight: 700, color: '#4ADE80', marginBottom: '8px', lineHeight: 2 }}>
                            {`${i + 1}. ${section.title}`}
                        </h3>
                        <p className="urdu-text urdu-body" style={{ color: 'rgba(240,247,241,0.75)', lineHeight: 2.4, fontSize: '14px', whiteSpace: 'pre-line' }}>
                            {section.body}
                        </p>
                    </div>
                ))}

                <div className="glass-card" style={{ padding: '16px 20px', marginTop: '8px', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>support@towergreens.site</p>
                    <p className="urdu-text" style={{ color: 'var(--text-muted)', fontSize: '12px', lineHeight: 2 }}>
                        {isUrdu ? '© 2026 TowerGreens — لاہور، پاکستان' : '© 2026 TowerGreens — Lahore, Pakistan'}
                    </p>
                </div>
            </div>
            <BottomNav />
        </div>
    )
}
