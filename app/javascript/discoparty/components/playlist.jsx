import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import Track from './track';
import YoutubeAutocomplete from './youtube-autocomplete';
import FlipMove from 'react-flip-move';

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: { tracks: [] },
      url: '',
      playing: false,
      playedTracks: []
    };
  }

  componentDidMount = () => {
    this.fetchPlaylist();

    App.track = App.cable.subscriptions.create({
        channel: "PlaylistChannel",
        id: this.props.id
    }, {
      received: (data) => {
        this.updatePlaylist(data.playlist);
        this.loadTrack();
      }
    });
  }

  updatePlaylist = (playlist) => {
    playlist.tracks = playlist.tracks.filter((track) => {
      return !this.state.playedTracks.includes(track.id);
    });
    this.setState({ playlist });
  }

  fetchPlaylist = () => {
    axios.get(`/api/v1/playlists/${this.props.id}`)
      .then(response => {
        let playlist = response.data.playlist;
        this.updatePlaylist(playlist);
        this.loadTrack();
      });
  }

  loadTrack = () => {
    if (this.state.playlist.tracks.length > 0) {
      let tracks = this.state.playlist.tracks;
      let videoId = tracks[0].provider_track_id;
      let url = `https://www.youtube.com/watch?v=${videoId}`;
      this.setState({ url: url });
    }
  }

  togglePlay = () => {
    const playing = !this.state.playing;
    this.setState({ playing: playing });
  }

  endCallback = () => {
    let playedTracks = this.state.playedTracks;
    let trackId = this.state.playlist.tracks[0].id;
    playedTracks.push(trackId);
    this.setState({ playedTracks: playedTracks });
    this.updatePlaylist(this.state.playlist);
    if (this.state.playlist.tracks.length > 0) {
      this.loadTrack();
    } else {
      this.setState({ playing: false });
    }
  }

  isPlaying = (track) => {
    let current_track = this.state.playlist.tracks[0];
    return track == current_track && this.state.playing;
  }

  upvoted = (track) => {
    return track.upvoted.includes(parseInt(this.props.userId));
  }

  hint = () => {
    if (this.props.acl == 'server') {
      return (<p className="sharable-link">Link : http://www.discoparty.com/parties/{this.props.id}</p>);
    }
  }

  render() {
    let buttonLabel = this.state.playing ? 'Pause' : 'Play';

    let content = '';
    if (this.props.acl == 'server') {
      content = <button className="small" onClick={this.togglePlay}>{buttonLabel}</button>;
    }

    return (
      <div>
        <h1>{this.state.playlist.name}</h1>
        {this.hint()}

        <YoutubeAutocomplete playlistId={this.props.id} />

        <div className="playlist-tracks">
          <header>
            <h3>Tracklist</h3>
            {content}
          </header>
          <FlipMove
            duration={300}

            easing={'cubic-bezier(0.25, 0.5, 0.75, 1)'}
            staggerDurationBy={30}
            staggerDelayBy={10}
          >
            {this.state.playlist.tracks.map((track) => {
              return <Track playing={this.isPlaying(track)} upvoted={this.upvoted(track)} track={track} key={track.id} />;
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

export default Playlist;
