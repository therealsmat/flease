const cmdFactory = require('../src/Factory');

exports.command = 'make:controller [name]';
exports.aliases = ['mc'];
exports.describe = 'Make a new controller';
exports.builder = {};

const baseDir = `/controllers`;

exports.handler = async (argv) => {
    if (!cmdFactory.cwd) cmdFactory.setWorkingDirectory();

    let base = await cmdFactory.checkBaseDirectory(baseDir);
    let result = await cmdFactory.createNewFile(argv.name, baseDir);
}