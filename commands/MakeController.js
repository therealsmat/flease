const cmdFactory = require('../src/Factory');

exports.command = 'make:controller [name]';
exports.aliases = ['mc'];
exports.describe = 'Make a new controller';
exports.builder = {};

const baseDir = `/controllers`;

exports.handler = async (argv) => {
    //Generate the requested file
    cmdFactory.generateFile(argv.name, baseDir);
}