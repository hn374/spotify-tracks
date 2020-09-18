const express = require('express');
const app = express();
const axios = require('axios');
const port = 3001;
var cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
})

// Authenticate spotify
app.get('/authSpotify', (req, res) => {
    console.log("THIS IS THE CLIENT ID", req.query.client_id);
    var getUrl = 'https://accounts.spotify.com/authorize?client_id=' + req.query.client_id + '&response_type=code&redirect_uri=https://localhost:3000';

    axios.get(getUrl)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    })

    // return res.status(200).json();
})

app.listen(port, () => {
    console.log("Server is running on port:", port);
})