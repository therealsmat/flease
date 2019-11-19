exports.command = 'make:controller [name]';

exports.aliases = ['mc'];

exports.describe = 'Make a new controller';

exports.builder = {};

exports.handler = (argv) => {
    console.log('Created new controller '+argv.name);
}