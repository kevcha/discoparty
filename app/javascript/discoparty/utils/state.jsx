export default function smartState(state, response) {
  this.state = state;
  this.tracks = response.playlist.tracks;

  var sortTracks = () => {
    this.tracks.forEach((track) => {
      track['played'] = played(track.id);
      track['playing'] = playing(track.id);
    });
    this.tracks.sort((track1, track2) => {
      if (track1.playing) return -1;
      if (track2.playing) return 1;

      return track2.upvotes - track1.upvotes;
    });
  }

  var played = (trackId) => {
    let track = findTrack(trackId);
    return (track) ? track['played'] : false;
  }

  var playing = (trackId) => {
    let track = findTrack(trackId);
    return (track) ? track['playing'] : false;
  }

  var findTrack = (trackId) => {
    return this.state.playlist.tracks.find((track) => {
      return track.id == trackId;
    });
  }

  sortTracks();

  let newState = this.state;
  newState.playlist.tracks = this.tracks;

  return newState;
}
