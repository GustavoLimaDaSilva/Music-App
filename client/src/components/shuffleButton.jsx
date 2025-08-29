import { randomize } from "../.."
import { useContext, useRef, useState, useEffect } from "react"
import { PlayerContext } from "../playerProvider"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause } from '@fortawesome/free-solid-svg-icons';
import { faShuffle } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function ShuffleButton() {

    const { queue, setQueue } = useContext(PlayerContext)
    const originalQueue = useRef(null)
    const [isShuffle, setIsShuffle] = useState(false)

    

    return (<button className='not-a-button shuffle-button' onClick={() => {

        if (isShuffle) {
         
         setQueue({ list: [originalQueue.current[queue.offset], ...originalQueue.current], offset: queue.offset})
        return setIsShuffle(false)
        }

        originalQueue.current = queue.list
        const randomQueue = randomize(queue)
        setQueue({ list: randomQueue, offset: queue.offset })
        setIsShuffle(true)
    }}
    >
    {isShuffle ? <FontAwesomeIcon icon={faShuffle}/> : <FontAwesomeIcon icon={faArrowRight}/>}
    </button>)
}