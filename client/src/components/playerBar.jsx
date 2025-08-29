import  PlayerActionsBar  from './PlayerActionsBar';
import ResizeWindow from "./resizeWindow"
import ProgressBar from "./progressBar"
import PlayerBarInfo from "./player-bar-info"
import { useEffect, useContext, useRef, useState } from "react"
import { PlayerContext } from "../playerProvider"
import { deviceAvailable, startTrack } from "../.."
import { AuthContext } from "../authProvider"
import useMobile from '../hooks/useMobile'
import ShuffleButton from "./shuffleButton"
import CollapsePlayer from './collapsePlayer';
import DropdownMenu from './dropdown-menu';
import { DropdownList } from './dropdown-list';
import TrackDropdownOptions from './track-dropdown-options';

export default function PlayBar() {

    const { isPlaying, deviceID, queue, playNext, setPlayNext, currentTrack } = useContext(PlayerContext)
    const { userCredentials } = useContext(AuthContext)
    const playBarRef = useRef(null)
    const [isMobile, setIsMobile] = useMobile()
    const [isFullScreen, setIsFullScreen] = useState(false)

    useEffect(() => {
        if (!currentTrack) return;

        startTrack(deviceID, userCredentials.accessToken, currentTrack);
        localStorage.setItem('currentTrack', JSON.stringify(currentTrack));

    }, [currentTrack, deviceID, userCredentials.accessToken]);


    return (<>
        {currentTrack ?
            <div className={isFullScreen ? 'full-screen player-bar glass' : 'player-bar glass' } ref={playBarRef}>
                    <PlayerActionsBar isFullScreen={isFullScreen} isMobile={isMobile} />
                    <PlayerBarInfo currentTrack={currentTrack} />
                    <div className="player-additional-tools">
                        {isMobile ?
                        isFullScreen ?
                        <>
                        <CollapsePlayer setIsFullScreen={setIsFullScreen}/>
                        <DropdownMenu>
                            <TrackDropdownOptions item={currentTrack}/>
                        </DropdownMenu>
                        </>
                        :
                        <ResizeWindow setIsFullScreen={setIsFullScreen} /> 
                        : 
                        <ShuffleButton />}
                </div>
                <ProgressBar track={currentTrack} />
            </div> : null
        }
    </>)

}