import React, { Component } from 'react';
import axios from 'axios';
import classNames from 'classnames';

class Track extends Component {
  constructor(props) {
    super(props);
  }

  vote = () => {
    if (this.props.upvoted) {
      this.downvote();
    } else {
      this.upvote();
    }
  }

  upvote = () => {
    axios.post(`/api/v1/tracks/${this.props.track.id}/vote`);
  }

  downvote = () => {
    axios.delete(`/api/v1/tracks/${this.props.track.id}/vote`);
  }

  render() {
    let trackClasses = classNames({
      'track': true,
      'playing': this.props.playing
    });
    let upvoteClasses = classNames({
      'upvote': true,
      'upvoted': this.props.upvoted
    });

    return (
      <li className={trackClasses} data-id="{this.props.id}">
        <img src={this.props.track.image_url} />
        <p>{this.props.track.title}</p>
        <div className={upvoteClasses} onClick={this.vote}>
          <div className="fa fa-caret-up"></div>
          <div className='count'>{this.props.track.upvotes}</div>
        </div>
      </li>
    );
  }
}

export default Track;
