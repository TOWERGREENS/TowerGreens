/* TowerGreens Service Worker — PRD §40 */
const CACHE_NAME = 'towergreens-v1'
const STATIC_ASSETS = [
    '/',
    '/app',
    '/manifest.json',
    '/logo.png',
]

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
    )
    self.skipWaiting()
})

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        )
    )
    self.clients.claim()
})

self.addEventListener('fetch', (e) => {
    const { request } = e
    const url = new URL(request.url)

    // Network first for API calls
    if (url.pathname.startsWith('/api/')) {
        e.respondWith(fetch(request).catch(() => caches.match(request)))
        return
    }

    // Cache first for static
    e.respondWith(
        caches.match(request).then(cached => cached || fetch(request).then(resp => {
            if (resp.ok && request.method === 'GET') {
                const clone = resp.clone()
                caches.open(CACHE_NAME).then(c => c.put(request, clone))
            }
            return resp
        }))
    )
})

// Push notification handler
self.addEventListener('push', (e) => {
    const data = e.data?.json() || {}
    const { title = 'TowerGreens', body = '', icon = '/icons/icon-192.png', badge = '/icons/icon-72.png', url = '/app' } = data
    e.waitUntil(
        self.registration.showNotification(title, {
            body,
            icon,
            badge,
            vibrate: [100, 50, 100],
            data: { url },
            actions: [{ action: 'open', title: 'دیکھیں' }, { action: 'dismiss', title: 'بند کریں' }],
        })
    )
})

self.addEventListener('notificationclick', (e) => {
    e.notification.close()
    if (e.action === 'dismiss') return
    const url = e.notification.data?.url || '/app'
    e.waitUntil(clients.openWindow(url))
})
