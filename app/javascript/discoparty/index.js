import React from 'react';
import ReactDOM from 'react-dom';
import PlaylistServer from './components/playlist-server';

document.addEventListener('DOMContentLoaded', () => {
  var playlist = document.querySelector('#playlist')
  if (playlist) {
    ReactDOM.render(<PlaylistServer userId={playlist.dataset.userId} id={playlist.dataset.playlistId} />, playlist);
  }
});
