export default function AlbumInfo({ info }) {


    return (

        <div>
            <p >{info.type}</p>
            <h1 className="h1-info">{info.name}</h1>
            <p className="info inline">{info.artists[0].name}</p>
            <p className="info inline">{info.release_date}</p>
            <p className="info inline">{info.songsLength}, {info.albumDuration}</p>
        </div>
    )

}