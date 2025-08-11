import { createContext, useEffect, useState, useContext, useRef } from "react";
import { AccountContext } from './App'
import { AuthContext } from "./authProvider";
import { createNewPlayer, startTrack } from "..";

export const PlayerContext = createContext(null)

export default function PlayerProvider({ children }) {

    const { userCredentials } = useContext(AuthContext)
    const accessToken = userCredentials.accessToken
    const { isPremium } = useContext(AccountContext)
    const [player, setPlayer] = useState(null)
    const [isReady, setIsReady] = useState(false)
    const [deviceID, setDeviceID] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [queue, setQueue] = useState({})
    const prevTrackRef = useRef(null)

    useEffect(() => {

        if (!accessToken || !isPremium) return

        if (!deviceID) createNewPlayer(accessToken, setIsReady, setPlayer, setDeviceID)


    }, [accessToken, isPremium, deviceID])

    useEffect(() => {

        if (Object.keys(queue).length === 0) {
            return setQueue(JSON.parse(localStorage.getItem('queue')) || {})
        }
    }, [])

    useEffect(() => {

        if (Object.keys(queue).length !== 0) localStorage.setItem('queue', JSON.stringify(queue))
    }, [queue])


    useEffect(() => {

        if (Object.keys(queue).length === 0) return

        const prevTrack = prevTrackRef.current
        const isNewTrack = !prevTrack || prevTrack?.id !== queue.list[queue.offset].id

        async function startSong() {
            await startTrack(deviceID, userCredentials.accessToken, queue.list[queue.offset])
        }

        if (isPlaying && isNewTrack) {
            prevTrackRef.current = queue.list[queue.offset]
            startSong()
        }
    }, [queue.list?.[queue.offset]?.id, isPlaying])

    return (
        <PlayerContext.Provider value={{ deviceID, isReady, setIsReady, isPlaying, setIsPlaying, queue, setQueue }}>
            {children}
        </PlayerContext.Provider>
    )
}