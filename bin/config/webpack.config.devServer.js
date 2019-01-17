'use strict';

const webpackConfig = require('./webpack.config.dev');

const urlConfig = {
  host: process.env.HOST || '0.0.0.0',
  port: parseInt(process.env.PORT, 10) || 4000,
  protocol: process.env.HTTPS === 'true' ? 'https' : 'http'
}

const createDevServerConfig = function() {
	return {
		clientLogLevel: 'warning',
		hot: true,
		open: true,
		contentBase: webpackConfig.output.path,
		watchContentBase: true,
		compress: true,
		host: urlConfig.host,
		port: urlConfig.port,		
		overlay: { warnings: false, errors: true },
		publicPath: webpackConfig.output.publicPath,
		watchOptions: {
			ignored: ""
	    },
	    quiet: true,
	    https: urlConfig.protocol === 'https',
	    historyApiFallback: true,
	}
}

module.exports = {
  urlConfig,
  createDevServerConfig
}