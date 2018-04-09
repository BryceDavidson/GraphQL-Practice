import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import AddLyricToSong from './../mutations/AddLyricToSong.js';

class LyricCreate extends Component {

  constructor(props) {
    super(props);

    this.state = {
      content: ""
    }
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.mutate({
      variables: {
        content: this.state.content,
        songId: this.props.songId
      }
    })
    this.setState({content: ""})
  }

  render() {
    return (
      <form
        onSubmit={this.onSubmit.bind(this)}
        >
        <label>Add a Lyric</label>
        <input
          onChange={event => this.setState({content: event.target.value})}
          type="text"
          value={this.state.content} />
      </form>
    );
  }

}

export default graphql(AddLyricToSong)(LyricCreate);
