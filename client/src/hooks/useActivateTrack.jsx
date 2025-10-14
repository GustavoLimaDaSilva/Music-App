import { useState } from "react";

export default function useActivateTrack() {

    const [activeTrackId, setActiveTrackId] = useState(null);

    const toggleTrack = (trackId) => {
        setActiveTrackId(prev =>
            prev === trackId ? null : trackId 
        );
    };

    return {activeTrackId, toggleTrack};
}