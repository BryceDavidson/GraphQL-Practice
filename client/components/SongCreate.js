import React, { Component } from 'react';
import gql from "graphql-tag";
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
import query from './../queries/fetchSongs.js';

class SongCreate extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: ""
    }
  }

  onSubmit(event) {
    // keeps form from attempting to submit itself
    event.preventDefault();

//.mutate is an item on out props with mutations and can be called
//with variable as config object
//as long as variables are set up below with the $ symbol
    this.props.mutate({
      variables: {
        title: this.state.title
      },
      // a list of queries to run on function call
      // if the query we had to execute had some kind of variables
      //we would put it as the second aurgument in the object after query
      refetchQueries:[{ query }]
      //.then will be called after song is created
    }).then(() => hashHistory.push('/'));
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a New Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title:</label>
          <input
            onChange={event => this.setState({title: event.target.value})}
            type="text"
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddSong($title: String) {
     addSong(title: $title) {
       title
     }
  }
`;

export default graphql(mutation)(SongCreate);
