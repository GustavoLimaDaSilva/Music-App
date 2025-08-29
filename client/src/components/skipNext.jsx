import { useEffect, useContext } from "react"
import { PlayerContext } from "../playerProvider"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward } from '@fortawesome/free-solid-svg-icons';

export default function SkipNext() {

    const { setIsPlaying, queue, setQueue, setCurrentTrack, playNext, setPlayNext } = useContext(PlayerContext)

    return (
 <button className="not-a-button" onClick={() => {

            if (Object.keys(queue).length === 0 || queue.offset + 1 === queue.list.length) return

            if (playNext.length > 0) {

                setCurrentTrack({...playNext[0]});
                console.log(playNext);
                setPlayNext(prev => prev.slice(1));
                setIsPlaying(true)
            } else {
                setQueue({ list: [...queue.list], offset: queue.offset + 1 })
                setCurrentTrack({...queue.list[queue.offset + 1]})
            }
        }}>
            <FontAwesomeIcon icon={faForward} className={queue.offset + 1 === queue.list?.length ? "disabled" : ""}/>
 </button>
    )
}