
import { Link } from "react-router"

export default function Navbar() {


    return (
        <nav className="nav glass" >
            <Link to={'/Home'}>
                <span className="material-symbols-outlined">
                    home
                </span>
            </Link>
            <Link to={'/playlists'}>
                <span className="material-symbols-outlined">
                    library_music
                </span>
            </Link>
        </nav>
    )
}