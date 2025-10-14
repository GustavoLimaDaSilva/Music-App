const apiUrl = import.meta?.env?.VITE_API_URL || 'http://localhost:3000'

export const safe = (fn) =>
    async (...args) => {

        try {
            return await fn(...args)
        } catch (err) {

            console.error('failed to fetch:', err)
        }

    }

export async function logIn() {


    window.location = `${apiUrl}/auth/login`

}


export const getToken = safe(async () => {

    const query = getQueryParams()
    if (query.code) {
        const response = await fetch(`${apiUrl}/auth/getToken/${query.code}/${query.state}`, {
            method: 'POST',
            credentials: 'include'
        })
        const data = await response.json()

        if (data.error) {
            throw new Error(data.error)
        }

        return data
    }
})

export async function refreshAccessToken() {

    let accessToken = null

    try {

        accessToken = await fetch(`${apiUrl}/auth/refreshToken`, {
            method: 'POST',
            credentials: 'include'
        })
    } catch (err) {

        console.log("couldn't refresh access token: ", err)

    } finally {

        if (accessToken) {
            const data = await accessToken.json()
            return data
        }
    }
}



export async function logOut() {

    const res = await fetch(`${apiUrl}/auth/logout`, {
        method: 'POST',
        credentials: "include"
    })

    if (res.ok) {

        window.location.reload()
        return true
    }
}


export const getProfile = safe(async (accessToken) => {

    if (!accessToken) return

    const res = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })

    const data = await res.json()
    if (data.error) {
        throw new Error(`${data.error.message} at getProfile`)
    }

    return data
})

