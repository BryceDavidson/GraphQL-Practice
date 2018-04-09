import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute} from 'react-router';
//interacting with graphql server
//get data from db and store it locally
import ApolloClient from 'apollo-client';
//actually provides integration to react
import { ApolloProvider } from 'react-apollo';
import './style/style.css';

//COMPONENTS
//--------------------------------------------------
import SongList from './components/SongList.js';
import App from './components/App.js';
import SongCreate from './components/SongCreate.js';
import SongDetail from './components/SongDetail.js';
//==================================================


//client assumes graphiql is available on the graphql route
//in server.js
//new instance of apollo store
const client = new ApolloClient({
  //lets apollo know to use the id property
  //of every piece of data that comes to it
  //we must now use the id prop in every query that we create
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
    //glue layer between react and apollo world
    //feed in store to provider as prop
    <ApolloProvider client={client}>
      <Router history={hashHistory}>

        <Route path="/" component={App}>
          <IndexRoute component={SongList} />
        </Route>

        <Route path="songs/new" component={SongCreate} />
        <Route path="songs/:id" component={SongDetail} />

      </Router>
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
