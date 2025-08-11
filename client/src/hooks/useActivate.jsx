import { useState, useEffect } from 'react';


export default function useActivate(ref) {


    const [isActive, setIsActive] = useState(false)

   
    useEffect(() => {

        if (isActive) document.addEventListener('click', isDifferentEl)


        return () => removeEventListener('click', isDifferentEl)

    }, [isActive])


     const isDifferentEl = (e) => {

        
        if (e.target !== ref.current && !ref.current.contains(e.target)) {
            
            setIsActive(false) 
        }
    }



    return [isActive, setIsActive]
}
