import { useEffect, useState } from "react";

export default function useScroll( container ) {

    const [scroll, setScroll] = useState(0)

    useEffect(() => {

        if (container === null) return

        const getScrollPos = () => {
            setTimeout(() => {

                setScroll(container.scrollLeft)
            }, 100)
        }

        container.addEventListener('scroll', getScrollPos)

        return () => {
            container.removeEventListener('scroll', getScrollPos)
        }
    },[container])

    return [scroll, setScroll]
}