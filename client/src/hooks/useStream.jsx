import { useState, useEffect, useContext, useMemo } from "react";
import { PlayerContext } from '../playerProvider';
import { AuthContext } from '../authProvider';
import { getTopTracks } from "../..";

export default function useToStream(tracks = []) {

    const [toStream, setToStream] = useState(tracks)
    const { userCredentials } = useContext(AuthContext)
    const { isReady, deviceID, setIsPlaying, queue, setQueue, setCurrentTrack } = useContext(PlayerContext)
    useEffect(() => {

        async function handleStream() {

            if (deviceID && userCredentials.accessToken && toStream.length !== 0) {

                setIsPlaying(true)
                setCurrentTrack({...toStream[0]})
                setQueue({ list: toStream, offset: 0 })

                if (toStream.length === 1) {

                    const topTracks = await getTopTracks(toStream[0].artists?.[0].id, userCredentials.accessToken)
                        .then(tracks => tracks.filter(track => track.id !== toStream[0].id))

                    setQueue({ list: [...toStream, ...topTracks], offset: 0 })
                }
            }

        }
        handleStream()
    }, [toStream, isReady, userCredentials.accessToken])

    return [toStream, setToStream]
}