import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

export default function CollapsePlayer({setIsFullScreen}) {

    return(
        <button className="not-a-button" onClick={() => setIsFullScreen(false)}><FontAwesomeIcon icon={faAngleDown} /></button>
    )
}