import ContentPresentation from "./content-presentation";
import ContentActions from "./content-actions";
import ContentList from './content-list';
import contentAdapter from '../../content-adapter';
import { useEffect, useContext, useState } from "react";
import { getContent } from "../..";
import { useLocation, useOutletContext } from "react-router";
import { AuthContext } from '../authProvider'
import Loading from "../components/spinner";
import LoaderState from "../components/loaderState";

export default function ContentLayoutRoot() {

    const location = useLocation()
    const { userCredentials } = useContext(AuthContext)
    const [content, setContent] = useState(undefined)

    useEffect(() => {

        fetchContent(setContent, userCredentials.accessToken)

    }, [userCredentials.accessToken, location.pathname])

    
    return (
        content === undefined ?
            <div className="content-layout-root glass">
                <LoaderState callback={() => fetchContent(setContent, userCredentials.accessToken)}/>
            </div>
            :
            <div className="content-layout-root">
                <ContentPresentation headerContent={content} />
                <ContentList tracks={content.items

                } context={content.context} />
            </div>
    )
}

async function fetchContent(setContent, accessToken) {
    const path = location.pathname.split('/')
    const type = path[1]
    const id = path[2]

    const res = await getContent(type, id, accessToken)

    setContent(res)
}
