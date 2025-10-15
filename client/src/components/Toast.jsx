import { useEffect, useRef } from "react"

export default function Toast({ callback, text, setToastProps }) {

    const toastRef = useRef(null)

    useEffect(() => {

        toastRef.current.classList.add('toast-fade')

        const timeout = setTimeout(() => {

            toastRef.current.classList.remove('toast-fade')
            setToastProps({})
        }, 7000)

        return () => {
            clearTimeout(timeout)
        }

    }, [])

    return (
        <div className="toast bottom-toast" ref={toastRef}>
            <p className="inline-mode">{text}</p>
            {callback ?
                <button className="not-a-button" onClick={() => {
                    callback()
                }}>
                    Try Again
                </button>
                :
                <a href="https://support.spotify.com/br-pt/category/premium-plans/">Unlock unlimited access.</a>
            }
        </div>
    )
}