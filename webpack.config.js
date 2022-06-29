const path = require("path");
const webpack = require("webpack");
const Dotenv = require('dotenv-webpack')

module.exports = env => {
	return {
		mode: "production",
		entry: "./client/src/index.js",
		output: {
			path: path.resolve(__dirname, "./client/public"),
			filename: "main.js"
		},
		target: "web",
		devServer: {
			port: "9500",
			static: ["./client/public"],
			open: true,
			hot: true,
			liveReload: true
		},
		resolve: {
			extensions: ['.js', '.jsx', '.json']
		},
		module: {
			rules: [
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader'],
				},
				{
					test: /\.(js|jsx)$/,
					exclude: ['/node_modules/', '/server/'],
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env', '@babel/preset-react']
						}
					}
				}
			]
		},
		plugins: [
			new Dotenv({
				path: `./.env${env.file ? `.${env.file}` : ''}`
			})
		]
	}
}