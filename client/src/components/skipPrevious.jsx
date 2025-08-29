import { useContext } from "react"
import { PlayerContext } from "../playerProvider"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
export default function SkipPrevious() {

    const { queue, setQueue, currentTrack, setCurrentTrack, playNext, setPlayNext, setIsPlaying } = useContext(PlayerContext)

    return (
        <button className="not-a-button" onClick={() => {

            if (Object.keys(queue).length === 0 || queue.offset === 0) return

            if (queue.list.find(track => currentTrack.id === track.id)) {

                setQueue({ list: [...queue.list], offset: queue.offset - 1 })
                setCurrentTrack(queue.list[queue.offset - 1])
            } else {

                setCurrentTrack(queue.list[queue.offset]);
            }
        }}>
            <FontAwesomeIcon icon={faBackward} className={queue.offset === 0 ? "disabled" : ""} />
        </button>
    )
}