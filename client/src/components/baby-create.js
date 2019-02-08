import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, withRouter } from 'react-router-dom';
import query from '../queries/fetch-babies';

class BabyCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { babyName: '' };
  }

  onSubmit(event) {
    event.preventDefault();
    console.log('mutate', this.props);

    this.props
      .mutate({
        variables: {
          babyName: this.state.babyName
        },
        refetchQueries: [{ query }] // not associate with  component, you can use this syntax
      })
      .then(() => this.props.history.push('/'));
  }
  render() {
    let styles = {
      width: '500px'
    };
    return (
      <div>
        <Link to='/'>Back</Link>
        <h3>Create a New Baby</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Baby Name: </label>
          <input
            placeholder="Place prefered name here"
            onChange={event => this.setState({ babyName: event.target.value })}
            value={this.state.babyName}
            style ={styles}
          />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddBaby($babyName: String) {
    addBaby(babyName: $babyName) {
      babyName
    }
  }
`;

export default withRouter(graphql(mutation)(BabyCreate));
