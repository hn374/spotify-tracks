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

    authenticateSpotify();
  }, [])

  function authenticateSpotify() {
    // var getUrl = 'https://accounts.spotify.com/authorize?client_id=' + config.CLIENT_ID + '&response_type=code&redirect_uri=https://localhost:3000';

    // fetch(getUrl, {
    //   method: 'get', 
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json'
    //   }
    // })
    // .then((res) => res.json())
    // .then((res) => {
    //   console.log(res);
    // })
    // .catch((error) => {
    //   console.log(error);
    // });

    fetch('http://localhost:3001/authSpotify?client_id=' + config.CLIENT_ID, {
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
  }

  function getArtistPopularTracks(artist) {
    var getUrl = 'https://api.spotify.com/v1/search?q=' + artist + '&type=artist&market=US&limit=10&offset=5'

    fetch(getUrl, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + config.ENCODED_CLIENT_KEYS
      }
    })
    .then((res) => res.json())
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
        <Row>
          <Col>
            <h1 className="pageHeader">Spotify Tracks</h1>
          </Col>
        </Row>
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
