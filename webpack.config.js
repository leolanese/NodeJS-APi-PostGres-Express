const path = require('path');
const {
  NODE_ENV = 'production',
} = process.env;
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
  entry: './src/index.ts',
  mode: NODE_ENV,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new WebpackShellPlugin({
      onBuildEnd: ['yarn start:dev:nodemon:cmd']
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader',
        ]
      }
    ]
  },
  externals: [ nodeExternals() ],
  watch: NODE_ENV === 'development'
}