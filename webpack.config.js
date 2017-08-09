var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractPlugin = new ExtractTextPlugin({
	filename: 'main.css'
});

var webpackConfig = {
	entry: "./_src/js/app.js",
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/dist',
		filename: "bundle.js"
	},
	module: {
		rules: [
		    {
	        test: /\.js$/,
	        use: [
	            {
	                loader: 'babel-loader',
	                options: {
	                    presets: ['es2015']
	                }
	            }
	        ]
		    },
		    {
	        test: /\.scss$/,
	        use: extractPlugin.extract({
	            use: ['css-loader', 'sass-loader']
	        })
		    },
		],
	},
	plugins:[
		extractPlugin
	]
};

module.exports = webpackConfig;
