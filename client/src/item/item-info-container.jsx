import { useContext, useEffect, useRef, useState } from 'react';
import { PlayerContext } from '../playerProvider';
import { AuthContext } from '../authProvider';
import useStream from '../hooks/useStream';
import usePreview from '../hooks/usePreview';

export default function ItemInfoContainer({ item, context, isActive, onClick }) {

    const audioRef = useRef(null)
    const { userCredentials } = useContext(AuthContext)
    const [ToStream, setToStream] = useStream()
    const [preview, setPreview] = usePreview(audioRef, isActive, item)

    return (
        <div className="item-info-container" data-track-id={item.id} onClick={item.type === 'track' ? async () => {

            userCredentials.userInfo?.product !== 'premium' ? onClick() : setToStream([item])
        } : null}>
            <audio ref={audioRef} />
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

