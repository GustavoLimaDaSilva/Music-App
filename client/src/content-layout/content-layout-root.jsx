import ContentPresentation from "./content-presentation";
import ContentList from './content-list';
import { useEffect, useContext, useState } from "react";
import { getContent } from "../..";
import { useLocation} from "react-router";
import { AuthContext } from '../authProvider'
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

    if (!accessToken) return

    const path = location.pathname.split('/')
    const type = path[1]
    const id = path[2]

    const res = await getContent(type, id, accessToken)

    setContent(res)
}
