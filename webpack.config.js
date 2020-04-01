const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    // './src/html/index.html',
    index: ['./src_old/scss/index.scss', './src_old/js/index.js', './node_modules/fullpage.js/dist/fullpage.css'],
  },
  mode: 'development',
  output: {
    // path for all outputs.
    path: path.resolve(__dirname, 'dist'),
    // filename for js files
    filename: 'js/[name].bundle.js'
  },
  plugins: [
    // extracting css files to files from css-loader
    new MiniCssExtractPlugin({
      // this defines the folder where the file should be saved.
      // that means: output.path + filename. in this case 'dist/css/[name].css'
      // [name] ist the name of the entry.
      filename: 'css/[name].css',
    }),
    new HtmlWebpackPlugin({
      template: './src_old/html/index.html',
      filename: './index.html',
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
          postcss: [
            // autoprefixer for automatic adding of browser prefixes, find the browserslist in package.json
            autoprefixer()
          ]
      }
    }),
  ],
  devtool: 'source-map',
  module: {
    rules: [ 
      { // copying index.html to dist and urlrewriting (img tag only)
        test: /index\.html$/,
        use: [
            {
              loader: "html-loader",
              options: {
                  attributes: {
                    list: [
                      {
                        tag: 'img',
                        attribute: 'src',
                        type: 'src'
                      },
                      {
                        tag: 'source',
                        attribute: 'src',
                        type: 'src',
                      }
                    ],
                  },
              }
            }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: 'dist/',
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              //url: false,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              implementation: require("sass")
            }
          }
        ],
      },
      { // image loader for index.html
        test: /\.(png|jpe?g|gif)$/i,
        use: (info) => ([
          {
            loader: 'file-loader',
            options: {
              // specifies output path relative to output.path
              outputPath: 'img',
              // specifies path to prefix url rewriting by css-loader. if the url was url(image.jpg) it is now url(publicPath/image.jpg).
              publicPath: path.basename(info.issuer) === 'index.html' ? './img/' : '../img/',
            }
          },
        ]),
      },
      { // video loader for index.html
        test: /\.webm$/i,
        use: (info) => ([
          {
            loader: 'file-loader',
            options: {
              // specifies output path relative to output.path
              outputPath: 'video',
              // specifies path to prefix url rewriting by css-loader. if the url was url(image.jpg) it is now url(publicPath/image.jpg).
              publicPath: path.basename(info.issuer) === 'index.html' ? './video/' : '../video/',
            }
          },
        ]),
      },
      {
        test: /\.svg$/i,
        use: (info) => ([
          {
            loader: 'file-loader',
            options: {
              // specifies output path relative to output.path
              outputPath: 'svg',
              // specifies path to prefix url rewriting by css-loader. if the url was url(image.svg) it is now url(publicPath/image.svg).
              publicPath: path.basename(info.issuer) === 'index.html' ? './svg/' : '../svg/',
            }
          },
        ]),
      },
      {
          test: /\.js$/,
          exclude: /node_modules/,
          use: "babel-loader"
      }
    ]
  }
};