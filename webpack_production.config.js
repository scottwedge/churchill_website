const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const jsonImporter = require('node-sass-json-importer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  target: 'web',
  entry: {
    // link all scss, css and js files (you want linked in your index.html) here.
    // js files are linked in <body> and css files in <head>.

    index: ['./src/scss/index.scss', './src/js/index.js'],
    lemon: ['./src/scss/index.scss', './src/js/index.js'],
  },
  mode: 'production',
  output: {
    // path for ALL outputs.
    path: path.resolve(__dirname, 'dist'),
    // subdirectory and filename for js-files.
    filename: 'js/[name].bundle.js'
  },
  plugins: [
    // clean dist folder before building
    new CleanWebpackPlugin(),
    // extracting css files to files from css-loader.
    new MiniCssExtractPlugin({
      // subdirectory and filename for css-files (also scss-files).
      filename: 'css/[name].css',
    }),
    // build html from template html file
    new HtmlWebpackPlugin({
      template: './src/html/index.html',
      filename: './index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/html/lemon.html',
      filename: './html/lemon.html',
    }),
    /* any other html file:
    new HtmlWebpackPlugin({
      template: './src/html/file2.html',
      filename: './html/file2.html',
    }),
    */

    // add postcss with autoprefixer.
    new webpack.LoaderOptionsPlugin({
      options: {
          postcss: [
            // autoprefixer for automatic adding of browser prefixes, find the browserslist in package.json
            autoprefixer()
          ]
      }
    }),
  ],
  module: {
    rules: [ 
      { // copying index.html to dist and urlrewriting (img and source tag only)
        test: /\.html$/,
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
                        tag: 'img',
                        attribute: 'srcset',
                        type: 'srcset',
                      },
                      {
                        tag: 'source',
                        attribute: 'src',
                        type: 'src',
                      },
                      {
                        tag: 'source',
                        attribute: 'srcset',
                        type: 'srcset',
                      },
                    ],
                  },
              }
            }
        ]
      },
      { // process sass, scss and css files. filename specified above.
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
              implementation: require("sass"),
              sassOptions: {
                importer: jsonImporter({
                  convertCase: true
                }),
              }
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
          { // image compression
            loader: 'image-webpack-loader',
            options: {
              disable: false,
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: true,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4,
                enabled: true
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
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
              outputPath: 'vid',
              // specifies path to prefix url rewriting by css-loader. if the url was url(image.jpg) it is now url(publicPath/image.jpg).
              publicPath: path.basename(info.issuer) === 'index.html' ? './video/' : '../video/',
            }
          },
        ]),
      },
      { // svg loader
        test: /\.svg$/i,
        exclude: /font\/\S*\.svg((\?)?#\S*)?$/i,
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
        test: /font\/\S*\.(woff(2)?|ttf|eot|svg)((\?)?#\S*)?$/i,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'font',
            publicPath: '../font/',
          }
        }
      },
      { // js loader.
          test: /\.js$/,
          exclude: /node_modules/,
          use: "babel-loader"
      }
    ]
  },
  // to fix the relative path issues for scss mixins!
  // now just reference any image-file in scss modules with ~img or ~svg.
  // extend this aliases for any local file you want to reference in scss.
  resolve: {
    alias: {
      img: path.resolve(__dirname, 'src', 'img'),
      svg: path.resolve(__dirname, 'src', 'svg'),
      font: path.resolve(__dirname, 'src', 'font')
  }
  }
};
