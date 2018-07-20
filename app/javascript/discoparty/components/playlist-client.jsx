import React, { Component } from "react";
import axios from "axios";
import Track from "./track";
import YoutubeAutocomplete from "./youtube-autocomplete";
import FlipMove from "react-flip-move";

class PlaylistClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: { tracks: [] },
      playing: false
    };
  }

  componentDidMount = () => {
    this.getInitialState();

    App.track = App.cable.subscriptions.create(
      {
        channel: "StateChannel",
        id: this.props.id
      },
      {
        received: response => {
          this.setState(response.state);
        }
      }
    );
  };

  getInitialState = () => {
    axios.get(`/api/v1/playlists/${this.props.id}`).then(response => {
      let state = response.data;
      this.setState(state);
    });
  };

  tracks = () => {
    return this.state.playlist.tracks.filter(track => {
      return !track.played;
    });
  };

  upvoted = track => {
    return track.upvoted.includes(parseInt(this.props.userId));
  };

  signIn = () => {
    console.log("foo");
  };

  render() {
    return (
      <div>
        <h1>{this.state.playlist.name}</h1>

        <YoutubeAutocomplete playlistId={this.props.id} />

        <div className="playlist-tracks">
          <header>
            <h3>Tracklist</h3>
          </header>
          <FlipMove
            duration={300}
            easing={"cubic-bezier(0.25, 0.5, 0.75, 1)"}
            staggerDurationBy={30}
            staggerDelayBy={10}
          >
            {this.tracks().map(track => {
              return (
                <Track
                  playing={this.state.playing}
                  active={track.playing}
                  upvoted={this.upvoted(track)}
                  track={track}
                  key={track.id}
                  signInCallback={this.signIn}
                  userId={this.props.userId}
                />
              );
            })}
          </FlipMove>
        </div>
      </div>
    );
  }
}

export default PlaylistClient;
