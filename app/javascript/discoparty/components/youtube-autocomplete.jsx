import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';
import axios from 'axios';

class YoutubeAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      value: ''
    };
  }

  render() {
    return (
      <div className="search-track">
        <Autocomplete
          inputProps={{ id: 'search', placeholder: 'Search for a track to add...' }}
          items={this.state.tracks}
          value={this.state.value}
          open={true}
          getItemValue={(item) => item.title}
          wrapperStyle={{ display: 'block', position: 'relative' }}
          menuStyle={{ background: 'transparent', position: 'absolute', top: '45px', left: 0, width: '100%', zIndex: 1 }}
          renderItem={(item, isHighlighted) => (
            <div className={`autocomplete-suggestion ${isHighlighted ? 'autocomplete-selected' : ''}`} key={item.provider_track_id}>
              <img src={item.image_url} />
              <p>{item.title}</p>
            </div>
          )}
          onSelect={(value, item) => {
            axios.post(`/api/v1/playlists/${this.props.playlistId}/tracks`, {
              track: item
            });
            this.setState({ value: '', tracks: [] });
          }}
          onChange={(event, value) => {
            this.setState({ value });
            if (value != '') {
              axios.get(`/api/v1/search?query=${value}`)
                .then(response => {
                  this.setState({ tracks: response.data });
                });
            } else {
              this.setState({ tracks: [] });
            }
          }}
        />
      </div>
    );
  }
}

export default YoutubeAutocomplete;
