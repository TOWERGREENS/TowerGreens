import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { Bell, ShoppingCart } from 'lucide-react'
import logo from '/logo.png'

export default function AppHeader({ title }) {
    const navigate = useNavigate()
    const { cartCount, notifications } = useApp()
    const unread = notifications.filter(n => !n.read).length

    return (
        <header style={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            background: 'var(--overlay-dark)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(74,222,128,0.08)',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        }}>
            <button onClick={() => navigate('/app/home')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <img src={logo} alt="TowerGreens" style={{ height: '36px', width: '36px', borderRadius: '50%', objectFit: 'cover' }} />
            </button>

            {title && (
                <h1 className="urdu-text" style={{ fontSize: '16px', fontWeight: 600, flex: 1, textAlign: 'center', margin: '0 12px' }}>
                    {title}
                </h1>
            )}

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <button
                    onClick={() => navigate('/app/notifications')}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', color: 'var(--text-muted)' }}
                    id="header-notifications-btn"
                >
                    <Bell size={22} />
                    {unread > 0 && (
                        <span style={{
                            position: 'absolute', top: '-4px', right: '-4px',
                            background: 'var(--accent)', color: '#080E0A',
                            borderRadius: '50%', width: '16px', height: '16px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '10px', fontWeight: 700,
                        }}>{unread}</span>
                    )}
                </button>
                <button
                    onClick={() => navigate('/app/cart')}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', color: 'var(--text-muted)' }}
                    id="header-cart-btn"
                >
                    <ShoppingCart size={22} />
                    {cartCount > 0 && (
                        <span style={{
                            position: 'absolute', top: '-4px', right: '-4px',
                            background: 'var(--accent)', color: '#080E0A',
                            borderRadius: '50%', width: '16px', height: '16px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '10px', fontWeight: 700,
                        }}>{cartCount}</span>
                    )}
                </button>
            </div>
        </header>
    )
}
