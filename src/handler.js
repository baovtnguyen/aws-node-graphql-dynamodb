const apolloServer = require('./server');

module.exports.handler = apolloServer.createHandler();
