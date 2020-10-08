module.exports = {
  entry: "./src/matching_game.jsx",
  devServer: {
    open: true,
    hot: true,
  },
  devtool: 'inline-source-map',
  output: {
    path: __dirname,
    filename: './dist/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            babelrc: true,            
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  }
};
