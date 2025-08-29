import PlayerButton from "./player-button"
import SkipNext from "./skipNext"
import SkipPrevious from "./skipPrevious"
import ShuffleButton from "./shuffleButton"

export default function PlayerActionsBar({isFullScreen, isMobile}) {
   
    return (
        <div className="player-actions-bar">
            {isFullScreen ? <div>
                <SkipPrevious />
                <PlayerButton />
                <SkipNext />
            </div>
                :
                <>
                    {!isMobile && <SkipPrevious />}
                    <PlayerButton />
                    {!isMobile && <SkipNext />}
                </>
            }
            {isFullScreen && <ShuffleButton />}
        </div>
    )
}
