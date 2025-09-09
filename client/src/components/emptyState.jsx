export default function EmptyState({itemsType}) {

    return (
        <div className="this-is-empty">
            <p>No {itemsType} here yet! Explore around and come back later.</p>
            <div className="img-wrapper">
            <span className="helper"></span>
            <img src="images-index\empty-box-3d.png"/>
            </div>
        </div>
    )
}