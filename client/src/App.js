import React, { Component } from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from "react-apollo";
//components
import BabyList from './components/baby-list';

//apollo client setup
const client = new ApolloClient({
  uri:'http://localhost:4000/graphql'
})
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <div id='main'>
        <h1>Baby List</h1>
        <BabyList/>
      </div>
      </ApolloProvider>
    );
  }
}

export default App;
