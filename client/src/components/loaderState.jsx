import { useEffect, useState } from "react";
import Spinner from "./spinner";
import ErrorToast from "./errorToast";

export default function LoaderState({ callback }) {

    const [retry, setRetry] = useState(false)

    useEffect(() => {

        const timeout = setTimeout(() => setRetry(true), 2000)

        return () => clearTimeout(timeout)
    })

    return (
        <>
            {retry ?
                <ErrorToast callback={callback} setRetry={setRetry}/>
                :
                <Spinner />
            }
        </>
    )
}