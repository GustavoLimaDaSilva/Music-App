import ProgressBar from "./progressBar";

export default function PlayerBarInfo({currentTrack}) { 


    return(
        <div className="play-bar-info">
                        <img src={currentTrack?.album?.images?.[0].url || currentTrack?.albumImage} alt={`${currentTrack?.name}s cover`} className="player-img" />
                        <div>
                        <h2>{currentTrack?.name}</h2>
                        <h3>{currentTrack?.artists?.[0]?.name}</h3>
                        </div>
                        
                    </div>
    )
}