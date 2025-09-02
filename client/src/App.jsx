import './App.css'
import { getQueryParams } from '../index.js';
import { useLocation } from 'react-router';
import { useState, useEffect, createContext, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router';
import Navbar from './components/navbar'
import Header from './components/header.jsx';
import PlayerProvider from './playerProvider.jsx';
import PlayBar from './components/playerBar.jsx';
import { AuthContext } from './authProvider.jsx';

export const AccountContext = createContext(null)


function App() {

  const navigate = useNavigate()
  const location = useLocation()
  const [userInput, setUserInput] = useState('')
  const [isPremium, setIsPremium] = useState(null)
  const query = getQueryParams()
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
      <AccountContext.Provider value={{ isPremium, setIsPremium }}>
        <Header userInput={userInput} setUserInput={setUserInput} />
        <PlayerProvider>
          <main className="main-wrapper">
            <Navbar />
            <Outlet context={userInput} />
          </main>
          <PlayBar />
        </PlayerProvider>
      </AccountContext.Provider>
    </>
  )
}

export default App
