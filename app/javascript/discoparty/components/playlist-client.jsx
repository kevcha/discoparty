import React, { Component } from "react";
import axios from "axios";
import Track from "./track";
import SignInModal from "./sign-in-modal";
import YoutubeAutocomplete from "./youtube-autocomplete";
import FlipMove from "react-flip-move";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";
import { renderToStaticMarkup } from 'react-dom/server';

class PlaylistClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: { tracks: [] },
      playing: false,
      showSignInModal: false
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
    this.setState({ showSignInModal: true });
  };

  render() {
    let modal;

    if (this.props.userId != "") {
      modal = "";
    } else {
      modal = <SweetAlert
        show={this.state.showSignInModal}
        title="You need to sign in before"
        onConfirm={() => this.setState({ showSignInModal: false })}
        customClass="authentication-modal"
        html
        text={renderToStaticMarkup(<SignInModal />)}
      />
    }

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
                  client={true}
                />
              );
            })}
          </FlipMove>
        </div>
        {modal}
      </div>
    );
  }
}

export default PlaylistClient;
