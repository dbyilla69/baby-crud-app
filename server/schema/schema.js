const graphql = require('graphql');
const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql;

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
    babies: {
      type: new GraphQLList(BabyType),
      resolve() {
        return axios
          .get(`http://localhost:7000/babies`)
          .then(resp => resp.data);
      }
    },
    baby: {
      type: BabyType,

      args: { id: { type: GraphQLInt } },
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:7000/babies/${args.id}`)
          .then(resp => resp.data);
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addBaby: {
      type: BabyType,
      args: {
        babyName: { type: GraphQLString }, //GraphQLNonNUll must provide that field
        gender: { type: GraphQLString }
      },
      resolve(parentValue, { babyName, gender }) {
        return axios
          .post(`http://localhost:7000/babies/`, { babyName, gender })
          .then(res => res.data);
      }
    },
    //Expect you to get back a type, but Graphql return a null, because that user has been deleted.  Drawback of Graphql
    deleteBaby: {
      type: BabyType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parentValue, { id }) {
        return axios
          .delete(`http://localhost:7000/babies/${id}`)
          .then(res => res.data);
      }
    },
    updateBaby: {
      type: BabyType,
      args: {
        id: { type: GraphQLInt },
        babyName: { type: GraphQLString },
        gender: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        //pass along args object to patch request
        return axios
          .patch(`http://localhost:7000/babies/${args.id}`, args)
          .then(res => res.data);
      }
    }
  }
});
 //Fun Fact: Facebook has their entire schema in one file
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
