import { useEffect, useContext } from "react"
import { AuthContext } from "../authProvider"
export default function ErrorToast({ callback, setRetry }) {

    const { userCredentials } = useContext(AuthContext)


    return (
        <div className="toast">
            <p className="inline-mode">Apologies, we are facing some issues now.</p>
            <button className="not-a-button" onClick={() => {
                callback()
                setRetry(prev => !prev)
            }}>Try Again</button>
        </div>
    )
}