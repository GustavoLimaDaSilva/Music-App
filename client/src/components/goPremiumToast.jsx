import { useEffect, useRef } from "react"

export default function GoPremiumToast({ toStream }) {

    const toastRef = useRef(null)

    useEffect(() => {

        if (toStream.length === 0) return
        toastRef.current.classList.add('toast-fade')

        const timeout = setTimeout(() => toastRef.current.classList.remove('toast-fade'), 3000)

        return () => {
            clearTimeout(timeout)
        }

    }, [toStream])

    return (
        <div className="toast bottom-toast" ref={toastRef}>
            <p className="inline-mode">Only premium members can stream full tracks.</p>
            <a href="https://support.spotify.com/br-pt/category/premium-plans/">Join us.</a>
        </div>
    )
}