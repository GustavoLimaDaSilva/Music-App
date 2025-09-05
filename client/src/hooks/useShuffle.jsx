import { PlayerContext } from "../playerProvider"
import { useState, useEffect, useRef, useContext } from "react";
import { randomize } from "../.."

export default function useShuffle(bool, queue, setQueue) {

    // const { queue, setQueue } = useContext(PlayerContext)

    const [isShuffle, setIsShuffle] = useState(bool || JSON.parse(localStorage.getItem('isShuffle')))
    const [shuffleTrigger, setShuffleTrigger] = useState('')
    const originalQueue = useRef(JSON.parse(localStorage.getItem('originalQueue')))

    function triggerShuffle() {

        setShuffleTrigger(Date.now())
    }

    useEffect(() => {
        if (Object.keys(queue).length === 0) return

        if (isShuffle) {

            originalQueue.current = queue.list
            const randomQueue = randomize(queue)
            setQueue({ list: randomQueue, offset: queue.offset })
        }
        else {

            if (originalQueue.current) {
                setQueue({ list: [originalQueue.current[queue.offset], ...originalQueue.current], offset: queue.offset})
                originalQueue.current = null
            }
        }
        localStorage.setItem('isShuffle', JSON.stringify(isShuffle))
        localStorage.setItem('originalQueue', JSON.stringify(originalQueue.current))
        
    }, [isShuffle, shuffleTrigger])

    return { isShuffle, setIsShuffle, triggerShuffle }
}