import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import ToastSystem from './components/shared/ToastSystem'

// Landing Pages
import LandingPage from './pages/landing/LandingPage'
import { AboutPage, HowItWorksPage, ContactPage, TermsPage, PrivacyPage, FaqPage } from './pages/landing/LandingSubPages'

// App Pages
import LanguageSelect from './pages/app/LanguageSelect'
import AppHome from './pages/app/AppHome'
import LoginPage from './pages/app/LoginPage'
import SignupPage from './pages/app/SignupPage'
import ForgotPasswordPage from './pages/app/ForgotPasswordPage'
import ProductsPage from './pages/app/ProductsPage'
import ProductDetailPage from './pages/app/ProductDetailPage'
import CartPage from './pages/app/CartPage'
import CheckoutPage from './pages/app/CheckoutPage'
import OrderPlacedPage from './pages/app/OrderPlacedPage'
import OrdersPage from './pages/app/OrdersPage'
import OrderDetailPage from './pages/app/OrderDetailPage'
import ProfilePage from './pages/app/ProfilePage'
import EditProfilePage from './pages/app/EditProfilePage'
import NotificationsPage from './pages/app/NotificationsPage'
import DirectMessagePage from './pages/app/DirectMessagePage'
import SearchPage from './pages/app/SearchPage'
import CoinsPage from './pages/app/CoinsPage'
import AppTermsPage from './pages/app/AppTermsPage'
import AppPrivacyPage from './pages/app/AppPrivacyPage'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminOrders from './pages/admin/AdminOrders'
import AdminProducts from './pages/admin/AdminProducts'
import AdminUsers from './pages/admin/AdminUsers'
import AdminRiders from './pages/admin/AdminRiders'
import AdminSettings from './pages/admin/AdminSettings'
import AdminLogin from './pages/admin/AdminLogin'
import AdminCategories from './pages/admin/AdminCategories'
import AdminCoins from './pages/admin/AdminCoins'
import AdminNotifications from './pages/admin/AdminNotifications'
import AdminAnalytics from './pages/admin/AdminAnalytics'
import AdminMessages from './pages/admin/AdminMessages'
import AdminContent from './pages/admin/AdminContent'

// Rider Pages
import RiderDashboard from './pages/rider/RiderDashboard'
import RiderOrders from './pages/rider/RiderOrders'
import RiderOtpVerify from './pages/rider/RiderOtpVerify'
import RiderSingleOrder from './pages/rider/RiderSingleOrder'

// ─── Auth: public app routes (no auth needed)
const APP_PUBLIC = ['/app/login', '/app/signup', '/app/forgot-password', '/app/language-select']

function AppGuard({ children }) {
    const { user, language } = useApp()
    const location = useLocation()
    if (!language) return <LanguageSelect />
    if (!user && !APP_PUBLIC.includes(location.pathname)) {
        return <Navigate to="/app/login" replace state={{ from: location }} />
    }
    return children
}

function AdminGuard({ children }) {
    const { user } = useApp()
    if (!user || user.role !== 'admin') return <AdminLogin />
    return children
}

function AppEntry() {
    const { user, language } = useApp()
    if (!language) return <LanguageSelect />
    if (!user) return <Navigate to="/app/login" replace />
    return <Navigate to="/app/home" replace />
}

export default function App() {
    return (
        <AppProvider>
            <BrowserRouter>
                <AppRouter />
                <ToastSystem />
            </BrowserRouter>
        </AppProvider>
    )
}

