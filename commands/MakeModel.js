exports.command = 'make:model [name]';

exports.aliases = ['mm'];

exports.describe = 'Make a new model';

exports.builder = {};

exports.handler = (argv) => {
    console.log(argv.name);
}