import './App.css'
import { getQueryParams } from '../index.js';
import { useLocation, useSearchParams } from 'react-router';
import { useState, useEffect, createContext, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router';
import Navbar from './components/navbar'
import Header from './components/header.jsx';
import Toast from './components/Toast.jsx';
import PlayBar from './components/playerBar.jsx';
import { AuthContext } from './authProvider.jsx';
import useStream from "./hooks/useStream";
export const AppContext = createContext(null)
function App() {

  const navigate = useNavigate()
  const location = useLocation()
  const [toStream, setToStream] = useStream()
  const [userInput, setUserInput] = useState('')
  const [toastProps, setToastProps] = useState({})
  const { isLoading, isLogged, userCredentials } = useContext(AuthContext)
  const [searchParams, setSearchParams] = useSearchParams();


  useEffect(() => {

    if (isLoading && location.pathname === '/' && searchParams.get('code')) {
      navigate('/Login')
      return
    } else if (isLoading) {
      return
    }

    if (isLogged && location.pathname === '/' && searchParams.get('code')) {

      navigate('/Home')
    }
    else if (!isLogged || searchParams.get('error') || location.pathname === '/') {

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
        <AppContext.Provider value={{ toStream, setToStream, toastProps, setToastProps }}>
          <Outlet context={userInput} />
          {Object.keys(toastProps).length > 0 &&
            <Toast text={toastProps.text} callback={toastProps.callback} setToastProps={setToastProps} />
          }
        </AppContext.Provider>
      </main>
      <PlayBar />
    </>
  )
}

export default App