function AppRouter() {
    return (
        <Routes>
            {/* ─── Public Landing Pages ─── */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/terms" element={<TermsPage lang="ur" />} />
            <Route path="/terms-en" element={<TermsPage lang="en" />} />
            <Route path="/privacy" element={<PrivacyPage lang="ur" />} />
            <Route path="/privacy-en" element={<PrivacyPage lang="en" />} />
            <Route path="/faq" element={<FaqPage />} />

            {/* ─── App Entry ─── */}
            <Route path="/app" element={<AppEntry />} />

            {/* ─── Public App Routes ─── */}
            <Route path="/app/language-select" element={<LanguageSelect />} />
            <Route path="/app/login" element={<LoginPage />} />
            <Route path="/app/signup" element={<SignupPage />} />
            <Route path="/app/forgot-password" element={<ForgotPasswordPage />} />

            {/* ─── Protected App Routes ─── */}
            <Route path="/app/home" element={<AppGuard><AppHome /></AppGuard>} />
            <Route path="/app/products" element={<AppGuard><ProductsPage /></AppGuard>} />
            <Route path="/app/product/:id" element={<AppGuard><ProductDetailPage /></AppGuard>} />
            <Route path="/app/cart" element={<AppGuard><CartPage /></AppGuard>} />
            <Route path="/app/checkout" element={<AppGuard><CheckoutPage /></AppGuard>} />
            <Route path="/app/order-placed" element={<AppGuard><OrderPlacedPage /></AppGuard>} />
            <Route path="/app/orders" element={<AppGuard><OrdersPage /></AppGuard>} />
            <Route path="/app/orders/:id" element={<AppGuard><OrderDetailPage /></AppGuard>} />
            <Route path="/app/profile" element={<AppGuard><ProfilePage /></AppGuard>} />
            <Route path="/app/profile/edit" element={<AppGuard><EditProfilePage /></AppGuard>} />
            <Route path="/app/notifications" element={<AppGuard><NotificationsPage /></AppGuard>} />
            <Route path="/app/direct-message" element={<AppGuard><DirectMessagePage /></AppGuard>} />
            <Route path="/app/search" element={<AppGuard><SearchPage /></AppGuard>} />
            <Route path="/app/coins" element={<AppGuard><CoinsPage /></AppGuard>} />
            <Route path="/app/terms" element={<AppGuard><AppTermsPage /></AppGuard>} />
            <Route path="/app/privacy" element={<AppGuard><AppPrivacyPage /></AppGuard>} />

            {/* ─── Admin ─── */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
            <Route path="/admin/orders" element={<AdminGuard><AdminOrders /></AdminGuard>} />
            <Route path="/admin/orders/:id" element={<AdminGuard><AdminOrders /></AdminGuard>} />
            <Route path="/admin/products" element={<AdminGuard><AdminProducts /></AdminGuard>} />
            <Route path="/admin/categories" element={<AdminGuard><AdminCategories /></AdminGuard>} />
            <Route path="/admin/users" element={<AdminGuard><AdminUsers /></AdminGuard>} />
            <Route path="/admin/riders" element={<AdminGuard><AdminRiders /></AdminGuard>} />
            <Route path="/admin/coins" element={<AdminGuard><AdminCoins /></AdminGuard>} />
            <Route path="/admin/notifications" element={<AdminGuard><AdminNotifications /></AdminGuard>} />
            <Route path="/admin/analytics" element={<AdminGuard><AdminAnalytics /></AdminGuard>} />
            <Route path="/admin/messages" element={<AdminGuard><AdminMessages /></AdminGuard>} />
            <Route path="/admin/content" element={<AdminGuard><AdminContent /></AdminGuard>} />
            <Route path="/admin/settings" element={<AdminGuard><AdminSettings /></AdminGuard>} />
            <Route path="/admin/delivery-settings" element={<AdminGuard><AdminSettings /></AdminGuard>} />
            <Route path="/admin/payments" element={<AdminGuard><AdminSettings /></AdminGuard>} />

            {/* ─── Rider ─── */}
            <Route path="/rider" element={<RiderDashboard />} />
            <Route path="/rider/dashboard" element={<RiderDashboard />} />
            <Route path="/rider/orders" element={<RiderOrders />} />
            <Route path="/rider/orders/:id" element={<RiderSingleOrder />} />
            <Route path="/rider/otp-verify" element={<RiderOtpVerify />} />

            {/* ─── Catch all ─── */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}
