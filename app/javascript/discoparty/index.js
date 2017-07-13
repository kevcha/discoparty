import React from 'react';
import ReactDOM from 'react-dom';
import Playlist from './components/playlist';

document.addEventListener('DOMContentLoaded', () => {
  var playlist = document.querySelector('#playlist')
  if (playlist) {
    ReactDOM.render(<Playlist userId={playlist.dataset.userId} acl={'server'} id={playlist.dataset.playlistId} />, playlist);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  var party = document.querySelector('#party')
  if (party) {
    ReactDOM.render(<Playlist userId={party.dataset.userId} acl={'client'} id={party.dataset.playlistId} />, party);
  }
});
