var path = require('path');

plugins = [];
// plugins.push(new webpack.optimize.UglifyJsPlugin());
// plugins.push(new webpack.DefinePlugin({
//     'process.env': {
//       'NODE_ENV': JSON.stringify('production')
//     }
//   }));

module.exports = {
  entry: './src/index.js',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['react', 'es2015', 'stage-1'] }
          }
        ]
      },
      {
        test: /png$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'file'
          }
        ]
      }
    ],
  },
  output: {
    path: path.resolve(__dirname),
    filename: 'dist/bundle.js'
  },
  plugins: plugins,
  devServer: {
    historyApiFallback: true,
    contentBase: './dist'
  }
};
