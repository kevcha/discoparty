import React, { Component } from 'react';

class Track extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li className="track" data-id="{this.props.id}">
        <img src={this.props.track.image_url} />
        <p>{this.props.track.title}</p>
      </li>
    );
  }
}

export default Track;
