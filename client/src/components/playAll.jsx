
import { AuthContext } from "../authProvider";
import { AppContext } from "../App";
import { useContext } from "react";
import useToStream from "../hooks/useStream";
export default function ContentButton({ tracks }) {

  const { toStream, setToStream } = useToStream()
  const { userCredentials } = useContext(AuthContext)
  const { setToastProps } = useContext(AppContext)

return (<>
    <button className="content-actions-btn" onClick={() => {

      userCredentials.userInfo?.product !== 'premium' ? setToastProps({text: "This action requires a premium account."}) : setToStream([tracks])

    }}>{toStream?.[4].id === tracks[4].id ? 'Playing' : 'Play All'}</button>
  </>
  )
}

