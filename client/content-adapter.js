

export default function contentAdapter(objApi) {

    if (!objApi) return
    return {    
        img:  objApi.images?.[0].url || objApi.album?.images?.[0].url,
        name: objApi.name || objApi.title,
        type: objApi.type,
        artist: objApi.owner|| objApi.artists?.[0],
        album: objApi.album,
        duration_ms: objApi.duration_ms,
        id: objApi.album?.id || objApi.artists?.[0].id || objApi.id,
        listenersAmount: objApi.followers?.total ?? undefined,
        releaseDate: objApi.release_date,
        songsLength: objApi.total_tracks || undefined,
        tracks: objApi?.tracks?.data || objApi.topTracks || objApi.tracks?.items,
        preview: objApi.preview || undefined,
        uri: objApi.uri,
        context: objApi.context
        }
    }

