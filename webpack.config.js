const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const mode = 'production'

const cssLoaders = (...loaders) => [
  mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
  // 将 CSS 转化成 CommonJS 模块
  {
    loader: 'css-loader',
    options: {
      modules: {
        mode: 'icss'
      }
    }
  },
  ...loaders
]

module.exports = {
  entry: './src/index.js',
  mode,
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.jsx'],
    alias: {
      src: path.resolve(__dirname, './src')
    }
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          minSize: 0,
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors', // 文件名
          chunks: 'all' // all同步加载的和异步加载的 async表示异步加载的 initial表示同步加载的文件
        }
      }
    }
  },
  plugins: [new HtmlWebpackPlugin(), mode === 'production' && new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css'
  }), new ESLintPlugin({
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  })].filter(Boolean),
  module: {
    rules: [{
      test: /\.[jt]sx?$/,
      exclude: /node_modules/,
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
    }, {
      test: /\.s[ac]ss$/i,
      use: cssLoaders({
        loader: 'sass-loader',
        options: {
          additionalData: '@import "src/scss-vars.scss";'
        }
      })
    }, {
      test: /\.less$/i,
      use: cssLoaders({
        loader: 'less-loader',
        options: {
          additionalData: '@import "~src/less-vars.less";'
        }
      })
    }, {
      test: /\.styl$/,
      use: cssLoaders({
        loader: 'stylus-loader', // 将 Stylus 文件编译为 CSS
        options: {
          stylusOptions: {
            import: [path.join(__dirname, 'src/stylus-vars.styl')]
          }
        }
      })
    }]
  }
}
