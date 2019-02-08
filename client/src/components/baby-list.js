import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import query from '../queries/fetch-babies';


class BabyList extends Component {
  onBabyDelete(id) {
    this.props.mutate({ variables: id  })
      .then(() => this.props.data.refetch()); // associate with component, you can use this syntax
  }
  renderBabies() {
    return this.props.data.babies.map(({ id, babyName }) => {
      return (
        <li key={id} className='collection-item'>
          {babyName}
          <i
            className='material-icons'
            onClick={() => this.onBabyDelete({ id })}
          >
            delete
          </i>
        </li>
      );
    });
  }
  render() {
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <ul className='collection'>{this.renderBabies()}</ul>
        <Link to='/babies/new' className='btn-floating btn-large red right'>
          <i className='material-icons'>add</i>
        </Link>
      </div>
    );
  }
}

const mutation = gql`
  mutation DeleteSong($id: Int) {
    deleteBaby(id: $id) {
      id
      babyName
    }
  }
`;
export default graphql(mutation)(graphql(query)(BabyList));
