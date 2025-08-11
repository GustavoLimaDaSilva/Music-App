import { useContext, useState, useEffect, useRef } from "react"
import { AuthContext } from "../authProvider"
import { pause, resume, startTrack } from "../.."
import { PlayerContext } from "../playerProvider"

export default function PlayerButton({ songDuration }) {

    const { userCredentials } = useContext(AuthContext)
    const { deviceID, setIsPlaying, isPlaying, queue } = useContext(PlayerContext)

    

    return (

        <button className="not-a-button" onClick={async () => {

            if (isPlaying) {
                await pause(userCredentials.accessToken, queue.list[queue.offset])
            } else {
                await resume(userCredentials.accessToken)
            }

            setIsPlaying(prev => !prev)
        }}>
            <i className={isPlaying ? 'fa fa-pause' : 'fa fa-play'}></i>
        </button >
    )
}