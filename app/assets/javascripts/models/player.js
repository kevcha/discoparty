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
    if (this.hasNext()) {
      this.index += 1;
      this.play();
    }
  }

  hasNext() {
    return this.playlist.length() >= this.index + 1;
  }

  currentTrack() {
    return this.playlist.trackAt(this.index);
  }
}
