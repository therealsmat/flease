exports.command = 'make:file [name]';

exports.aliases = ['mf'];

exports.describe = 'Make a new plain file';

exports.builder = {};

exports.handler = (argv) => {
    console.log('Created new file '+argv.name);
}