import { Link } from "react-router";
import useMobile from "../hooks/useMobile";
import useStream from "../hooks/useStream";
import { useState, useRef, useContext } from "react";
import usePreview from "../hooks/usePreview";
import { AuthContext } from '../authProvider';

export default function trackCard({ item, onClick, isActive }) {

    const itemRef = useRef(null)
    const audioRef = useRef(null)
    const { userCredentials } = useContext(AuthContext)
    const [isMobile, setIsMobile] = useMobile()
    const [toStream, setToStream] = useStream()
    const [preview, setPreview] = usePreview(audioRef, isActive, item)


    return (
        <div ref={itemRef} onClick={isMobile ? () => {
            handleClick(item, userCredentials, setToStream, onClick)
        } : null}>
            <audio ref={audioRef}></audio>
            <img src={item.album?.images?.[0].url} className={'card-img'} />
            <p className="card-title" onClick={!isMobile ? () => {

                handleClick(item, userCredentials, setToStream, onClick)
            } : null}>{item.name}</p>
            <p className="card-subtitle">{isMobile ?
                item.artists[0].name
                :
                <Link to={`/artists/${item.artists[0].id}`}>{item.artists[0].name}</Link>
            }</p>
        </div>
    );
}

function handleClick(item, userCredentials, setToStream, onClick) {

    userCredentials.userInfo?.product !== 'premium' ? onClick() : setToStream([item])
}