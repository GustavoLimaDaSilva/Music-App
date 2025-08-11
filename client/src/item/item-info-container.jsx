import useActivate from '../hooks/useActivate';
import { useContext, useEffect, useRef } from 'react';
import { getPreview, getTopTracks, startTrack } from '../..';
import { PlayerContext } from '../playerProvider';
import { AccountContext } from '../App';
import { AuthContext } from '../authProvider';
import useStream from '../hooks/useStream';

export default function ItemInfoContainer({ item, context }) {

    const itemRef = useRef(null)
    const audioRef = useRef(null)
    const previewRef = useRef(null)
    const { isReady, isPlaying } = useContext(PlayerContext)
    const { isPremium } = useContext(AccountContext)
    const { userCredentials } = useContext(AuthContext)
    const [isActive, setIsActive] = useActivate(itemRef)
    const [stream, setToStream] = useStream()

    useEffect(() => {

        async function handleClick() {
            if (isActive) {

                if (isPremium) {

                    const topTracks = await getTopTracks(item.artists?.[0].id, userCredentials.accessToken)
                    setToStream([item, ...topTracks])
                }
                else if (!isPremium) {
                    previewRef.current = await getPreview(item.name, item.artist.name)
                    audioRef.current.play()
                }
            } else {
                if (!isPremium) audioRef.current.pause()
            }
        }

        handleClick()
    }, [isActive, isReady, userCredentials.accessToken, isPlaying])

    return (


        <div className="item-info-container" ref={itemRef} onClick={async () => {

            setIsActive(prev => !prev)
        }}>
            <audio src={previewRef.current} ref={audioRef} />
            <p className="title">{item.name}</p>
            {context !== 'artists' &&
                <p className='info inline-mode'>{
                    item.type === 'artist' ?
                        item.type
                        :
                        item.artists?.[0].name || item.owner?.display_name}
                </p>
            }
        </div >
    )

}