export const getUserTopItems = safe(async (accessToken, type) => {

    if (!accessToken) return

    const res = await fetch(`https://api.spotify.com/v1/me/top/${type}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })

    const data = await res.json()

    if (data.error) {
        throw new Error(`${data.error.message} at getUserTopItems`)
    }
    return data
})

export function getQueryParams() {

    const urlQuery = new URLSearchParams(window.location.search)

    return Object.fromEntries(urlQuery.entries())

}

export function deleteQueryString() {

    window.location.search = ''
}

export const searchItem = safe(async (item, accessToken) => {

    if (item === undefined || item === null || item === '' || !accessToken) return


    const res = await fetch(`https://api.spotify.com/v1/search?q=${item}&type=track,album,artist,playlist&limit=5`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })

    const data = await res.json()

    if (data.error) {

        throw new Error(`${data.error.message} at searchItem`)
    }

    const mixedData = [
        ...data.tracks.items,
        ...data.artists.items,
        ...data.albums.items,
        ...data.playlists.items
    ]

    return mixedData
})

export function formatData(items) {


    const arr = Object.entries(items)



    const mixedData = arr.reduce((acc, curr) => {


        return acc.concat(curr[1].items)

    }, [])



    return mixedData.filter(data => data !== null)
}

export function toCaptitalize(str) {

    return str.charAt(0).toUpperCase() + str.slice(1)

}

export const getContent = safe(async (type, id, accessToken) => {


    const res = await fetch(`https://api.spotify.com/v1/${type}/${id}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })



    const data = await res.json()

    if (data.error) {
        throw new Error(`${data.error.message} at getContent`)
    }

    data.context = type


    return normalizeContent(data, type, accessToken)
})

async function normalizeContent(data, type, accessToken) {

    if (type === 'artists') {
        const topTracks = await getTopTracks(data.id, accessToken)

        data.items = topTracks
    }

    if (type === 'albums') {

        data.items = data.tracks.items.map(item => {

            item.albumImage = data.images[0].url


            const newObj = { ...item, ...item.track }
            delete newObj.track

            return newObj
        })
    }

    if (type === 'playlists') {

        data.items = data.tracks.items.map(item => {

            const newObj = { ...item, ...item.track }
            delete newObj.track

            return newObj
        })
    }

    return data
}

export const getTopTracks = safe(async (artistId, accessToken) => {

    if (!artistId || !accessToken) return

    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })

    const data = await response.json()
    if (data.error) {
        throw new Error(`${data.error.message} at getTopTracks`)
    }
    return data.tracks
})

export const getPlaylists = safe(async (userId, accessToken) => {

    const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {

        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    const data = await response.json()

    if (data.error) {
        throw new Error(`${data.error.message} at getPlaylists`)
    }

    return data.items
})


export const getPlaylistData = safe(async (playlistId, accessToken) => {

    if (!accessToken) return

    const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }

    })

    const data = await res.json()

    if (data.error) {
        throw new Error(`${data.error.message} at getPlaylistData`)
    }

    return data
})

export const getPreview = safe(async (songName, artistName) => {

    const res = await fetch(`${apiUrl}/preview/${songName}/${artistName}`)

    const data = await res.json()

    if (data.error) {
        throw new Error(`${data.error.message} at getPreview`)
    }

    return data.data[0].preview
})

export function createNewPlayer(accessToken, setIsReady, setPlayer, setDeviceId) {

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {

        const player = new window.Spotify.Player({
            name: 'Web Playback SDK',
            getOAuthToken: cb => { cb(accessToken); },
            volume: 0.5
        });

        player.addListener('ready', ({ device_id }) => {

            console.log('Ready with Device ID', device_id);
            setDeviceId(device_id)
            setIsReady(true)
        });

        player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });


        player.connect();
        setPlayer(player)
    }
}

export async function deviceAvailable(accessToken) {

    if (!accessToken) return

    const res = await fetch('https://api.spotify.com/v1/me/player/devices', {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })


    const data = await res.json()

    if (data.error) {
        throw new Error(`${data.error.message} at deviceAvailable`)
    }

    return data

}




export async function startTrack(deviceId, accessToken, track) {

    if (!deviceId || !accessToken || !track) return
    const res = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {

        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "uris": [track.uri]
        })
    })

    const data = await res.json()

    if (data.error) {
        throw new Error(`${data.error.message} at startTrack`)
    }
}


export async function pause(accessToken, track) {

    if (!accessToken || !track) return


    const res = await fetch("https://api.spotify.com/v1/me/player/pause", {
        method: "PUT",
        headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "uris": [track.uri]
        })
    });

    // const data = await res.json()

    // if (data.error) {
    //     throw new Error(`${data.error.message} at pause`)
    // }
}

export async function resume(accessToken, position_ms, track) {

    if (!accessToken) return
    const options = {
        method: "PUT",
        headers: {
            Authorization: "Bearer " + accessToken
        }
    };

    if (typeof position_ms === 'number') {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify({
            "uris": [track.uri],
            "position_ms": Math.floor(position_ms)
        });
    }

    const res = await fetch("https://api.spotify.com/v1/me/player/play", options);

    // const data = await res.json()

    // if (data.error) {
    //     throw new Error(`${data.error.message} at resume`)
    // }
}

export function setTrackTimer(track, queue, setQueue, playNext, setPlayNext, setCurrentTrack) {


    const previousPercentage = parseInt(getComputedStyle(document.querySelector('.progress-bar')).getPropertyValue('--progress-width'))

    let durationInSecs = convertToSecs(track.duration_ms)

    let progress = previousPercentage > 0 ? (previousPercentage * durationInSecs / 100) : 0

    const timer = setInterval(() => {

        if (progress >= durationInSecs) {

            clearInterval(timer)
            if (playNext.length > 0) {
                setCurrentTrack(playNext[0]);
                setPlayNext(prev => prev.slice(1));
            } else {
                setQueue({ list: [...queue.list], offset: queue.offset + 1 })
                setCurrentTrack(queue.list[queue.offset + 1])
            }
        }
        progress += 1

        const percentage = (progress / durationInSecs) * 100
        updateProgressBar(percentage, durationInSecs)
    }, 1000)
    return timer
}

// export function playNext(track, queue, setQueue) {

//     const updatedQueue = queue.list.toSpliced(queue.offset + 1, 0, track)

//     setQueue({list: [...updatedQueue], offset: queue.offset})
// }

function updateProgressBar(percentage) {

    if (percentage >= 100) return

    document.querySelector('.progress-bar').style.setProperty('--progress-width', `${percentage}%`)
}

function convertToSecs(miliseconds) {


    return parseInt(parseInt(miliseconds) / 1000)
}

export function seekProgress(progressContainer, clientX, track, accessToken) {

    const containerRects = progressContainer.getBoundingClientRect()

    const clickPosition = clientX - containerRects.left

    const progressInPercent = clickPosition > 0 ? (clickPosition / containerRects.width) * 100 : 0

    const progressInMs = (progressInPercent / 100) * track.duration_ms;

    updateProgressBar(progressInPercent)
    resume(accessToken, progressInMs, track)

}


export async function isAlreadySaved(id, accessToken, type) {

    if (!accessToken) return

    const response = await fetch(`https://api.spotify.com/v1/me/${type === 'artist' ? 'following' : 'albums'}/contains?type=${type}&ids=${encodeURIComponent(id)}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });


    const data = await response.json()

    if (data.error) {
        throw new Error(`${data.error.message} at isAlreadySaved`)
    }

    return data[0]

}

export async function handleSaving(isSaved, accessToken, ids, type) {

    if (!accessToken) return

    const res = await fetch(`https://api.spotify.com/v1/me/${type === 'artist' ? 'following' : 'albums'}?${type === 'artist' ? 'type=artist&' : ''}ids=${ids}`, {
        method: isSaved ? 'DELETE' : 'PUT',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: ids }),
    });

    const data = await res.json()

    if (data.error) {
        throw new Error(`${data.error.message} at handleSaving`)
    }


}


export function randomize(queue) {
    console.log(queue)
    const copy = [...queue.list];
    for (let i = copy.length - 1; i > queue.offset; i--) {
        const min = Math.ceil(queue.offset + 1);
        const j = Math.floor(Math.random() * (i - min) + min)

        if (j) [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy
}

export function totalDuration(tracks) {

    const t = tracks.reduce((acc, curr) => 

        acc += curr.duration_ms

    , 0)
    const inSecs = convertToSecs(t)
    
if (inSecs > 3600) {
    return `1 hour and ${parseInt((inSecs - 3600) / 60)} minutes`
}
return `${parseInt(inSecs / 60)} minutes`
}