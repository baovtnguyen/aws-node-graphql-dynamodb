const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  mode: 'none',
  stats: {
    errorDetails: true,
  },
}
