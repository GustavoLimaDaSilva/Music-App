const { ok } = require('assert');
const { stat } = require('fs');


const crypto = require('crypto').webcrypto
const client_id = process.env.CLIENT_ID || '0287a61f15fb4d6dbb7b45b6f2c6d2f3';
const client_secret = process.env.CLIENT_SECRET || '3ca4b058063c406094051454001fba5a';
const redirect_uri = process.env.REDIRECT_URI || 'http://localhost:5173/';
const state = generateRandomString(16)

const router = require('express').Router()


router.get('/login', (req, res) => {

    const scope = 'streaming,user-read-email,user-read-private,user-library-read,user-library-modify,user-read-playback-state,user-modify-playback-state,user-top-read,user-read-currently-playing,user-follow-read,user-follow-modify'

    const auth_query = new URLSearchParams({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
        show_dialog: true
    })

    res.redirect('https://accounts.spotify.com/authorize?' + auth_query.toString());

})

router.post('/getToken/:code/:state', async (req, res) => {

    const code = req.params.code
    const returned_state = req.params.state

    if (returned_state !== state) {

        console.error('state is null')
        res.status(400).json({ error: "URL states don't match" })
    }

    const params = new URLSearchParams({
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
    });

    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
            },
            body: params.toString()
        });

        const data = await response.json();

        if (data !== null && !data.error) {

            res.cookie('refresh_token', data.refresh_token, {
                httpOnly: true,
                secure: true, 
                sameSite: 'none',
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 dias
                path: '/'
            })


            res.json(data.access_token)
        }
    } catch (err) {

        console.err("couldn't fetch tokens: " + err)
    }

})

router.post('/refreshToken', async (req, res) => {
    const refresh_token = req.cookies['refresh_token']
    
    if (!refresh_token) {

        return res.status(401).json({ error: 'No refresh token available' })
    }


    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
        },
        body: new URLSearchParams({

            grant_type: 'refresh_token',
            refresh_token: refresh_token,
        })
    })

    const data = await response.json()

    res.json(data.access_token)
})


router.post('/logout', (req, res) => {

  

    res.clearCookie('refresh_token', {
        httpOnly: true,
        secure: true, 
        sameSite: 'none',
        path: '/'
    })

    res.json({ok: true, message: 'Logged out successfully'})
})


module.exports = router


function generateRandomString(length) {

    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));

    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}