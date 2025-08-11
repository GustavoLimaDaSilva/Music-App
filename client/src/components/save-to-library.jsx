import { useContext, useEffect, useState } from "react";
import { handleSaving, isAlreadySaved } from "../..";
import { AuthContext } from "../authProvider";

export default function SaveToLibrary({ id, type }) {

  const [isSaved, setIsSaved] = useState(false)
  const { userCredentials } = useContext(AuthContext)

  useEffect(() => {

    async function isAlbumSaved() {

      if (await isAlreadySaved(id, userCredentials.accessToken, type)) setIsSaved(true)
    }

    isAlbumSaved()
  }, [userCredentials.accessToken])

  return (
    <button className="content-actions-btn" onClick={() => {
      handleSaving(isSaved, userCredentials.accessToken, id, type)
      setIsSaved(prev => !prev)
    }}>{isSaved ? 'Remove from library' : 'Add to library'}</button>

  );
}