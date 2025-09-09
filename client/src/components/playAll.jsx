
import { AuthContext } from "../authProvider";
import { StreamContext } from "../App";
import { useContext } from "react";
export default function ContentButton({ tracks }) {

  const {toStream, setToStream} = useContext(StreamContext)
  const { userCredentials } = useContext(AuthContext)
  return (<>
    <button className="content-actions-btn" onClick={() => {

      setToStream(tracks)

    }}>Play All</button>
  </>
  )
}

