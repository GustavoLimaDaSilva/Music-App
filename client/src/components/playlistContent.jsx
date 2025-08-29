import { useEffect, useContext, useState } from "react"
import { AuthContext } from '../authProvider'
import { useLocation } from "react-router"
import { getPlaylistData } from "../.."
import ContentPresentation from "../content-layout/content-presentation"
import ContentActions from "../content-layout/content-actions"
import ContentList from "../content-layout/content-list"
import LoaderState from "./loaderState"

export default function PlaylistContent() {

    const location = useLocation()
    const { accessToken } = useContext(AuthContext).userCredentials
    const [playlistData, setPlaylistData] = useState(undefined)

    useEffect(() => {

        async function fetchPlaylistContent() {
            const id = location.pathname.split('/')[2]

            const playlistTracks = await getPlaylistData(id, accessToken)
            setPlaylistData(playlistTracks)
        }
        fetchPlaylistContent()
    }, [])


    
    return (
        playlistData === undefined ? <LoaderState />  :
            <div className="content-layout-root">
                <ContentPresentation headerContent={playlistData} />
                <ContentActions type={playlistData.type} />
                <ContentList tracks={playlistData.tracks.items} />
            </div>
    )
}