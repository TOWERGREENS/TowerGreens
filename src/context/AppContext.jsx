import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { authService } from '../lib/authService'
import { productService } from '../lib/productService'
import { orderService } from '../lib/orderService'
import insforge from '../lib/insforge'

const AppContext = createContext(null)

export function AppProvider({ children }) {
    const [language, setLanguage] = useState(() => localStorage.getItem('tg_lang') || null)
    const [theme, setTheme] = useState(() => {
        const stored = localStorage.getItem('tg_theme')
        if (stored) return stored
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    })
    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(true)
    const [cart, setCart] = useState(() => {
        try { return JSON.parse(localStorage.getItem('tg_cart') || '[]') } catch { return [] }
    })
    const [products, setProducts] = useState([])
    const [banners, setBanners] = useState([])
    const [categories, setCategories] = useState([])
    const [notifications, setNotifications] = useState([])
    const [toasts, setToasts] = useState([])
    const [orders, setOrders] = useState([])

    // Apply theme
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('tg_theme', theme)
    }, [theme])

    // Persist cart
    useEffect(() => {
        localStorage.setItem('tg_cart', JSON.stringify(cart))
    }, [cart])

    // ─── Auth: restore session on mount ───
    useEffect(() => {
        const restoreSession = async () => {
            try {
                const sess = await authService.getCurrentSession()
                if (sess?.user) {
                    setSession(sess)
                    setUser(sess.user)
                    const prof = await authService.getProfile(sess.user.id)
                    setProfile(prof)
                }
            } catch (err) {
                console.warn('[Auth] Session restore failed:', err.message)
            } finally {
                setLoading(false)
            }
        }
        restoreSession()
    }, [])

    // ─── Load products, banners, categories from DB ───
    useEffect(() => {
        const loadData = async () => {
            try {
                const [prods, cats, bans] = await Promise.all([
                    productService.getAll(),
                    productService.getCategories(),
                    insforge.database.from('banners').select('*').eq('is_active', true).order('sort_order').then(r => r.data || []),
                ])

                // Normalize products to match existing component shape
                setProducts(prods.map(p => ({
                    ...p,
                    nameUrdu: p.name_ur,
                    nameEn: p.name_en,
                    descriptionUrdu: p.description_ur,
                    descriptionEn: p.description_en,
                    name: p.name_ur,  // compat
                    image: p.image_url,
                    images: p.images?.length ? p.images : [p.image_url].filter(Boolean),
                    category: p.categories?.slug || '',
                    isFeatured: p.is_featured,
                    isAvailable: p.is_available,
                })))
                setCategories([
                    { id: 'all', name_ur: 'تمام', name_en: 'All', slug: 'all' },
                    ...cats
                ])
                setBanners(bans.map(b => ({
                    ...b,
                    id: b.id,
                    title: b.title_ur,
                    subtitle: b.subtitle_ur,
                    emoji: b.emoji,
                })))
            } catch (err) {
                console.warn('[Data] Load failed, using empty state:', err.message)
            }
        }
        loadData()
    }, [])

    // ─── Load notifications when user is set ───
    useEffect(() => {
        if (!user) { setNotifications([]); return }
        const loadNotifs = async () => {
            try {
                const { data } = await insforge.database
                    .from('notifications')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(30)
                setNotifications(data || [])
            } catch { }
        }
        loadNotifs()
    }, [user?.id])

    // ─── Language ───
    const selectLanguage = useCallback((lang) => {
        setLanguage(lang)
        localStorage.setItem('tg_lang', lang)
    }, [])

    // ─── Toasts ───
    const showToast = useCallback((message, type = 'info', duration = 3000) => {
        const id = Date.now()
        setToasts(prev => [...prev, { id, message, type }])
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), duration)
    }, [])

    // ─── Cart ───
    const addToCart = useCallback((product, quantity = 1) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === product.id)
            if (existing) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i)
            return [...prev, { ...product, quantity }]
        })
        showToast(`${product.name_ur || product.nameUrdu} کارٹ میں شامل ہو گئی`, 'success')
    }, [showToast])

    const removeFromCart = useCallback((productId) => {
        setCart(prev => prev.filter(i => i.id !== productId))
    }, [])

    const updateCartQuantity = useCallback((productId, quantity) => {
        if (quantity <= 0) setCart(prev => prev.filter(i => i.id !== productId))
        else setCart(prev => prev.map(i => i.id === productId ? { ...i, quantity } : i))
    }, [])

    const clearCart = useCallback(() => setCart([]), [])
    const cartTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0)
    const cartCount = cart.reduce((s, i) => s + i.quantity, 0)

    // ─── Auth Actions ───
    const login = useCallback(async (email, password) => {
        const data = await authService.signIn({ email, password })
        if (data?.user) {
            setUser(data.user)
            setSession(data)
            const prof = await authService.getProfile(data.user.id)
            setProfile(prof)
            return data.user
        }
        throw new Error('Login failed')
    }, [])

    const loginWithGoogle = useCallback(async () => {
        await authService.signInWithGoogle(`${window.location.origin}/app/home`)
    }, [])

    const signup = useCallback(async ({ email, password, name, phone }) => {
        const data = await authService.signUp({ email, password, name })
        return data  // returns { requireEmailVerification, ... }
    }, [])

    const verifyEmail = useCallback(async (email, otp) => {
        const data = await authService.verifyEmail({ email, otp })
        if (data?.user) {
            setUser(data.user)
            setSession(data)
            // Create profile on first verify
            await authService.createProfile({
                id: data.user.id,
                name: data.user.name || email.split('@')[0],
                role: 'customer',
            }).catch(() => { })
            const prof = await authService.getProfile(data.user.id).catch(() => null)
            setProfile(prof)
        }
        return data
    }, [])

    const logout = useCallback(async () => {
        try { await authService.signOut() } catch { }
        setUser(null)
        setSession(null)
        setProfile(null)
        setCart([])
        setOrders([])
    }, [])

    const updateUserProfile = useCallback(async (updates) => {
        if (!user) return
        const updated = await authService.updateProfile({ id: user.id, ...updates })
        setProfile(updated)
        showToast('پروفائل اپ ڈیٹ ہو گئی', 'success')
        return updated
    }, [user, showToast])

    // ─── Orders ───
    const placeOrder = useCallback(async ({ paymentMethod, address, coinsDiscount = 0 }) => {
        if (!user) throw new Error('Not logged in')
        const order = await orderService.create({
            userId: user.id,
            items: cart,
            paymentMethod,
            address,
            coinsDiscount,
        })
        clearCart()
        setOrders(prev => [order, ...prev])
        return order
    }, [user, cart, clearCart])

    const loadOrders = useCallback(async () => {
        if (!user) return
        const userOrders = await orderService.getByUser(user.id)
        setOrders(userOrders)
    }, [user])

    const claimOtpCoins = useCallback(async (orderId, otp) => {
        if (!user) throw new Error('Not logged in')
        const coinsEarned = await orderService.claimOtpCoins(orderId, user.id, otp)
        // Refresh profile balance
        const prof = await authService.getProfile(user.id)
        setProfile(prof)
        return coinsEarned
    }, [user])

    const value = {
        // Core
        language, selectLanguage,
        theme, setTheme,
        loading,

        // Auth
        user, setUser,
        profile, setProfile,
        session,
        login, loginWithGoogle, signup, verifyEmail, logout,
        updateUserProfile,

        // Data
        products, setProducts,
        banners, setBanners,
        categories,

        // Cart
        cart, addToCart, removeFromCart, updateCartQuantity, clearCart,
        cartTotal, cartCount,

        // Orders
        orders, placeOrder, loadOrders, claimOtpCoins,

        // Notifications
        notifications, setNotifications,

        // Toasts
        toasts, showToast,
    }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => {
    const ctx = useContext(AppContext)
    if (!ctx) throw new Error('useApp must be inside AppProvider')
    return ctx
}
