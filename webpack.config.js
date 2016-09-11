module.exports = {
  entry: './frontend/app.js',
  output: {
    path: './public/js/',
    filename: 'script.js'
  },
  devServer: {
    inline: true,
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react','stage-0']
        }
      }
    ]
  }
}
