import PlayerButton from "./player-button"
import SkipNext from "./skipNext"
import SkipPrevious from "./skipPrevious"
import ResizeWindow from "./resizeWindow"
import ProgressBar from "./progressBar"
import PlayerBarInfo from "./player-bar-info"
import { useEffect, useContext, useRef, useState } from "react"
import { PlayerContext } from "../playerProvider"
import { deviceAvailable, startTrack } from "../.."
import { AuthContext } from "../authProvider"
import useMobile from '../hooks/useMobile'
import ShuffleButton from "./shuffleButton"

export default function PlayBar() {

    const { isPlaying, deviceID, queue, playNext, setPlayNext, currentTrack } = useContext(PlayerContext)
    const { userCredentials } = useContext(AuthContext)
    const playBarRef = useRef(null)
    const [isMobile, setIsMobile] = useMobile()


    useEffect(() => {


        if (Object.keys(queue).length !== 0 && deviceID && currentTrack) {

            playBarRef.current.classList.remove('hidden')
        }
    }, [deviceID, queue])


    useEffect(() => {
        if (!currentTrack) return;

        startTrack(deviceID, userCredentials.accessToken, currentTrack);
        localStorage.setItem('currentTrack', JSON.stringify(currentTrack));

    }, [currentTrack, deviceID, userCredentials.accessToken]);


    return (<>
        {currentTrack ?
            <div className="player-bar glass hidden" ref={playBarRef}>
                <div className="flex-wrapper">
                    <div className="player-actions-bar">
                        <SkipPrevious />
                        <PlayerButton songDuration={currentTrack.duration_ms} />
                        <SkipNext />
                    </div>
                    <PlayerBarInfo currentTrack={currentTrack} />
                    <div className="player-additional-tools">
                       {isMobile ? <ResizeWindow /> : <ShuffleButton />}
                    </div>
                </div>
                <ProgressBar track={currentTrack} />
            </div> : null
        }
    </>)

}