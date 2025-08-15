import { randomize } from "../.."
import { useContext, useRef, useState, useEffect } from "react"
import { PlayerContext } from "../playerProvider"

export default function ShuffleButton() {

    const { queue, setQueue } = useContext(PlayerContext)
    const originalQueue = useRef(null)
    const [isShuffle, setIsShuffle] = useState(false)

    

    return (<button className='not-a-button' onClick={() => {

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
        <i className={isShuffle ? 'fas fa-shuffle' : 'fa-solid fa-arrow-right'}></i>
    </button>)
}