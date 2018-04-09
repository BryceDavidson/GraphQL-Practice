import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricList extends Component {

//optomistic response for our mutation
//apollo predicts and updares instantly on UI
  onLike(id, likes) {
    this.props.mutate({
      variables: { id },
      // we can copy paste our request log into here and
      // add our increment logic
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id,
          __typename: 'lyricType',
          likes: likes + 1
        }
      }
    })
  }

  renderLyrics() {
    return this.props.lyrics.map(({ id, content, likes }) => {
      return (
        <li key={id} className="collection-item">
          {content}
        <div className="vote-box">
          {likes}
          <i
            className="material-icons"
            onClick={() => this.onLike(id, likes)}
            >
              thumb_up</i>
        </div>
        </li>
      );
    })
  }

  render() {
    return (
      <ul className="collection">
        {this.renderLyrics()}
      </ul>
    );
  }
}

const mutation = gql`
mutation LikeLyric($id: ID) {
  likeLyric(id: $id) {
    id
    likes
  }
}
`;

export default graphql(mutation)(LyricList);
