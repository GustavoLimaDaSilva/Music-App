
import Item from "../item/Item"

export default function ContentList({ tracks, context }) {

    return (
        
        <ul className="track-list">
            {tracks.length === 0 ? 'loading' : tracks.map(item => {
                
                if (item === undefined) return
                

                return <Item key={item.id} item={ item} context={context} />
            })}
        </ul>
    )

}