import PlayAll from "../components/playAll"
import SaveToLibrary from "../components/save-to-library"
import FollowButton from "../components/follow-button"

export default function ContentActions({ content }) {

    return (
        <div className="actions-bar">
            <PlayAll  tracks={content.tracks.items} />
            {content.type === 'artist' ? <FollowButton id={content.id} type={content.type} />
                :
                <SaveToLibrary id={content.id} type={content.type} />
            }
        </div>
    )
}
{/*share state setters with those components, either by context or using custom hooks */ }