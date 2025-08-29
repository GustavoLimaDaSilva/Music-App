import AlbumInfo from "./album-info"
import ContentActions from "./content-actions"
export default function ContentPresentation({ headerContent }) {


    return (
        <div className="content-header glass">
            <div className="content-header-info">
            <img src={headerContent.images[0].url} alt={`${headerContent.name}'s image`} className={headerContent.type === 'album' ? 'header-album' : 'header-artist'} />

            {headerContent.type === 'album' ?
                <AlbumInfo info={headerContent} />
                :
                <div>
                    <h1 className="h1-info">{headerContent.name}</h1>
                    {headerContent.type === 'playlist' &&
                        <p>{headerContent.owner.display_name}</p>
                    }
                    {headerContent.type === 'artist' &&
                        <p className="info">{headerContent.followers.total.toLocaleString()} monthly listeners</p>
                    }
                </div>
            }
            </div>
            <ContentActions content={headerContent}/>
        </div>
    )
}