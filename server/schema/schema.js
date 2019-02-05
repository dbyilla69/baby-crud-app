const graphql = require('graphql');
const axios = require('axios');
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLSchema } = graphql;


const BabyType = new GraphQLObjectType({
  name: 'Baby',
  fields: {
    id: { type: GraphQLInt },
    babyName: { type: GraphQLString },
    gender: { type: GraphQLString }
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    baby: {
      type: BabyType,

          args: { id: { type: GraphQLInt } },
      resolve(parentValue, args) {
          return axios.get(`http://localhost:3000/babies/${args.id}`)
          .then(resp => resp.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})
