const { ApolloServer } = require('apollo-server-lambda');
const { typeDefs, resolvers } = require('./schema');

const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = !NODE_ENV || !['production'].includes(NODE_ENV);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  // subscription: {},
  introspection: IS_DEV,
  // context: {}
});

module.exports = apolloServer;
