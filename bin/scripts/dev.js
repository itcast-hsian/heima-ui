'use strict';

process.on('unhandledRejection', err => {
  throw err;
});

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const chalk = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const paths = require('../config/paths');
const webpackConfig = require('../config/webpack.config.dev');
const { urlConfig, createDevServerConfig } = require('../config/webpack.config.devServer');
const { createCompiler } = require('./utils/WebpackDevServerUtils');

const appName = require(paths.appPackageJson).name;
const serverConfig = createDevServerConfig();

if(process.env.HOST){
	console.log(
		chalk.cyan(
	      	`Attempting to bind to HOST environment variable: ${chalk.yellow(
	        	chalk.bold(process.env.HOST)
	      	)}`
	    )
	)
}

WebpackDevServer.addDevServerEntrypoints(webpackConfig, serverConfig);
const compiler = createCompiler(
  	webpack,
  	webpackConfig,
  	appName
);
const devServer = new WebpackDevServer(compiler, serverConfig);

devServer.listen(urlConfig.port, urlConfig.host, err => {
	if(err){
		return console.log(err);
	}
	//const urlPath = `${urls.localUrlForBrowser}${userConfig.name}/${userConfig.apps[0]}`;
	console.log(chalk.cyan('Starting the development server...\n'));
	//console.log(urlPath);
	console.log(chalk.cyan(`open ${urlConfig.host}:${urlConfig.port}`));
	console.log()
	//openBrowser(urlPath);
})






