const cmdFactory = require('../src/Factory');

exports.command = 'make:model [name]';
exports.aliases = ['mm'];
exports.describe = 'Make a new model';
exports.builder = {};

const baseDir = `/models`;

exports.handler = async (argv) => {
    //Generate the requested file
    cmdFactory.generateFile(argv.name, baseDir);
}