
import EmptyState from './emptyState'
import { Outlet, useOutletContext } from 'react-router'
import { useState, useContext, createContext } from 'react'
import UserTopItems from './user-top-items'
export const PlayerContext = createContext(null)

export default function Home() {


    const [isBeingPlayed, setIsBeingPlayed] = useState(false)
    const [hascontent, setHasContent] = useState(true)
    const userInput = useOutletContext()

    return (
        <PlayerContext.Provider value={{ isBeingPlayed, setIsBeingPlayed }}>
            <div className={userInput === '' ? 'content-wrapper glass' : 'content-wrapper'}>
                {userInput === '' ?
                    <>
                        {hascontent ? 
                        <>
                            <UserTopItems title='Top Recommendations' type='tracks' setHasContent={setHasContent}/>
                            <UserTopItems title='Top Artists'type='artists' setHasContent={setHasContent}/>
                            </>
: 
<EmptyState itemsType={'favorite items'}/>
}
                    </>
                    :
                    <Outlet context={userInput} />
                }
            </div>
        </PlayerContext.Provider>
    )
}
