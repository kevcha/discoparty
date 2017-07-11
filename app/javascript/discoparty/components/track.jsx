import React, { Component } from 'react';
import classNames from 'classnames';

class Track extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let classes = classNames({
      'track': true,
      'playing': this.props.playing
    });

    return (
      <li className={classes} data-id="{this.props.id}">
        <img src={this.props.track.image_url} />
        <p>{this.props.track.title}</p>
      </li>
    );
  }
}

export default Track;
