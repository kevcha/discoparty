import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import axios from 'axios';
import Track from './track';
import YoutubeAutocomplete from './youtube-autocomplete';

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: { tracks: [] },
      url: '',
      playing: false,
      index: 0
    };
  }

  componentDidMount() {
    axios.get(`/api/v1/playlists/${this.props.id}`)
      .then(response => {
        const playlist = response.data.playlist;
        this.setState({ playlist });
        if (this.state.playlist.tracks.length > 0) {
          this.loadTrack();
        }
      });
  }

  loadTrack = () => {
    let index = this.state.index;
    let tracks = this.state.playlist.tracks;
    let videoId = tracks[index].provider_track_id;
    let url = `https://www.youtube.com/watch?v=${videoId}`;
    this.setState({ url: url });
  }

  togglePlay = () => {
    const playing = !this.state.playing;
    this.setState({ playing: playing });
  }

  endCallback = () => {
    if (this.state.index < this.state.playlist.tracks.length - 1) {
      let index = this.state.index + 1;
      this.setState({ index: index });
      this.loadTrack();
    } else {
      this.setState({ playing: false });
    }
  }

  isPlaying = (track) => {
    let current_track = this.state.playlist.tracks[this.state.index];
    return track == current_track && this.state.playing;
  }

  render() {
    let buttonLabel = this.state.playing ? 'Pause' : 'Play';
    return (
      <div>
        <h1>{this.state.playlist.name}</h1>

        <YoutubeAutocomplete playlistId={this.props.id} />

        <div className="playlist-tracks">
          <header>
            <h3>Tracklist</h3>
            <button className="small" onClick={this.togglePlay}>{buttonLabel}</button>
          </header>
          <ul className="tracks">
            {this.state.playlist.tracks.map((track) => {
              return <Track playing={this.isPlaying(track)} track={track} key={track.id} />;
            })}
          </ul>
        </div>

        <div id="embed-player-wrapper">
          <ReactPlayer
            url={this.state.url}
            playing={this.state.playing}
            onEnded={this.endCallback}
          />
        </div>
      </div>
    );
  }
}

export default Playlist;
