import React, { useState, useEffect } from 'react';
import './App.css';
import 'rsuite/dist/styles/rsuite-default.css';
import { Input, Grid, Col, Row, IconButton, Icon } from 'rsuite';

function App() {
  const [artistName, setArtistName] = useState('');

  function getArtistPopularTracks(artistName) {
    var getUrl = 'https://api.spotify.com/v1/search?q=' + artistName + '&type=artist&market=US&limit=10&offset=5'

    fetch(getUrl, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // Authorization: Bearer BQBQg6rnSPguURQdI57ytEjqIQU-SxlwcOYkhalBwf52o5n6FI2z3tHa70FaWYbWQWrjlwhgIrBPoRgVofv9X-qm4l4f-Mbef9zh77iYoxmiIYrOPHqCD4rxYOf0CT5BTqVfUKK2uX_ZjQ
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
        <Row>
          <Col>
            <SearchBar artistName={artistName} setArtist={setArtistName} getArtistPopularTracks={getArtistPopularTracks}/>
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
      <Input style={{ width: 300 }} placeholder="Search Artist" onChange={(value) => props.setArtist(value)}/>
      <IconButton size="md" icon={<Icon icon='search' />} onClick={() => {props.getArtistPopularTracks(props.artistName)}}/>
    </div>
  );
}

export default App;
