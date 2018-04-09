import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import fetchSongDetail from "./../queries/fetchSongDetail.js";
import { Link } from 'react-router';
import LyricCreate from './LyricCreate.js';
import LyricList from './LyricList.js';

class SongDetail extends Component {



  render() {
    console.log(this.props);

    const { song } = this.props.data;
    if (!song) {
      return <div>Loading...</div>
    }

    return (

      <div>
        <Link to="/">Back</Link>
        <h3>{song.title}</h3>
        <LyricList lyrics={song.lyrics}/>
        <LyricCreate songId={this.props.params.id}/>
      </div>
    );
  }
}

//making sure that when our component renders it has our id variable passed to
//our router params
//this is how we add in our fetchSongDetail varaibles to our initial query
export default graphql(fetchSongDetail, {
  options: (props) => {return {variables: {id: props.params.id}}}
})(SongDetail);
