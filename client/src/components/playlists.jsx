import { useEffect, useContext, useState } from "react";
import { getPlaylists } from "../..";
import { AuthContext } from "../authProvider";
import Card from "./card";
import Loading from "./loading";
import CardContent from "./card-content";

export function Playlists() {

    const { userCredentials } = useContext(AuthContext)
    const [playlists, setPlaylists] = useState([])
    useEffect(() => {

        async function fetchPlaylists() {

            const storedPlaylists = JSON.parse(localStorage.getItem('playlists'))

            if (storedPlaylists) {

                return setPlaylists(storedPlaylists)
            }

            const items = await getPlaylists(userCredentials.userInfo.id,
                userCredentials.accessToken)

            setPlaylists([...playlists, items[0]])
            localStorage.setItem('playlists', JSON.stringify(items))
        }

        fetchPlaylists()
    }, [])

    return (
        <div className="content-wrapper glass">
            {playlists.length === 0 ?
                <Loading />
                :
                playlists.map(playlist => {

                    return <Card key={playlist.id} id={playlist.id} type={playlist.type}>
                        <CardContent  name={playlist.name} imageUrl={playlist.images[0].url} type={playlist.type} artistName={playlist.owner.display_name} id={playlist.id}/>
                    </Card>
                }
                )}
        </div>


    )
}