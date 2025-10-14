import { useState } from "react";
import Item from "../item/Item"
import useActivateTrack from "../hooks/useActivateTrack";

export default function ContentList({ tracks, context }) {


const {activeTrackId, toggleTrack} = useActivateTrack()

    return (

        <ul className="track-list">
            {tracks.length === 0 ? 'loading' : tracks.map(item => {

                if (item === undefined) return


                return <Item key={item.id} item={item} context={context} isActive={activeTrackId === item.id}
                    onClick={() => toggleTrack(item.id)} />
            })}
        </ul>
    )

}