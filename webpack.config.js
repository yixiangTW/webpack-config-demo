const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')

const cssLoaders = (...loaders) => [
  // 将 JS 字符串生成为 style 节点
  'style-loader',
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
  mode: 'production',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.jsx'],
    alias: {
      src: path.resolve(__dirname, './src')
    }
  },
  plugins: [new ESLintPlugin({
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  })],
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
