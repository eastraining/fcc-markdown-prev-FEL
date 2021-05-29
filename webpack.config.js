const path = require('path');

module.exports = {
  entry: './src/App.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
       test: /\.md/,
       type: 'asset/source',
      }
    ]
  },
};