'use strict';

const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const os = require('os');

const packageName = process.argv.slice(2)[0];
const root = process.cwd();

// path
const prefix = "hm-";
const templatePath = path.join(root, "bin/template/component");
const componentsPath = path.join(root, "components");
const componentsConfig = path.join(componentsPath,"_components.json");
const targetPath = path.join(componentsPath, packageName);

function createComponent(){

	if(fs.existsSync( path.resolve(targetPath))){
		console.log(chalk.red(
	    	`该组件已存在，请检查文件名`
	    ));
	    return;
	}

	fs.ensureDirSync(targetPath);

	if(fs.existsSync(templatePath)){
		fs.copySync(templatePath, targetPath);

		// write configure
		const config = require(componentsConfig);

		config.push({
			name: `${prefix}${packageName}`,
			path: `./${packageName}`
		})

		fs.writeFileSync(
			componentsConfig,
			JSON.stringify(config, null, 2) + os.EOL
		)

		console.log(chalk.green(
	    	`组件创建成功`
	    ));
	}else{
		console.error(
	    	`未发现该模板: ${chalk.green(templatePath)}`
	    );
	    return;
	}
}

createComponent();