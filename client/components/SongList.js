import React, { Component } from 'react';
//makes sure we can use querys in our reat code
import gql from 'graphql-tag';
//glue between apollo data source and react
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import query from './../queries/fetchSongs.js';
import deleteSong from './../mutations/deleteSong.js'

class SongList extends Component {

  deleteSong(id) {
    event.preventDefault();

    this.props.mutate({
      variables: {id},
    }).then(() => this.props.data.refetch())
  }

  renderSongs() {
    return this.props.data.songs.map(({ id, title }) => {
      return (
        <li
          key={id}
          className="collection-item">
          <Link to={`/songs/${id}`}>
            {title}
          </Link>
          <i
            className="material-icons"
            onClick={() => this.deleteSong(id)}
            >delete</i>
        </li>
      );
    });
  }

  render() {
    if (this.props.data.loading) {
      return <div>loading...</div>
    }

    return (
      <div>
        <ul className="collection">
          {this.renderSongs()}
        </ul>
        <Link
        to="/songs/new"
        className="btn-floating btn-large red right"
          >
            <i className="material-icons">add</i>
          </Link>
      </div>
    );
  }
}

// must use back ticks in our strings
//only defines here
//no network req's

//is put into props by graphql helper function
// is accesed by using this.props.data.songs
// const query = gql`
//   {
//     songs {
//       id
//       title
//     }
//   }
// `;

//calls function, that returns a function instantly invoked
//by next call
// double wrap to be able to call two queries from here
export default graphql(deleteSong) (
  graphql(query)(SongList)
);
