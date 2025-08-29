import useActivate from '../hooks/useActivate';
import { useContext, useEffect, useRef, useState } from 'react';
import { getPreview, getTopTracks, startTrack } from '../..';
import { PlayerContext } from '../playerProvider';
import { AccountContext } from '../App';
import { AuthContext } from '../authProvider';
import useStream from '../hooks/useStream';

export default function ItemInfoContainer({ item, context }) {

    const itemRef = useRef(null)
    const audioRef = useRef(null)
    const [preview, setPreview] = useState(null)
    const { isReady, isPlaying, setCurrentTrack } = useContext(PlayerContext)
    const { isPremium } = useContext(AccountContext)
    const { userCredentials } = useContext(AuthContext)
    const [isActive, setIsActive] = useActivate(itemRef)
    const [ToStream, setToStream] = useStream()

    useEffect(() => {

        if (preview && isActive) { audioRef.current.play() }
        else if (!isActive) { audioRef.current.pause() }

    }, [preview, isActive])
    
    return (
        <div className="item-info-container" ref={itemRef} onClick={item.type === 'track' ? async () => {

            if (!isPremium) {
                setPreview(await getPreview(item.name, item.artists[0].name))
                setIsActive(prev => !prev)
            } else {
                setToStream([item])
                setCurrentTrack(item)
            }
        } : null}>
            <audio src={preview} ref={audioRef} />
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

