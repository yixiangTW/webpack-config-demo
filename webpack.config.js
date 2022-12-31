const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [new ESLintPlugin({
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  })],
  module: {
    rules: [{
      test: /\.[jt]sx?$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env'],
            ['@babel/preset-react', {
              runtime: 'classic'
            }],
            ['@babel/preset-typescript']
          ]
        }
      }
    }]
  }
}
