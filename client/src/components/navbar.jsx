
import { Link, NavLink } from "react-router"

export default function Navbar() {


    return (
        <nav className="nav glass" >
            <NavLink to={'/Home'}>
                <span className="material-symbols-outlined">
                    home
                </span>
            </NavLink>
            <NavLink to={'/playlists'}>
                <span className="material-symbols-outlined">
                    library_music
                </span>
            </NavLink>
        </nav>
    )
}