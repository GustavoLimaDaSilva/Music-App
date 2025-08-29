import { AuthContext } from '../authProvider'
import { logIn } from '../..'
import { useContext } from 'react'
import SearchBar from './searchbar'
import Profile from './profile'

export default function Header({userInput, setUserInput}) {
    
        const { userCredentials } = useContext(AuthContext)

        

    return (<div className="header-wrapper">
        <div className='logo'>
            <h1>logo</h1>
        </div>
        <SearchBar userInput={userInput} setUserInput={setUserInput} />
         <Profile /> 
    </div>);

}