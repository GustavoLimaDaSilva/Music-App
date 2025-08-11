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

export default function PlayBar() {

    const { isPlaying, deviceID, queue } = useContext(PlayerContext)
    const { userCredentials } = useContext(AuthContext)
    const playBarRef = useRef(null)


    useEffect(() => {


        if (Object.keys(queue).length !== 0 && deviceID) {

            playBarRef.current.classList.remove('hidden')
        }
    }, [deviceID, queue])

    

    return (<>
        {Object.keys(queue).length !== 0 ?
            <div className="player-bar glass hidden" ref={playBarRef}>
                <div className="flex-wrapper">
                    <div className="player-actions-bar">
                        <SkipPrevious />
                        <PlayerButton songDuration={queue.list?.[queue.offset]?.duration_ms} />
                        <SkipNext />
                    </div>
                    <PlayerBarInfo currentTrack={queue.list[queue.offset]} />
                    <div className="player-additional-tools">
                        <ResizeWindow />
                    </div>
                </div>

                <ProgressBar track={queue.list[queue.offset]} />

            </div> : null
        }
    </>)

}