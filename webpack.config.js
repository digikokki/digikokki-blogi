var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var webpack = require('webpack');

var webpackConfig = {
	entry: "./_src/js/app.js",
	output: {
		path: path.resolve(__dirname, 'web'),
		publicPath: '/web',
		filename: "js/bundle.js"
	},
	module: {
		rules: [
			{
				test:[/\.js$/],
				use: 'babel-loader',
			},
			{
          test: /\.scss/,
          enforce: "pre",
          loader: 'import-glob-loader'
 			},
			{
        test: [ /\.scss$/, /\.css$/, ],
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            { loader: 'sass-loader' }
          ], }),
      },
			{
			  test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2|otf)$/,
			  use:  [
					{ loader:'file-loader',
						options: {
							context: '_src/img'
						}
					}
				]
			},
    ],
	},
	plugins: [
		new ExtractTextPlugin({ filename: getPath => getPath('css/[name].min.css').replace('css/js', 'css'), allChunks: true, })
	]
};

module.exports = webpackConfig;
