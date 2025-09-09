import './App.css'
import { getQueryParams } from '../index.js';
import { useLocation } from 'react-router';
import { useState, useEffect, createContext, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router';
import Navbar from './components/navbar'
import Header from './components/header.jsx';
import GoPremiumToast from './components/goPremiumToast.jsx';
import PlayBar from './components/playerBar.jsx';
import { AuthContext } from './authProvider.jsx';
import useStream from "./hooks/useStream";
export const StreamContext = createContext(null)
function App() {

  const navigate = useNavigate()
  const location = useLocation()
  const [toStream, setToStream] = useStream()
  const [userInput, setUserInput] = useState('')
  const { isLoading, isLogged, userCredentials } = useContext(AuthContext)


  useEffect(() => {

    if (!isLoading) return

    if ((isLogged || location.search) && location.pathname === '/') {

      navigate('/Home')
    }
    else if (!isLogged && location.pathname === '/') {

      navigate('/Login')
    }
  }, [isLogged, isLoading])

  useEffect(() => {

    setUserInput('')
  }, [location.pathname])

  return (
    <>
      <Header userInput={userInput} setUserInput={setUserInput} />
      <main className="main-wrapper">
        <Navbar />
        <StreamContext.Provider value={{ toStream, setToStream }}>
          <Outlet context={userInput} />
          {userCredentials.userInfo?.product !== 'premium' && 
            <GoPremiumToast toStream={toStream}/>
          }
        </StreamContext.Provider>
      </main>
      <PlayBar />
    </>
  )
}

export default App
