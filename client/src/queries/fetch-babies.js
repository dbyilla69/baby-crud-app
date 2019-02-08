import gql from 'graphql-tag';


export default gql`
  {
    babies {
      id
      babyName
      gender
    }
  }
`;