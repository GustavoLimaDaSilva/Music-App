import ContentPresentation from "./content-presentation";
import ContentActions from "./content-actions";
import ContentList from './content-list';
import contentAdapter from '../../content-adapter';
import { useEffect, useContext, useState } from "react";
import { getContent } from "../..";
import { useLocation, useOutletContext } from "react-router";
import { AuthContext } from '../authProvider'
import Loading from "../components/loading";

export default function ContentLayoutRoot() {

    const location = useLocation()
    const { userCredentials } = useContext(AuthContext)
    const [content, setContent] = useState(undefined)

    useEffect(() => {

        async function fetchContent() {
            const path = location.pathname.split('/')
            const type = path[1]
            const id = path[2]

            const res = await getContent(type, id, userCredentials.accessToken)

            if (res) setContent({...res, context: type})
        }

        fetchContent()

    }, [userCredentials.accessToken])

    return (
        content === undefined ? <Loading /> :
            <div className="content-layout-root">
                <ContentPresentation headerContent={content} />
                <ContentList tracks={content.context === 'albums' ?  content.tracks.items : content.topTracks} context={content.context} image={content.images?.[0].url}/>
            </div>
    )
}