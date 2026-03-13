import { useApp } from '../../context/AppContext'

export default function ToastSystem() {
    const { toasts } = useApp()
    if (!toasts.length) return null

    return (
        <div className="toast-container">
            {toasts.map(toast => (
                <div key={toast.id} className={`toast ${toast.type}`}>
                    {toast.type === 'success' && '✓ '}
                    {toast.type === 'error' && '✕ '}
                    {toast.message}
                </div>
            ))}
        </div>
    )
}
