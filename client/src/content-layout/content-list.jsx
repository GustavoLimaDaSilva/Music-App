
import Item from "../item/Item"

export default function ContentList({ tracks, context,image }) {

    return (
        
        <ul className="track-list glass">
            {tracks.length === 0 ? 'loading' : tracks.map(item => {
                
                if (item === undefined) return
                

                return <Item key={item.id} item={context === 'playlists' ?item.track :
                    context === 'albums' ? {...item, albumImage: image} : item} context={context} />
            })}
        </ul>
    )

}