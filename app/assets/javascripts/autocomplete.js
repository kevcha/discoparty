$(function() {
  var options = {
    serviceUrl: '/api/v1/search',
    dataType: 'json',
    transformResult: function(tracks) {
      return {
        suggestions: $.map(tracks, function(track) {
          return { value: track.title, data: track };
        })
      };
    },
    onSelect: function(track) {
      // TODO:
      // * Add this track to playlist
      // * Re render tracklist
    },
    formatResult: function(track) {
      return JST['templates/track']({ track: track.data });
    }
  }

  $('#search').autocomplete(options);
});
