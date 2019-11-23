const cmdFactory = require('../src/Factory');

exports.command = 'make:file [name]';
exports.aliases = ['mf'];
exports.describe = 'Make a new plain file';
exports.builder = {};

const baseDir = `/`;

exports.handler = async (argv) => {
    //Generate the requested file
    cmdFactory.generateFile(argv.name, baseDir);
}