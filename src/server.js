const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
    res.send('Hello World');
})

// Authenticate spotify
app.get('/authSpotify', (req, res) => {
    var getUrl = 'https://accounts.spotify.com/authorize?client_id=' + req.CLIENT_ID + '&response_type=code&redirect_uri=https://localhost:3000';

    fetch(getUrl, {
      method: 'get', 
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
})

app.listen(port, () => {
    console.log("Server is running on port:", port);
})