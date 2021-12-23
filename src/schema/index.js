const { gql } = require('apollo-server-lambda');

const {
  TodoTypes,
  TodoQuery,
  TodoMutation,
  TodoResolvers,
} = require('./todo');

const typeDefs = gql`
  type Query
  type Mutation
  ${TodoTypes}
`;

const resolvers = {
  Query: {
    ...TodoQuery,
  },
  Mutation: {
    ...TodoMutation,
  },
  Todo: TodoResolvers,
};

module.exports = {
  typeDefs,
  resolvers,
}

