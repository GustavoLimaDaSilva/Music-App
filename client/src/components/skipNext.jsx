import { useEffect, useContext } from "react"
import { PlayerContext } from "../playerProvider"

export default function SkipNext() {

    const { setIsPlaying, queue, setQueue } = useContext(PlayerContext)

    return (

        <i className={queue.offset + 1 === queue.list?.length ? "fa fa-forward disabled" : "fa fa-forward"} onClick={() => {

            if (Object.keys(queue).length === 0 || queue.offset + 1 === queue.list.length) return

            setQueue({ list: [...queue.list], offset: queue.offset + 1 })
setIsPlaying(true)
        }}></i >
    )
}