import SearchBar from './searchbar'
import Profile from './profile'

export default function Header({userInput, setUserInput}) {
            

    return (<div className="header-wrapper">
        <div className='logo'>
            <h1>Asahi</h1>
        </div>
        <SearchBar userInput={userInput} setUserInput={setUserInput} />
         <Profile /> 
    </div>);

}