// Require Webpack
const webpack = require('webpack');

// Node's built-in path module, which prevents file path issues between operating systems
// Use NodeJS helper module to define correct absolute file reference paths
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Generates an HTML5 file for you that includes all your webpack bundles in the body using script tags
const HtmlWebpackPlugin = require('html-webpack-plugin');

// const RobotstxtPlugin = require('robotstxt-webpack-plugin').default;

const WebpackNotifierPlugin = require('webpack-notifier');

// ADDED FOR AUTOPREFIXER
const PostCSSPlugin = require('postcss-loader');


// MAIN WEBPACK CONFIGURATION
const webpackBaseConfig = function(env) {

    return {

        // Location of the index.js file
        // Where Webpack's begins it module compilation process
        entry: "./_src/js/app.js",

        // Newly compiled file configuration
        output: {

          // Save location of the newly compiled output file
          path: path.resolve(__dirname, "../web"),

          // What to call the newly compiled output file
          // [name] will be replaced with the entry objects key value.
          filename: "[name].config.base.js",

          // Path webpack will reference for looking for public files. Important for dynamic codesplitting
          publicPath: ""

        },

        // Module Rules Systems => Configuration for webpack loaders
        module: {
            rules: [
                  {
                  test: /\.vue$/,
                  loader: 'vue-loader',
                  options: {
                    loaders: {
                      // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                      // the "scss" and "sass" values for the lang attribute to the right configs here.
                      // other preprocessors should work out of the box, no loader config like this necessary.
                      'scss': 'vue-style-loader!css-loader!sass-loader',
                      'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                    // other vue-loader options go here
                  }
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                },
                {
                  test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2|otf)$/,
                  loader: 'file-loader',
                  options: {
                    name: '[name].[ext]?[hash]',
                    context: '_src/img'
                  }
                },
                {
                  test: /\.scss$/,
                  use: ExtractTextPlugin.extract({
                      use: [{loader: "css-loader"},{loader: "sass-loader"}],
                      fallback: "style-loader"
                  })
                },
            ]
        },

        // Don't follow/bundle these modules, but request them at runtime from the environment
        // externals: {
        //     Modernizr: 'modernizr'
        // },

        // Plugins => Configure webpack plugins
        plugins: [
            // The DefinePlugin allows you to create global constants which can be configured at compile time.
            // Note: process.env.NODE_ENV is set within npm "scripts"
            new webpack.DefinePlugin({
              'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }),

            // Will remove duplicate modules that exist due to "Code Splitting" to only include once within the specified bundle "names".
            new webpack.optimize.CommonsChunkPlugin({
              names: [],
              minChunks: Infinity
              // minChunks ensures that no other module goes into the vendor chunk
            }),

            // Generates an HTML5 file for you that includes all your webpack bundles in the body using script tags
            // NOTE: Add excludeChunks: ['fallback']
            new HtmlWebpackPlugin({
              template: './_src/base.html',
              filename: '../templates/_layouts/base.html',
            }),

            new WebpackNotifierPlugin({alwaysNotify: true}),

        ]
    }
};

module.exports = webpackBaseConfig;
