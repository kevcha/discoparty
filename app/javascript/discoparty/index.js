import React from 'react';
import ReactDOM from 'react-dom';
import Playlist from './components/playlist';

document.addEventListener('DOMContentLoaded', () => {
  var playlist = document.querySelector('#playlist')
  if (playlist) {
    ReactDOM.render(<Playlist id={playlist.dataset.id} />, playlist);
  }
})
