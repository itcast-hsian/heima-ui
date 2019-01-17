'use strict'

const merge = require('webpack-merge')
const webpack = require('webpack');
const { webpackConfig } = require("./webpack.config.base");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const paths = require('./paths');

module.exports = merge(webpackConfig, {
	mode: 'production',
	output:{
  		pathinfo: false,
		path: paths.appBuild,  
		filename: `js/[name].js`,
		chunkFilename: 'vendors/js/[name].chunk.js',
		publicPath: `/`
  	},
	devtool: "none",
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				uglifyOptions: {
					warnings: false,
					parse: {},
					compress: {},
					mangle: true, // Note `mangle.properties` is `false` by default.
					output: null,
					toplevel: false,
					nameCache: null,
					ie8: false,
					keep_fnames: false,
				},
				parallel: true,
				cache: true,
				sourceMap: false,
			}),

			new OptimizeCSSAssetsPlugin({ }),
		],
		// Automatically split vendor and commons
		splitChunks: {
	    	chunks: 'all',
	    	name: 'vendors',
	    },
	},
	module: {
		rules: [
			{
				test: /\.css?$/,
				use: [
			  		MiniCssExtractPlugin.loader, 
			  		'css-loader'
				]
			}, {
				test: /\.styl(us)?$/,
				use: [
		  			MiniCssExtractPlugin.loader, 
		  			'css-loader', 
		  			'stylus-loader'
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
      		// both options are optional
      		filename: 'css/[name].[contenthash:8].css',
      		chunkFilename: 'css/[name].chunk.css',
		}),
		new ManifestPlugin({
	    	fileName: 'asset-manifest.json',
	    }),
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		new CopyWebpackPlugin([{
			from: paths.appPublic,
			to: paths.appBuild,
			toType: 'dir'
	    }])
	]

})