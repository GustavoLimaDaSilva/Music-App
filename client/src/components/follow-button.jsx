import { useContext, useEffect, useState } from "react";
import { handleSaving, isAlreadySaved } from "../..";
import { AuthContext } from "../authProvider";
export default function FollowButton({ id, type }) {

  const [isFollowing, setIsFollowing] = useState(false)
  const { userCredentials } = useContext(AuthContext)

  useEffect(() => {

    async function userFollowArtist() {
      
      if (await isAlreadySaved(id, userCredentials.accessToken, type)) setIsFollowing(true)
    }

    userFollowArtist()
  }, [userCredentials.accessToken])

  return (
    <button className="content-actions-btn" onClick={() => {

      handleSaving(isFollowing, userCredentials.accessToken, [id], type)
      setIsFollowing(prev => !prev)
    }}
    >{isFollowing ? 'Unfollow' : 'Follow'}</button>
  );
}