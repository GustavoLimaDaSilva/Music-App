import { Link } from "react-router";
import { useContext } from "react";
import {PlayerContext} from "../playerProvider"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompactDisc, faUser,  faList, faAdd} from '@fortawesome/free-solid-svg-icons';

export default function TrackDropdownOptions({ context, item }) {

  const {playNext, setPlayNext} = useContext(PlayerContext)

return (<>
    <li className="dropdown-item" onClick={ () => setPlayNext([item, ...playNext])}><FontAwesomeIcon icon={faList} className="dropdown-svg"/>Play next</li>
    {context === 'playlists' || !context ?
     <>
        <li className="dropdown-item"><Link to={`/albums/${item.album?.id}`}><FontAwesomeIcon icon={faCompactDisc} className="dropdown-svg"/>Go to Album</Link></li>
        <li className="dropdown-item"><Link to={`/artists/${item.artists?.[0].id}`}><FontAwesomeIcon icon={faUser} className="dropdown-svg"/>Go to Artist</Link></li>
      </>
      :
      context === 'artists' ?
        <li className="dropdown-item"><Link to={`/albums/${item.album?.id}`}><FontAwesomeIcon icon={faCompactDisc} className="dropdown-svg"/>Go to album</Link></li>
        :
        context === 'albums' &&
        <li className="dropdown-item"><Link to={`/artists/${item.artists?.[0].id}`}><FontAwesomeIcon icon={faUser} className="dropdown-svg"/>Go to Artist</Link></li>
    }
  </>);
}

