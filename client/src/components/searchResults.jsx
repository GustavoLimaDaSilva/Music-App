import { searchItem, formatData } from '../../index.js';
import LoaderState from "../components/loaderState";
import { useOutletContext } from 'react-router'
import { useState, useEffect, useContext } from 'react';
import Item from '../item/Item.jsx';
import { AuthContext } from '../authProvider.jsx';
import useActivateTrack from '../hooks/useActivateTrack.jsx';

export default function SearchResults() {

    const userInput = useOutletContext()
    const [searchedItems, setSearchedItems] = useState(undefined)
    const { userCredentials } = useContext(AuthContext)
    const { activeTrackId, toggleTrack } = useActivateTrack()

    useEffect(() => {


        fetchData(userInput, userCredentials.accessToken, setSearchedItems)

    }, [userInput, userCredentials.accessToken])

    return <div className='track-list'>
        {searchedItems === undefined ? <div className="content-layout-root glass">
            <LoaderState callback={() => fetchData(userInput, userCredentials.accessToken, setSearchedItems)} />
        </div> : searchedItems.map(item => {

            if (item === null || item?.images?.length === 0) return

            return <Item key={item.id} item={item}
             onClick={item.type === 'track' ? () => toggleTrack(item.id) : null} 
            isActive={item.type === 'track' && activeTrackId === item.id}/>
        })}
    </div>;
}

async function fetchData(userInput, accessToken, setSearchedItems) {
    const response = await searchItem(userInput, accessToken)

    setSearchedItems(response)
}