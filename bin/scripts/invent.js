'use strict';

process.on('unhandledRejection', err => {
  throw err;
});

const inquirer = require('inquirer');
const spawn = require('cross-spawn');

console.log();
const types = {
	component: { name: "组件" },
	site: {name: "站点"}
}

const selectQuestions = [
	{
		type: 'rawlist',
		message: '选择要创建的类型:',
		name: 'invent',	
		default: 0,
		choices: [
			new inquirer.Separator('----------------------'),
			...Object.keys(types)
		]
	}
];

inquirer.prompt(selectQuestions).then(answers => {
  	const inventType = answers.invent;
  	const inputQuestions = [
		{
		    type: 'input',
		    name: 'name',
		    message: `请输入${types[inventType].name}名称:`,
		    validate: function(value){
		    	if(!value){
		    		return `必须输入${types[inventType].name}名`;
		    	}
		    	return true;
		    }
		},
	]

  	inquirer.prompt(inputQuestions).then(answers => {
  		const name = answers.name;

  		switch(inventType){
  			case 'component':
			case 'site':
			case 'test':
				// exect child_process use spawn
				const result = spawn.sync(
					// command
					'node',
					// command args
					[
						require.resolve('./invent/create-' + inventType),
						name
					],
					{stdio: 'inherit'}
				);
				console.log(result.signal);
				process.exit(result.status);
				break;
			default:
				console.log(`Unknown script ${script}.`);
				break;
  		}
  	})
});