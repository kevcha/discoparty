import React from 'react';
import ReactDOM from 'react-dom';
import PlaylistServer from './components/playlist-server';
import PlaylistClient from './components/playlist-client';

document.addEventListener('DOMContentLoaded', () => {
  var playlist = document.querySelector('#playlist')
  if (playlist) {
    ReactDOM.render(<PlaylistServer userId={playlist.dataset.userId} id={playlist.dataset.playlistId} />, playlist);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  var party = document.querySelector('#party')
  if (party) {
    ReactDOM.render(<PlaylistClient userId={party.dataset.userId} id={party.dataset.playlistId} />, party);
  }
});
