import { useEffect, useRef, useState } from 'react'

export function useScrollReveal() {
    const ref = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
            { threshold: 0.15 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return [ref, isVisible]
}

export function useBottomNavHide() {
    const [hidden, setHidden] = useState(false)
    const lastY = useRef(0)

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY
            setHidden(y > lastY.current && y > 80)
            lastY.current = y
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return hidden
}

export function useCountUp(target, isActive, duration = 1500) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!isActive) return
        let start = 0
        const step = (timestamp) => {
            if (!start) start = timestamp
            const progress = Math.min((timestamp - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(step)
            else setCount(target)
        }
        requestAnimationFrame(step)
    }, [isActive, target, duration])

    return count
}
