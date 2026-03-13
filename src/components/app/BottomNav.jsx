import { useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { useBottomNavHide } from '../../hooks/useScrollReveal'
import { Home, ShoppingBag, ShoppingCart, Bell, User } from 'lucide-react'

const TABS = [
    { icon: Home, labelUr: 'ہوم', labelEn: 'Home', path: '/app/home' },
    { icon: ShoppingBag, labelUr: 'پروڈکٹس', labelEn: 'Products', path: '/app/products' },
    { icon: ShoppingCart, labelUr: 'کارٹ', labelEn: 'Cart', path: '/app/cart' },
    { icon: Bell, labelUr: 'نوٹیفیکیشنز', labelEn: 'Alerts', path: '/app/notifications' },
    { icon: User, labelUr: 'پروفائل', labelEn: 'Profile', path: '/app/profile' },
]

export default function BottomNav() {
    const navigate = useNavigate()
    const location = useLocation()
    const { cartCount, notifications, language } = useApp()
    const hidden = useBottomNavHide()
    const unreadNotifs = notifications.filter(n => !n.read).length

    return (
        <nav className={`bottom-nav${hidden ? ' hidden' : ''}`} role="navigation" aria-label="Main Navigation">
            {TABS.map((tab, i) => {
                const isActive = location.pathname === tab.path ||
                    (tab.path === '/app/home' && location.pathname === '/app')
                const Icon = tab.icon
                const badge = tab.path === '/app/cart' ? cartCount :
                    tab.path === '/app/notifications' ? unreadNotifs : 0

                return (
                    <button
                        key={i}
                        className={`bottom-nav__tab${isActive ? ' active' : ''}`}
                        onClick={() => navigate(tab.path)}
                        aria-label={language === 'en' ? tab.labelEn : tab.labelUr}
                        id={`nav-tab-${tab.labelEn.toLowerCase().replace(' ', '-')}`}
                    >
                        <Icon className="bottom-nav__icon" size={22} />
                        <span className="bottom-nav__label urdu-text">
                            {language === 'en' ? tab.labelEn : tab.labelUr}
                        </span>
                        {badge > 0 && <span className="bottom-nav__badge">{badge}</span>}
                    </button>
                )
            })}
        </nav>
    )
}
