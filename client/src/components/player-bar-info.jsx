import ProgressBar from "./progressBar";

export default function PlayerBarInfo({currentTrack}) { 

    return(
        <div className="play-bar-info glass">
                        <img src={currentTrack?.album?.images?.[0].url || currentTrack?.albumImage} alt="hi" className="player-img" />
                        <div>
                        <p>{currentTrack?.name}</p>
                        <p>{currentTrack?.artists?.[0]?.name}</p>
                        </div>
                        
                    </div>
    )
}