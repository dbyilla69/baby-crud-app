import './index.css'
import React, { Component } from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from "react-apollo";
import {BrowserRouter as Router, Route } from "react-router-dom";
//components
import Home from './components/home';
import BabyList from './components/baby-list';
import BabyCreate from './components/baby-create';

//apollo client setup
const client = new ApolloClient({
  uri:'http://localhost:4000/graphql'
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>
            <Route path='/' component={Home} exact />
            <Route path='/babies' component={BabyList} exact />
            <Route path='/babies/new' component={BabyCreate} exact />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
