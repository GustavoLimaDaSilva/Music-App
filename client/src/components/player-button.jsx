import { useContext, useState, useEffect, useRef } from "react"
import { AuthContext } from "../authProvider"
import { pause, resume, startTrack } from "../.."
import { PlayerContext } from "../playerProvider"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

export default function PlayerButton() {

    const { userCredentials } = useContext(AuthContext)
    const { deviceID, setIsPlaying, isPlaying, currentTrack } = useContext(PlayerContext)

        return (

        <button className="not-a-button" onClick={async () => {

            if (isPlaying) {
                await pause(userCredentials.accessToken, currentTrack)
            } else {
                await resume(userCredentials.accessToken)
            }

            setIsPlaying(prev => !prev)
        }}>
            {isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
        </button >
    )
}