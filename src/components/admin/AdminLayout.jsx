import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { LayoutDashboard, Package, ShoppingBag, Users, Bike, Coins, Bell, Truck, CreditCard, BarChart2, MessageCircle, FileEdit, Settings, LogOut, Menu, X } from 'lucide-react'
import logo from '/logo.png'

const ADMIN_NAV = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Package, label: 'Orders', path: '/admin/orders', badge: 3 },
    { icon: ShoppingBag, label: 'Products', path: '/admin/products' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: Bike, label: 'Riders', path: '/admin/riders' },
    { icon: Bell, label: 'Notifications', path: '/admin/notifications' },
    { icon: Truck, label: 'Delivery', path: '/admin/delivery-settings' },
    { icon: CreditCard, label: 'Payments', path: '/admin/payments' },
    { icon: BarChart2, label: 'Analytics', path: '/admin/analytics' },
    { icon: MessageCircle, label: 'Messages', path: '/admin/messages' },
    { icon: FileEdit, label: 'Content', path: '/admin/content' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
]

export function AdminLayout({ children, title }) {
    const { logout } = useApp()
    const navigate = useNavigate()
    const location = useLocation()
    const [collapsed, setCollapsed] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#0D0F14', color: '#fff' }}>
            {/* Sidebar */}
            <aside className={`admin-sidebar${collapsed ? ' collapsed' : ''}`} style={{ display: 'flex', flexDirection: 'column' }}>
                {/* Logo */}
                <div style={{ padding: '20px 16px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <img src={logo} alt="" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                    {!collapsed && <span style={{ fontWeight: 700, fontSize: '15px', color: '#4ADE80' }}>TG Admin</span>}
                </div>
                {/* Nav */}
                <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
                    {ADMIN_NAV.map((item) => {
                        const Icon = item.icon
                        const active = location.pathname === item.path
                        return (
                            <Link key={item.path} to={item.path} className={`admin-nav-item${active ? ' active' : ''}`} id={`admin-nav-${item.label.toLowerCase()}`} style={{ position: 'relative' }}>
                                <Icon size={18} />
                                {!collapsed && <span>{item.label}</span>}
                                {item.badge && !collapsed && (
                                    <span style={{ marginLeft: 'auto', background: '#ef4444', color: '#fff', borderRadius: '9999px', padding: '1px 6px', fontSize: '11px', fontWeight: 700 }}>{item.badge}</span>
                                )}
                                {item.badge && collapsed && (
                                    <span style={{ position: 'absolute', top: '4px', right: '4px', width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
                                )}
                            </Link>
                        )
                    })}
                </nav>
                {/* Logout */}
                <div style={{ padding: '16px 8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <button onClick={() => { logout(); navigate('/admin') }} className="admin-nav-item" style={{ width: '100%', background: 'rgba(239,68,68,0.08)', color: '#ef4444' }} id="admin-logout-btn">
                        <LogOut size={18} />
                        {!collapsed && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <div className={`admin-main${collapsed ? ' sidebar-collapsed' : ''}`} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Topbar */}
                <div className="admin-topbar">
                    <button onClick={() => setCollapsed(!collapsed)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
                        <Menu size={20} />
                    </button>
                    <h1 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', flex: 1 }}>{title || 'Admin Panel'}</h1>
                    <button style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative', color: '#fff' }}>
                        <Bell size={16} />
                        <span style={{ position: 'absolute', top: '6px', right: '6px', width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '9999px' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #4ADE80, #16A34A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: '#080E0A' }}>A</div>
                        <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>admin@towergreens.site</span>
                    </div>
                </div>
                {/* Page content */}
                <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
                    {children}
                </div>
            </div>
        </div>
    )
}
