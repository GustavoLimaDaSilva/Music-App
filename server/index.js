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



app.get('/preview/:song/:artist', async (req, res) => {

  const song = req.params.song
  const artist = req.params.artist

  try {

    const response = await fetch(`https://api.deezer.com/search?q=${song}%20${artist}&order=RANKING&limit=1`)

    const data = await response.json()
    res.json(data);

  } catch (error) {

    console.error("Couldn't query items: ", error)
  }

})


app.listen(3000, () => {
  console.log('Server is running on port 3000');
})