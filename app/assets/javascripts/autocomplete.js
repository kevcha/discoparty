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
      var playlistId = $('.playlist').data('id');
      $.ajax({
        type: 'POST',
        url: `/api/v1/playlists/${playlistId}/tracks`,
        data: { track: track.data },
        success: function(track) {
          console.log('Ok');
        },
        error: function(error) {
          console.log('An error happened :(');
        }
      });
    },
    formatResult: function(track) {
      return JST['templates/track']({ track: track.data });
    }
  }

  $('#search').autocomplete(options);
});
