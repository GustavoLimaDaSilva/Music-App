const auth = require('./auth.js')
const fs = require('fs')
const app = require('express')();
const cors = require('cors')
const cookieParser = require('cookie-parser')

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(cookieParser())

app.use('/auth', auth)



app.get('/genres', async (req, res) => {

  try {

    const response = await fetch('https://api.deezer.com/genre')

    const data = await response.json()

    res.json(data.data)
  } catch (error) {

    console.error("Couldn't fetch genres: ", error)
  }
})

app.get('/genre/:id', async (req, res) => {

  const genreId = req.params.id;


  try {

    const response = await fetch(`https://api.deezer.com/chart/${genreId}`)

    const data = await response.json()

    res.json(data);

  } catch (error) {

    console.error("Couldn't fetch genre tracks: ", error)
  }

})

app.get('/preview/:song/:artist', async (req, res) => {

  const song = req.params.song
  const artist = req.params.artist

  try {

    const response = await fetch(`https://api.deezer.com/search?q=${song}%20${artist})`)

    const data = await response.json()
    res.json(data);

  } catch (error) {

    console.error("Couldn't query items: ", error)
  }

})

app.get('/:type/:id', async (req, res) => {

  const { type, id } = req.params;

  try {

    const response = await fetch(`https://api.deezer.com/${type}/${id}`)

    const data = await response.json()

    res.json(data);

  } catch (error) {

    console.error("Couldn't fetch content: ", error)
  }

})

app.get('/artist/top-tracks/:id', async (req, res) => {

  const id = req.params.id

  try {

    response = await fetch(`https://api.deezer.com/artist/${id}/top?limit=10`)

    const data = await response.json()

    res.json(data.data)

  } catch (error) {

    console.error("couldn't fetch top tracks for artist: ", error)
  }
})




app.get('/AllPlaylists', async (req, res) => {

  try {

    const access_token = JSON.parse(fs.readFileSync('tokens.json')).access_token

    const response = await fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {
        'Authorization': 'Bearer ' + access_token
      }
    })

    const data = await response.json()

    res.json(data)

  } catch (error) {

    console.error("Couldn't fetch playlists: ", error)
  }
})

app.get('/playlists/:id', async (req, res) => {

  try {

    const access_token = JSON.parse(fs.readFileSync('tokens.json')).access_token

    const playlistId = req.params.id

    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      headers: {
        'Authorization': 'Bearer ' + access_token
      }
    })

    const data = await response.json()

    res.json(data)
  } catch (error) {

    console.error("Couldn't fetch playlist: ", error)
  }
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
})