import { useContext, useRef, useState, useEffect } from "react"
import { PlayerContext } from "../playerProvider"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause } from '@fortawesome/free-solid-svg-icons';
import { faShuffle } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function ShuffleButton() {

    const {isShuffle, setIsShuffle} = useContext(PlayerContext)

    return (<button className='not-a-button shuffle-button' onClick={() => {

        setIsShuffle(prev => !prev)
    }}
    >
        {isShuffle ? <FontAwesomeIcon icon={faShuffle} /> : <FontAwesomeIcon icon={faArrowRight} />}
    </button>)
}