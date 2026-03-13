import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)

// ─── Service Worker Registration (PRD §40) ───
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js', { scope: '/' })
            .then(reg => console.log('[SW] Registered:', reg.scope))
            .catch(err => console.warn('[SW] Registration failed:', err))
    })
}
