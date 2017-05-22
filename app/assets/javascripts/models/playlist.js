class Playlist {
  constructor() {
    this.id = $('.playlist').data('id');
    this.tracks = this.getTracks();
  }

  getTracks() {
    let url = `/api/v1/playlists/${this.id}/tracks`;
    $.get(url, (response) => { this.tracks = response.data });
  }

  length() {
    return this.tracks.length;
  }

  trackAt(index) {
    return this.tracks[index];
  }

  hasTracks() {
    return this.tracks.length > 0;
  }
}
