async function sha256(plain) {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)

    return window.crypto.subtle.digest('SHA-256', data)
}

const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}



export async function logIn() {


    window.location = 'http://localhost:3000/auth/login'

}



export async function getToken() {

    const query = getQueryParams()

    if (query.code) {
        const response = await fetch(`api/auth/getToken/${query.code}/${query.state}`)
        return await response.json()
    }
}

export async function refreshAccessToken() {

    let accessToken = null

    try {

        accessToken = await fetch('/api/auth/refreshToken', {
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


function toLoginPage(navigate, refreshTokenTimer) {

    navigate('/Login')
    localStorage.clear()
    clearInterval(refreshTokenTimer)
}


async function handleLogIn(navigate, refreshTokenTimer) {

    const tokensStored = await handleTokensStorage()

    if (!tokensStored) return

    refreshTokenTimer = setInterval(async () => await refreshAccessToken(), 3500000)

    navigate('/Home')
    window.history.replaceState(null, "", window.location.pathname)
}


export async function logInSpotify() {

    const code_verifier = generateRandomString(64)
    window.localStorage.setItem('codeVerifier', code_verifier)
    const hashed = await sha256(code_verifier)
    const codeChallenge = base64encode(hashed)

    const scope = 'streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20user-follow-read'


    const call = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scope}&code_challenge_method=S256&code_challenge=${codeChallenge}&redirect_uri=${redirectUri}`


    window.location.href = call.toString()
}


export async function getTokens() {

    const codeVerifier = localStorage.getItem('codeVerifier')

    if (codeVerifier === null) return


    const code = getQueryParams().code

    if (code === null || code === undefined) return

    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: clientId,
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier,
        }),
    }

    localStorage.removeItem('codeVerifier')

    const body = await fetch(tokenUrl, payload)
    const response = await body.json()


    return {
        access_token: response.access_token,
        refresh_token: response.refresh_token
    }
}

export async function logOut() {

    const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: "include"
    })

    if (res.ok) {

        window.location.reload()
        return true
    }

}

async function handleTokensStorage() {

    let tokens;

    try {

        tokens = await getTokens()

    } catch (err) {

        console.error('token fetching failed because:', err)
    }



    if (tokens !== undefined && tokens !== null) {

        localStorage.setItem('access_token', tokens.access_token)
        localStorage.setItem('refresh_token', tokens.refresh_token)
        return true
    }
}


export async function getProfile(accessToken) {

    const res = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })

    const data = await res.json()

    return data
}

export async function getAllGenres() {


    const res = await fetch('/api/genres')

    const data = await res.json()

    localStorage.setItem('genres', JSON.stringify(data))
}

export async function getUserTopItems(accessToken, type) {

    if (!accessToken) return


    const res = await fetch(`https://api.spotify.com/v1/me/top/${type}`, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })

    const data = await res.json()

    return data
}

export function getQueryParams() {

    const urlQuery = new URLSearchParams(window.location.search)

    return Object.fromEntries(urlQuery.entries())

}

export function deleteQueryString() {

    window.location.search = ''
}

export async function searchItem(item, accessToken) {

    if (item === undefined || item === null || item === '' || !accessToken) return


    const res = await fetch(`https://api.spotify.com/v1/search?q=${item}&type=track,album,artist,playlist`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })

    const data = await res.json()

    const mixedData = [
        ...data.tracks.items,
        ...data.artists.items,
        ...data.albums.items,
        ...data.playlists.items
    ]

    return mixedData
}

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

export async function getContent(type, id, accessToken) {

    if (!accessToken) return

    const res = await fetch(`https://api.spotify.com/v1/${type}/${id}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })

    const data = await res.json()
    data.context = type

    if (type === 'artists') {
        const topTracks = await getTopTracks(id, accessToken)

        data.topTracks = topTracks
    }
    return data
}

export async function getTopTracks(artistId, accessToken) {

    if (!artistId || !accessToken) return

    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })

    const data = await response.json()

    return data.tracks
}

export async function getPlaylists(userId, accessToken) {

    const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {

        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    const playlists = await response.json()

    return playlists.items
}


export async function getPlaylistData(playlistId, accessToken) {

    const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }

    })

    return await res.json()

}

export async function getPreview(songName, artistName) {

    const res = await fetch(`/api/preview/${songName}/${artistName}&order=RANKING&limit=1`)

    const data = await res.json()

    return data.data[0].preview
}

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

    if (res.ok) {

        const data = await res.json()
        return data
    }
}

export async function startTrack(deviceId, accessToken, track) {

    if (!deviceId || !accessToken || !track) return

    const req = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {

        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "uris": [track.uri]
        })
    })
}


export async function pause(accessToken, track) {

    if (!accessToken || !track) return


    await fetch("https://api.spotify.com/v1/me/player/pause", {
        method: "PUT",
        headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "uris": [track.uri]
        })
    });
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

    const response = await fetch("https://api.spotify.com/v1/me/player/play", options);

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        console.error("Spotify API error:", response.status, error);
    }

}

export function setTrackTimer(trackDuration, queue, setQueue) {



    const previousPercentage = parseInt(getComputedStyle(document.querySelector('.progress-bar')).getPropertyValue('--progress-width'))

    let durationInSecs = convertToSecs(trackDuration)

    let progress = previousPercentage > 0 ? (previousPercentage * durationInSecs / 100) : 0

    const timer = setInterval(() => {

        if (progress >= durationInSecs) {


            clearInterval(timer)
            setQueue({ list: [...queue.list], offset: queue.offset + 1 })
        }
        progress += 1

        const percentage = (progress / durationInSecs) * 100
        updateProgressBar(percentage, durationInSecs)
    }, 1000)
    return timer
}

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
    
    if (response.ok) {
        const data = await response.json()
        return data[0]
    }
}

export async function handleSaving(isSaved, accessToken, ids, type) {

    if (!accessToken) return

    const response = await fetch(`https://api.spotify.com/v1/me/${type === 'artist' ? 'following' : 'albums'}?${type === 'artist' ? 'type=artist&' : ''}ids=${ids}`, {
        method: isSaved ? 'DELETE' : 'PUT',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: ids }),
    });
}

export async function saveToLibrary() {


}