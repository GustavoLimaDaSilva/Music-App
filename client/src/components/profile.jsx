import { useEffect, useState, useRef, useContext } from "react"
import { getProfile, logOut } from "../.."
import { DropdownList } from "./dropdown-list"
import useActivate from '../hooks/useActivate'
import { AuthContext } from "../authProvider"
import { AccountContext } from "../App"
import { PlayerContext } from "../playerProvider"
import { useNavigate } from "react-router"
export default function Profile() {

    const [user, setUser] = useState(null)
    const userRef = useRef(null)
    const [isActive, setIsActive] = useActivate(userRef)
    const { userCredentials, setUserCredentials, setIsLogged } = useContext(AuthContext)
    const { setIsPremium } = useContext(AccountContext)
    const navigate = useNavigate()

    useEffect(() => {

        async function fetchMe() {

            if (userCredentials.userInfo) return

            const profile = await getProfile(userCredentials.accessToken)

            setIsPremium(profile.product === 'premium')
            setUser(profile)
            setUserCredentials({ ...userCredentials, userInfo: profile })
        }

        fetchMe()
    }, [userCredentials.accessToken])

    return (<>
        {user === null ? '' :

            <div className="user relative" ref={userRef} onClick={() => setIsActive(prev => !prev)}>
                {
                    user.images?.length > 0 ?

                        <img src={user.images[0]} alt="user's image" />
                        :
                        <span className="material-symbols-outlined account-icon">
                            account_circle
                        </span>
                }
                <p className={isActive ? 'hidden' : 'name'} >{user.display_name}</p>
                <DropdownList isActive={isActive}>
                    <button className="not-a-button" onClick={() => {

                        if (logOut()) {

                            localStorage.clear()
                            setIsLogged(false)
                            navigate('/Login')
                        }
                    }}>Log out</button>
                </DropdownList>
            </div>
        }
    </>
    )
}