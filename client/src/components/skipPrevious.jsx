import { useContext } from "react"
import { PlayerContext } from "../playerProvider"

export default function SkipPrevious() {

    const { queue, setQueue, setIsPlaying } = useContext(PlayerContext)

    return (

       <i className={queue.offset === 0 ? 'fa fa-backward disabled' : 'fa fa-backward'} onClick={() => {

        if (Object.keys(queue).length === 0 || queue.offset === 0) return

        setQueue({list: [...queue.list], offset: queue.offset - 1})
       }}></i>
    )
}