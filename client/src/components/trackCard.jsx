import { Link } from "react-router";
import useMobile from "../hooks/useMobile";
import useStream from "../hooks/useStream";


export default function trackCard({ item }) {

    const [isMobile, setIsMobile] = useMobile()
    const [stream, setStream] = useStream()

    return (
        <div onClick={isMobile ? () => setStream(item) : null}>
            <img src={item.album?.images?.[0].url} className={'card-img'} />
            <p className="card-title" onClick={!isMobile ? () => setStream(item): null}>{item.name}</p>
            <p className="card-subtitle">{isMobile ?
                item.artists[0].name
                :
                <Link to={`/artists/${item.artists[0].id}`}>{item.artists[0].name}</Link>
            }</p>
        </div>
    );
}