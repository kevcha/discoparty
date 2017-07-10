import React, { Component } from 'react';
import axios from 'axios';
import Track from './track'
import Autocomplete from 'react-autocomplete'

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: { tracks: [] },
      tracks: [],
      value: ''
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
          <Autocomplete
            inputProps={{ id: 'search', placeholder: 'Search for a track to add...' }}
            items={this.state.tracks}
            value={this.state.value}
            getItemValue={(item) => item.title}
            wrapperStyle={{ display: 'block', position: 'relative' }}
            menuStyle={{ background: 'transparent', position: 'absolute', top: '45px', left: 0, width: '100%' }}
            renderItem={(item, isHighlighted) => (
              <div className={`autocomplete-suggestion ${isHighlighted ? 'autocomplete-selected' : ''}`} key={item.provider_track_id}>
                <img src={item.image_url} />
                <p>{item.title}</p>
              </div>
            )}
            onSelect={(value, item) => {
              axios.post(`/api/v1/playlists/${this.props.id}/tracks`, {
                track: item
              });
              this.setState({ value: '', tracks: [] });
            }}
            onChange={(event, value) => {
              this.setState({ value });
              if (value != '') {
                axios.get(`/api/v1/search?query=${value}`)
                  .then(response => {
                    this.setState({ tracks: response.data });
                  });
              } else {
                this.setState({ tracks: [] });
              }
            }}
          />
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
