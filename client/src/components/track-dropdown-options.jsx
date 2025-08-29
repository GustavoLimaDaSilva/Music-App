import { Link } from "react-router";
import { useContext } from "react";
import {PlayerContext} from "../playerProvider"
// import { playNext } from "../..";

export default function TrackDropdownOptions({ context, item }) {

  const {playNext, setPlayNext} = useContext(PlayerContext)

return (<>
    <li className="dropdown-item" onClick={ () => setPlayNext([item, ...playNext])}>Play next</li>
    {context === 'playlists' || !context ?
     <>
        <li className="dropdown-item"><Link to={`/albums/${item.album?.id}`}>Go to Album</Link></li>
        <li className="dropdown-item"><Link to={`/artists/${item.artists?.[0].id}`}>Go to Artist</Link></li>
      </>
      :
      context === 'artists' ?
        <li className="dropdown-item"><Link to={`/albums/${item.album?.id}`}>Go to album</Link></li>
        :
        context === 'albums' &&
        <li className="dropdown-item"><Link to={`/artists/${item.artists?.[0].id}`}>Go to Artist</Link></li>
    }
  </>);
}

