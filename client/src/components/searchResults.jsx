import { searchItem, formatData } from '../../index.js';
import LoaderState from "../components/loaderState";
import { useOutletContext } from 'react-router'
import { useState, useEffect, useContext } from 'react';
import ItemRoot from '../item/Item';
import { AuthContext } from '../authProvider.jsx';

export default function SearchResults() {

    const userInput = useOutletContext()
    const [searchedItems, setSearchedItems] = useState(undefined)
    const { userCredentials } = useContext(AuthContext)

    useEffect(() => {


        fetchData(userInput, userCredentials.accessToken, setSearchedItems)

    }, [userInput, userCredentials.accessToken])

    return <div className='track-list'>
        {searchedItems === undefined ? <div className="content-layout-root glass">
            <LoaderState callback={() => fetchData(userInput, userCredentials.accessToken, setSearchedItems)} />
        </div> : searchedItems.map(item => {

            if (item === null || item?.images?.length === 0) return


            return <ItemRoot key={item.id} item={item} />
        })}
    </div>;
}

async function fetchData(userInput, accessToken, setSearchedItems) {
    const response = await searchItem(userInput, accessToken)

    setSearchedItems(response)
}