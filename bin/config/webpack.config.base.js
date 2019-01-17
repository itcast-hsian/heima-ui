const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');
const cwd = process.cwd();

const webpackConfig = {
	entry: path.resolve(cwd, './src/index.ts'),
	module: {
    	rules: [
	    	{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
			{
				test: /\.md$/,
				loaders: [
	          		'vue-loader',
	          		{
	            		loader: 'vue-md-loader',
	            		options: {
							wrapper: "div",
							preProcess (source) {
								// console.log('pre', source)
								return source
							},
							afterProcess (result) {
								// console.log('after', result)
								return result
							},
							afterProcessLiveTemplate (template) {
								return `<div class="live-wrapper">${template}</div>`
							},
							rules: {
								'table_open': () => '<div class="table-responsive"><table class="table">',
								'table_close': () => '</table></div>'
							}
	            		}
	          		}
	        	]
			},
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
				options: {
				  	appendTsSuffixTo: [/\.vue$/],
				}
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
				  	name: '[name].[ext]?[hash]'
				}
			}, 
			{
        		test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'fonts/[name].[hash:7].[ext]'
				}
        	}
		]
	},
	resolve: {
	    extensions: ['.ts', '.js', '.vue', '.json'],
	    alias: {
			'vue$': 'vue/dist/vue.esm.js'
	    }
	},
	performance: {
		hints: false
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: paths.appHtml,
			inject: true
		}),
		new VueLoaderPlugin()
	]

}

module.exports = {
	webpackConfig
}