import { useState, useEffect, createContext } from 'react';
import { getToken, refreshAccessToken, getQueryParams } from '..';

export const AuthContext = createContext(null)

export default function AuthProvider({ children }) {

    const [userCredentials, setUserCredentials] = useState({})
    const [isLogged, setIsLogged] = useState(false)
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {

        if (userCredentials.accessToken) {

            setIsLoading(false)
            setIsLogged(true)
            return
        }
        setIsLoading(true)

        const query = getQueryParams()
        query.code ? logIn(userCredentials, setUserCredentials) : refreshToken(userCredentials, setUserCredentials)

    }, [userCredentials.accessToken])



    return (
        <AuthContext.Provider value={{ userCredentials, setUserCredentials, isLogged, setIsLogged, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}


async function logIn(userCredentials, setUserCredentials) {

    const fetchedToken = await getToken()
    if (fetchedToken) {
        setUserCredentials({ ...userCredentials, accessToken: fetchedToken })
    }
}

async function refreshToken(userCredentials, setUserCredentials) {


    const newToken = await refreshAccessToken()

    if (newToken) {
        setUserCredentials({ ...userCredentials, accessToken: newToken })
    }
}