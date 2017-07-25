import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import Track from './track';
import YoutubeAutocomplete from './youtube-autocomplete';
import FlipMove from 'react-flip-move';

class PlaylistServer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: { tracks: [] },
      url: '',
      index: 0
    };
  }

  componentDidMount = () => {
    this.getInitialState();

    App.track = App.cable.subscriptions.create({
      channel: "PlaylistChannel",
      id: this.props.id
    }, {
      received: (response) => {
        let state = this.createStateFrom(response);
        this.newState(state);
      }
    });
  }

  createStateFrom = (response) => {
    let tracks = response.playlist.tracks;
    tracks.forEach((track) => {
      track['played'] = this.played(track.id);
      track['playing'] = this.playing(track.id);
    });
    let newState = this.state;
    newState.playlist.tracks = tracks;
    return newState;
  }

  played = (trackId) => {
    let track = this.findTrack(trackId);
    return track['played'];
  }

  playing = (trackId) => {
    let track = this.findTrack(trackId);
    return track['playing'];
  }

  findTrack = (trackId) => {
    return this.state.playlist.tracks.find((track) => {
      return track.id == trackId;
    });
  }

  newState = (state) => {
    this.setState(state);
    // TODO: post new state to server to let it dispatch it to all clients
    axios.post(`/playlists/${playlistId}/state`, { state: this.state });
  }

  updatePlaylist = (playlist) => {
    playlist.tracks = playlist.tracks.filter((track) => {
      return !this.state.playedTracks.includes(track.id);
    });
    this.setState({ playlist });
  }

  getInitialState = () => {
    axios.get(`/api/v1/playlists/${this.props.id}`)
      .then(response => {
        let state = response.data;
        state['index'] = 0;
        state['url'] = state.playlist.tracks[0].url;
        state.playlist.tracks[0].playing = true;
        this.newState(state);
      });
  }

  togglePlay = () => {
    let state = this.state;
    state.playing = !state.playing;
    this.newState(state);
  }

  endCallback = () => {
    let state = this.state;
    state.playlist.tracks[state.index].played = true;
    state.playlist.tracks[state.index].playing = false;

    if (this.state.playlist.tracks.length > state.index + 1) {
      state.index += 1;
      state.url = state.playlist.tracks[state.index].url;
      state.playlist.tracks[state.index].playing = true;
    } else {
      state.playing = false;
    }

    this.newState(state);
  }

  isPlaying = (track) => {
    let current_track = this.state.playlist.tracks[0];
    return track == current_track && this.state.playing;
  }

  upvoted = (track) => {
    return track.upvoted.includes(parseInt(this.props.userId));
  }

  action = () => {
    return this.state.playing ? 'Pause' : 'Play';
  }

  tracks = () => {
    return this.state.playlist.tracks.filter((track) => {
      return !track.played;
    });
  }

  render() {
    return (
      <div>
        <h1>{this.state.playlist.name}</h1>
        <p className="sharable-link">Link : http://www.discoparty.com/parties/{this.props.id}</p>

        <YoutubeAutocomplete playlistId={this.props.id} />

        <div className="playlist-tracks">
          <header>
            <h3>Tracklist</h3>
            <button className="small" onClick={this.togglePlay}>{this.action()}</button>
          </header>
          <FlipMove
            duration={300}

            easing={'cubic-bezier(0.25, 0.5, 0.75, 1)'}
            staggerDurationBy={30}
            staggerDelayBy={10}
          >
            {this.tracks().map((track) => {
              return <Track playing={track.playing && this.state.playing} upvoted={this.upvoted(track)} track={track} key={track.id} />;
            })}
          </FlipMove>
        </div>

        <div id="embed-player-wrapper">
          <ReactPlayer
            url={this.state.url}
            playing={this.state.playing}
            onEnded={this.endCallback}
            width={1}
            height={1}
          />
        </div>
      </div>
    );
  }
}

export default PlaylistServer;
