import { useEffect, useState, useRef, useContext } from "react"
import { getProfile, logOut } from "../.."
import { DropdownList } from "./dropdown-list"
import useActivate from '../hooks/useActivate'
import { AuthContext } from "../authProvider"
import { useNavigate } from "react-router"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

export default function Profile() {

    const [user, setUser] = useState(null)
    const userRef = useRef(null)
    const [isActive, setIsActive] = useActivate(userRef)
    const { userCredentials, setUserCredentials, setIsLogged } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {

        async function fetchMe() {

            if (userCredentials.userInfo) return

            const profile = await getProfile(userCredentials.accessToken)

            setUser(profile)
            setUserCredentials({ ...userCredentials, userInfo: profile })
        }

        fetchMe()
    }, [userCredentials.accessToken])

    return (<>
        {!user ? '' :

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
                    }}><FontAwesomeIcon icon={faRightFromBracket}/>Log out</button>
                </DropdownList>
            </div>
        }
    </>
    )
}