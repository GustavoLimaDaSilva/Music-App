import { useEffect, useContext, useState } from "react";
import { getPlaylists } from "../..";
import { AuthContext } from "../authProvider";
import Card from "./card";
import CardContent from "./card-content";
import LoaderState from "./loaderState";
import EmptyState from "./emptyState";

export function Playlists() {

    const { userCredentials } = useContext(AuthContext)
    const [playlists, setPlaylists] = useState(null)

    useEffect(() => {


       if(!playlists) fetchPlaylists(playlists, setPlaylists, userCredentials)
    }, [userCredentials])

    return (
        <div className="content-wrapper glass">
            {!playlists ?
                <LoaderState callback={() => fetchPlaylists(playlists, setPlaylists, userCredentials)} />
                :
                playlists.length > 0 ?
                    playlists.map(playlist => {

                        return <Card key={playlist.id} id={playlist.id} type={playlist.type}>
                            <CardContent name={playlist.name} imageUrl={playlist.images[0].url} type={playlist.type} artistName={playlist.owner.display_name} id={playlist.id} />
                        </Card>
                    })
                    :
                    <EmptyState itemsType='playlists'/>
            }
        </div>


    )
}
async function fetchPlaylists(playlists, setPlaylists, userCredentials) {

 
    
    const items = await getPlaylists(userCredentials.userInfo.id,
        userCredentials.accessToken)
        
    setPlaylists([...items])
}