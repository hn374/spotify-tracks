import React, { useState, useEffect } from 'react';
import './App.css';
import 'rsuite/dist/styles/rsuite-default.css';
import { Input, Grid, Col, Row, IconButton, Icon } from 'rsuite';
import  config  from './config.js';

function App() {
  const [artistName, setArtistName] = useState('');
  const [popularTracks, setPopularTracks] = useState([]);

  useEffect(() => {
    document.title = "Spotify Tracks";
  }, [])

  function getArtistPopularTracks(artist) {
    var getUrl = 'https://api.spotify.com/v1/search?q=' + artist + '&type=artist&market=US&limit=10&offset=5'

    fetch(getUrl, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + config.ENCODED_CLIENT_KEYS
        // Authorization: 'Bearer BQDrPHrLMu_gLmR0jHbSMz7-lDck_BXre2FGPcQ4N2OrOod_QOfWux-MT9Yb65E88OsG2HzT4e5FXIxWxdoBNmHgHdK6-zVcBVqx9l-tZOALDuPi1Fs4EkiBGFN5iEcqjxOxQjL3QBsRRw'
      }
    }).then((res) => res.json())
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log('Request failed: ', error);
    });
  }

  return (
    <div className="App">
      <Grid fluid>
        <Row className="searchBar">
          <Col xs={12}>
            <SearchBar setArtist={setArtistName} />
          </Col>
          <Col xs={12}>
            <IconButton className="searchButton" size="md" icon={<Icon icon='search' onClick={() => getArtistPopularTracks(artistName)}/>} />
          </Col>
        </Row>
        <Row>
          {/* Insert List Here */}
        </Row>
      </Grid>
    </div>
  );
}

function SearchBar(props) {
  return (
    <div>
      <Input style={{ width: 200 }} placeholder="Search Artist" onChange={(value) => props.setArtist(value)}/>
    </div>
  );
}

export default App;
