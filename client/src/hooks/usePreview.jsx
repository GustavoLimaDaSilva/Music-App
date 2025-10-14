import { useEffect, useState } from "react"
import { getPreview } from "../.."
export default function usePreview(audioRef, isActive, track) {
    
    const [preview, setPreview] = useState(null)
    
//     useEffect(() => {
//         if (!track || !audioRef.current || track.type !== 'track') return;

//         if (!preview) {

//           fetchPreview(track, setPreview);
//     }
// }, [track]);

useEffect(() => {

  if (!audioRef.current || track.type !== 'track') return;

  if (isActive) {
    
    if(!preview) fetchPreview(track, setPreview);
      audioRef.current.src = preview; 
      audioRef.current.play();
    
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // opcional reset
    }

  }, [isActive, preview]);

  return [preview, setPreview];
}

async function fetchPreview(track, setPreview) {

  const data = await getPreview(track.name, track.artists[0].name);
  setPreview( data );
}