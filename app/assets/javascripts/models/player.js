class Player {
  constructor() {
    this.playlist = new Playlist();
    this.index = 0;
    this.embedPlayer = new EmbedPlayer();
    this.embedPlayer.endCallback = () => { this.next(); };
    this.playing = false;
    $('#js-play').on('click', () => { this.play(); });
  }

  play() {
    if (this.embedPlayer.initialized) {
      this.togglePlay();
    } else {
      this.loadTrack();
    }
  }

  loadTrack() {
    if (this.playlist.hasTracks()) {
      let track = this.currentTrack();
      this.playing = true;
      this.embedPlayer.initializeWith(track);
      $('.track').removeClass('playing');
      $(`.track[data-id=${track.id}]`).addClass('playing');
    }
  }

  togglePlay() {
    if (this.playing) {
      this.embedPlayer.pause();
      this.playing = false;
    } else {
      this.embedPlayer.play();
      this.playing = true;
    }
  }

  pause() {
    this.embedPlayer.pause();
  }

  next() {
    this.removeCurrent();
    if (this.hasNext()) {
      this.index += 1;
      this.play();
    }
  }

  removeCurrent() {
    let track = this.currentTrack();
    let $track = $(`.track[data-id=${track.id}]`);
    $track.removeClass('playing');
    $track.addClass('played');
  }

  hasNext() {
    return this.playlist.length() >= this.index + 1;
  }

  currentTrack() {
    return this.playlist.trackAt(this.index);
  }
}
