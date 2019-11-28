const cmdFactory = require('../src/Factory');
const chalk = require('chalk');

exports.command = 'make:model [name]';
exports.aliases = ['mm'];
exports.describe = 'Make a new model';
exports.builder = {};

const baseDir = `models`;


exports.handler = async (argv) => {

    try {
        //Generate the requested file
        let content = await cmdFactory.generateStub(argv.name, baseDir);

        await cmdFactory.generateFile(argv.name, baseDir, content);

        console.log(chalk.green("Model Created Successfully"));
    } catch (err) {
        console.log(chalk.red(`${err}`))
    }
}