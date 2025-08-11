import { logInSpotify } from "../../index.js"
import Button from "./Button"
import { useOutletContext } from "react-router"


export default function LoginPage() {

    


    return (
        <div className='login-container glass'>
            <h1>(Insert cool music player name)</h1>
            <Button txt={'Log In'} event={logInSpotify} />
            <h2>The best place for listening to your favorite songs and artists</h2>
        </div>
    )
}


