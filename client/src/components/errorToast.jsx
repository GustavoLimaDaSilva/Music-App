export default function ErrorToast({ callback, setRetry }) {


    return (
        <div className="toast bottom-toast">
            <p className="inline-mode">Apologies, we are facing some issues now.</p>
            <button className="not-a-button" onClick={() => {
                callback()
                setRetry(prev => !prev)
            }}>Try Again</button>
        </div>
    )
}