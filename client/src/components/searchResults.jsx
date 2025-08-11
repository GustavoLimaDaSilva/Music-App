import { searchItem, formatData } from '../../index.js';
import Loading from './loading';
import {useOutletContext} from 'react-router'
import { useState, useEffect, useContext} from 'react';
import ItemRoot from '../item/Item';
import { AuthContext } from '../authProvider.jsx';
import contentAdapter from '../../content-adapter.js';

export default function SearchResults() {

    const userInput = useOutletContext()
    const [searchedItems, setSearchedItems] = useState(undefined)
    const { userCredentials } = useContext(AuthContext)

    useEffect(() => {

        async function fetchData() {
            const response = await searchItem(userInput, userCredentials.accessToken)
            
            setSearchedItems(response)
        }
        fetchData()
    }, [userInput])
    
    return <div className='track-list'>
        {searchedItems === undefined ? <Loading /> : searchedItems.map(item => {
            
            if (item === null || item?.images?.length === 0) return

            
            return <ItemRoot key={item.id} item={item}/>
        })}
    </div>;
}