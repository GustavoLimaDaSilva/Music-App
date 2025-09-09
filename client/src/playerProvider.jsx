import { createContext, useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "./authProvider";
import { createNewPlayer, startTrack } from "..";
import useShuffle from "./hooks/useShuffle";

export const PlayerContext = createContext(null)

export default function PlayerProvider({ children }) {

    const { userCredentials } = useContext(AuthContext)
    const accessToken = userCredentials.accessToken

    const [player, setPlayer] = useState(null)
    const [isReady, setIsReady] = useState(false)
    const [deviceID, setDeviceID] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    
    
    const [playNext, setPlayNext] = useState([])
    const [queue, setQueue] = useState({})
    const [currentTrack, setCurrentTrack] = useState(JSON.parse(localStorage.getItem('currentTrack')))
    const {isShuffle, setIsShuffle, triggerShuffle} = useShuffle(false, queue, setQueue)

    useEffect(() => {

        if (!accessToken || userCredentials.userInfo?.product !== 'premium') return

        if (!deviceID) createNewPlayer(accessToken, setIsReady, setPlayer, setDeviceID)

        }, [userCredentials, deviceID])

    useEffect(() => {

        if (Object.keys(queue).length === 0) {
            return setQueue(JSON.parse(localStorage.getItem('queue')) || {})
        }
        if (!currentTrack) setCurrentTrack(JSON.parse(localStorage.getItem(currentTrack)))
    }, [])


    useEffect(() => {

        if (Object.keys(queue).length !== 0) localStorage.setItem('queue', JSON.stringify(queue))
    }, [queue])


    return (

<PlayerContext.Provider value={{ deviceID, isReady, setIsReady, isPlaying, setIsPlaying, queue, setQueue, playNext, setPlayNext, currentTrack, setCurrentTrack, isShuffle, setIsShuffle, triggerShuffle }}>
            {children}
        </PlayerContext.Provider>
    )
}