import { totalDuration } from "../.."

export default function AlbumInfo({ info }) {

console.log(info)
    return (

        <div>
            <p >{info.type}</p>
            <h1 className="h1-info">{info.name}</h1>
            <p className="info inline">{info.artists[0].name}</p>
            <p className="info inline">{info.release_date.slice(0,4)}</p>
            <p className="info inline">{info.items.length} songs, {totalDuration(info.items)}</p>
        </div>
    )

}