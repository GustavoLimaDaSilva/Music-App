// import { logContext } from "../App"
import { useContext } from "react"

export default function Button({ txt, event, setState }) {


    return (
        <button onClick={() => {
            setState !== undefined && setState(txt)
            event !== undefined && event()
        }} className='btn'>{txt}</button>
    )
}
