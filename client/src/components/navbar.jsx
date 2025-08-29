
import { Link } from "react-router"
import { useContext, useEffect, useState } from "react"
import { getPlaylists } from "../.."

export default function Navbar() {

    const [playlists, setPlaylists] = useState([])

    // useEffect(() => {

    //     async function fetcher() {


    //         const fetchedPlaylists = await getPlaylists()

    //         setPlaylists(fetchedPlaylists)
    //     }

    //     fetcher()
    // }, [])
    return (
        <nav className="nav glass" >
            <Link to={'/Home'}>
                <span className="material-symbols-outlined">
                    home
                </span>
            </Link>
            {/* <a href="">link</a><a href="">link</a><a href="">link</a> */}
            <Link to={'/playlists'}>
                <span className="material-symbols-outlined">
                    library_music
                </span>
            </Link>
            {/* {
                playlists.length === 0 ? <Loading /> : playlists.map((playlist) => {

                    return (
                        <Link to={`/Home/playlists/${playlist.id}`} key={playlist.id}>
                            <img src={playlist.images[0].url} alt={`${playlist.name}'s cover`} className="item-img" />
                        </Link>
                    )
                })
            } */}

        </nav>
    )
}