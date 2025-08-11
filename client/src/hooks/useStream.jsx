import { useState, useEffect, useContext, useMemo } from "react";
import { PlayerContext } from '../playerProvider';
import { AuthContext } from '../authProvider';
import { getTopTracks } from "../..";

export default function useStream(track = null) {

    const [stream, setToStream] = useState(track)
    const {userCredentials} = useContext(AuthContext)
    const { isReady, deviceID, setIsPlaying, queue, setQueue } = useContext(PlayerContext)

    useEffect(() => {

        async function handleStream() {

            if (deviceID && userCredentials.accessToken && stream) {

                setIsPlaying(true)
                const topTracks = await getTopTracks(stream.artists?.[0].id, userCredentials.accessToken)
                setQueue({ list: [stream, ...topTracks], offset: 0 })
            }

        }
        handleStream()
    }, [stream, isReady, userCredentials.accessToken])

    return [track, setToStream]
}