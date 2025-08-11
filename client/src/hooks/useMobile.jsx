import { useState, useEffect } from "react"

export default function useMobile(breakpoint = 768) {

    const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpoint)

    useEffect(() => {
        
        const mediaQuery = window.matchMedia(`(max-width:${breakpoint}px)`)

       const checkWindowSize = () => {

        setIsMobile(mediaQuery.matches)
        } 

        mediaQuery.addEventListener('change', checkWindowSize)

        return () => {
            window.removeEventListener('change', checkWindowSize)
        }
    }, [breakpoint])

    return [isMobile, setIsMobile]
}