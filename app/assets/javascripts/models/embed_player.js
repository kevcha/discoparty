class EmbedPlayer {
  constructor() {
    this.initialized = false;
    this.endCallback = () => {};
  }

  initializePlayerWith(track) {
    this.ytPlayer = new YT.Player('embed-player-wrapper', {
      height: '1',
      width: '1',
      videoId: this.track.attributes['provider-track-id'],
      events: {
        'onReady': () => { this.play() },
        'onStateChange': (event) => { this.onPlayerStateChange(event) }
      }
    });
  }

  initializeWith(track) {
    this.track = track;

    if (!this.ytPlayer) {
      this.initializePlayerWith(this.track);
    } else {
      this.ytPlayer.loadVideoById(this.track.attributes['provider-track-id']);
    }

    this.initialized = true;
  }

  onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
      this.initialized = false;
      this.endCallback();
    }
  }

  pause() {
    this.ytPlayer.pauseVideo();
  }

  play() {
    console.log('play video');
    this.ytPlayer.playVideo();
  }
}
