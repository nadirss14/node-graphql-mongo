const path = require('path');
var nodeExternals = require('webpack-node-externals');
require('dotenv').config();

const { NODE_ENV } = process.env;
console.log(NODE_ENV);

module.exports = {
	entry: './src/server.js',
	module: {
		rules: [
			{
				test: /\.(js)$/,
				exclude: path.resolve(__dirname, '/node_modules'),
				use: ['babel-loader'],
			},
		],
	},
	resolve: {
		extensions: ['*', '.js'],
	},
	target: 'node',
	mode: NODE_ENV,
	output: {
		path: path.join(__dirname, '/dist'),
		publicPath: '/',
		filename: 'server.bundle.js',
	},
	externals: [nodeExternals()],
};
