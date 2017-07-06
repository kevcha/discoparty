import React, { Component } from 'react';
import axios from 'axios';
import Track from './track'

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: {
        tracks: []
      }
    };
  }

  componentDidMount() {
    axios.get(`/api/v1/playlists/${this.props.id}`)
      .then(response => {
        const playlist = response.data.playlist;
        this.setState({ playlist });
      });
  }

  render() {
    return (
      <div>
        <h1>{this.state.playlist.name}</h1>

        <div className="search-track">
          <input type="text" id="search" placeholder="Search for a track to add..." />
        </div>

        <div className="playlist-tracks">
          <header>
            <h3>Tracklist</h3>
            <button className="small" id="js-play">Play</button>
          </header>
          <ul className="tracks">
            {this.state.playlist.tracks.map((track) => {
              return <Track track={track} key={track.id} />;
            })}
          </ul>
        </div>

        <div id="embed-player-wrapper"></div>
      </div>
    );
  }
}

export default Playlist;
