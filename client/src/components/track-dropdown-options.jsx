import { Link } from "react-router";

export default function TrackDropdownOptions({ context, albumId, artistId }) {


return (<>
    <li className="dropdown-item">Add to queue</li>
    <li className="dropdown-item">Add to Playlist</li>
    <li className="dropdown-item">Add to liked songs</li>
    {context === 'playlists' || !context ?
     <>
        <Link to={`/albums/${albumId}`}><li className="dropdown-item">Go to Album</li></Link>
        <Link to={`/artists/${artistId}`}><li className="dropdown-item">Go to Artist</li></Link>
      </>
      :
      context === 'artists' ?
        <Link to={`/albums/${albumId}`}><li className="dropdown-item">Go to album</li></Link>
        :
        context === 'albums' &&
        <Link to={`/artists/${artistId}`}><li className="dropdown-item">Go to Artist</li></Link>
    }
  </>);
}

