import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand } from '@fortawesome/free-solid-svg-icons';

export default function ResizeWindow({ setIsFullScreen }) {


    return (
        <button className="not-a-button" onClick={() => setIsFullScreen(true)}>
           <FontAwesomeIcon icon={faExpand} className='resize-window'/>
        </button>
    )
}