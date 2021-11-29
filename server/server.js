const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
app.use(cors())
app.use(bodyParser.json());

app.post('/refresh', function(req, res){
    const refreshToken = req.body.refreshToken
    console.log("hi")
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: '2d175be9e08044d694f947197c5a1c9f',
        clientSecret: '9208817a787347b586cd0e59498cb2a1',
        refreshToken
    })

    spotifyApi
    .refreshAccessToken()
    .then(data => {
        res.json({
            accessToken: data.body.accessToken,
            expiresIn: data.body.expiresIn,
        })
    })
    .catch((err) => {
        console.log(err)
        res.sendStatus(400)
    })
});

app.post('/login', (req, res) => {
    const code = req.body.code;
    console.log(code)
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: '2d175be9e08044d694f947197c5a1c9f',
        clientSecret: '9208817a787347b586cd0e59498cb2a1'
    })
    spotifyApi
        .authorizationCodeGrant(code)
        .then(data => {
            console.log(data)
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch((err) => {
        console.log(err)
        res.sendStatus(400)
    })
})


app.listen(3001)