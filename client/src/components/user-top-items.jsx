import { useLoaderData } from "react-router"
import Card from "./card";
import { useEffect, useContext, useState, useRef } from "react";
import { getContent } from "../..";
import { useLocation } from "react-router";
import { AuthContext } from '../authProvider'
import { getUserTopItems } from "../..";
import TrackCard from "./trackCard";
import CardContent from "./card-content";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import ScrollArrow from "./scroll-arrow";
import useScroll from "../hooks/useScroll";
import useMobile from "../hooks/useMobile";
import LoaderState from "./loaderState";
import useActivateTrack from "../hooks/useActivateTrack";

export default function UserTopItems({ type, title, setHasContent }) {


    const { userCredentials } = useContext(AuthContext)
    const [topItems, setTopItems] = useState(undefined)
    const containerRef = useRef(null)
    const [scroll, setScroll] = useScroll(containerRef.current)
    const [isMobile, setIsMobile] = useMobile()
    const { activeTrackId, toggleTrack } = useActivateTrack()


    useEffect(() => {

        if (!topItems) fetchTopItems(setTopItems, userCredentials.accessToken, type)
        
        if (topItems?.length === 0) setHasContent(false)
    }, [userCredentials.accessToken, topItems])



    return (
        <>
            <h2 className="content-title">{title}</h2>
            <div className={type === 'tracks' ? "row-elements light-background" : 'row-elements'} ref={containerRef}>
                {!isMobile && scroll != 0 ?
                    <button className="not-a-button" onClick={() => {
                        containerRef.current?.scrollBy({ left: -400, behavior: "smooth" })
                    }}>
                        <FontAwesomeIcon icon={faAngleLeft} className='scroll-arrow' />
                    </button>
                    : null
                }
                {topItems === undefined ?
                    <LoaderState callback={() => fetchTopItems(setTopItems, userCredentials.accessToken, type)} />
                    :
                    topItems.map(item => {

                        return <div key={item.id} className="card">
                            {type === 'tracks' ? <TrackCard item={item} isActive={activeTrackId === item.id}
                                onClick={() => toggleTrack(item.id)} />
                                : <CardContent name={item.name} imageUrl={item.images[0].url} followers={item.followers.total} type={item.type} id={item.id} />}
                        </div>
                    }
                    )}
                {!isMobile && (containerRef.current?.clientWidth + scroll < containerRef.current?.scrollWidth || scroll === 0) ?
                    <button className="not-a-button  right-arrow" onClick={() => {
                        containerRef.current?.scrollBy({ left: 400, behavior: "smooth" })
                    }}>
                        <FontAwesomeIcon icon={faAngleRight} className='scroll-arrow' />
                    </button>
                    : null
                }
            </div >
        </>
    )
}

async function fetchTopItems(setTopItems, accessToken, type) {

    const res = await getUserTopItems(accessToken, type)
    setTopItems(res?.items)
}