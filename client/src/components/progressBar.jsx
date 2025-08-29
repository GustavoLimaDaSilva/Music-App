import { setTrackTimer, seekProgress } from "../.."
import { useEffect, useContext, useState, useRef } from "react"
import { PlayerContext } from "../playerProvider"
import { AuthContext } from "../authProvider"

export default function ProgressBar({ track }) {

    const { isPlaying, queue, setQueue, playNext, setPlayNext, currentTrack, setCurrentTrack } = useContext(PlayerContext)
    const { userCredentials } = useContext(AuthContext)
    const [userSeeked, setUserSeeked] = useState(false)
    const timerRef = useRef(null)

    useEffect(() => {

        document.querySelector('.progress-bar').style.setProperty('--progress-width', `0%`)
        timerRef.current = null
    }, [track])


    useEffect(() => {

        if (!isPlaying || !track) return


        if (userSeeked) {
            seekProgress(userSeeked.container, userSeeked.clickPosition, track, userCredentials.accessToken)
            setUserSeeked(false)
        }
        timerRef.current = setTrackTimer(track, queue, setQueue, playNext, setPlayNext, setCurrentTrack)

        return () => {
            clearInterval(timerRef.current)
        }
    }, [isPlaying, track, userSeeked])




    return (
        <div className="progress-container" onClick={(e) => {
            setUserSeeked({ container: e.currentTarget, clickPosition: e.clientX })
        }}>
            <div className="progress-bar"></div>
        </div>
    )
}