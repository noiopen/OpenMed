const Dotenv = require('dotenv-webpack')

const mode = process.env.ENV || 'development';

module.exports = {
  entry: './src/index.js',
  target: 'node',
  mode,
  output: {
    filename: 'bundle.js',
  },
  plugins: [
    new Dotenv()
  ],
}
