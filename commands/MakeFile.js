const cmdFactory = require('../src/Factory');
const chalk = require('chalk');

exports.command = 'make:file [name]';
exports.aliases = ['mf'];
exports.describe = 'Make a new plain file';
exports.builder = {};

const baseDir = `/`;

exports.handler = async (argv) => {

    try {
        //Generate the requested file
        cmdFactory.generateFile(argv.name, baseDir);

        console.log(chalk.green(`${argv.name} Created Successfully`));
    } catch (err) {
        console.log(chalk.red(`${err}`))
    }
}