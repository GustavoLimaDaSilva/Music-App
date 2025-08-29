

import { Outlet, useOutletContext } from 'react-router'
import { useState, useContext, createContext } from 'react'
import UserTopItems from './user-top-items'
export const PlayerContext = createContext(null)

export default function Home() {


    const [isBeingPlayed, setIsBeingPlayed] = useState(false)
    const userInput = useOutletContext()

    return (        
            <PlayerContext.Provider value={{ isBeingPlayed, setIsBeingPlayed }}>
                <div className={userInput === '' ? 'content-wrapper glass' : 'content-wrapper'}>
                    {userInput === '' ?
                        <>
                            <UserTopItems title='Top Recommendations' type='tracks'/>
                            <UserTopItems title='Top Artists'type='artists'/>
                        </>
                        :
                    <Outlet context={userInput} />
                    }
                                   </div>
            </PlayerContext.Provider>
    )
}
