
import { Link, NavLink } from "react-router"

export default function Navbar() {


    return (
        <nav className="nav glass" >
            <NavLink to={'/Home'} className={({isActive}) => isActive ? "navlink active" : "navlink"}>
                <span className="material-symbols-outlined">
                    home
                </span>
            </NavLink>
            <NavLink to={'/playlists'} className={({isActive}) => isActive ? "navlink active" : "navlink"}>
                <span className="material-symbols-outlined" >
                    library_music
                </span>
            </NavLink>
        </nav>
    )
}