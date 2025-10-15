import { useEffect, useState } from "react";
import Spinner from "./spinner";
import Toast from "./Toast";

export default function LoaderState({ callback }) {

    const [retry, setRetry] = useState(false)

    useEffect(() => {

        const timeout = setTimeout(() => setRetry(true), 2000)

        return () => clearTimeout(timeout)
    })

    return (
        <>
            {retry ?
                <Toast text='Apologies, we are facing some issues now.' callback={() => {
                    callback()
                    setRetry(prev => !prev)
                }} />
                :
                <Spinner />
            }
        </>
    )
}