const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'
import { FaSpotify } from 'react-icons/fa';

export default function Login() {


    return (
        <div className="glass login-wrapper">
            <h1>Welcome</h1>
            <p>Connect with Spotify to get started.</p>
            <a className="btn" href={`${apiUrl}/auth/login`}>Connect
              <FaSpotify/>
            </a>
            <small>Spotify limits full playback to Premium users — we wish it were up to us.</small>
        </div>
    )
}