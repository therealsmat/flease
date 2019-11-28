const cmdFactory = require('../src/Factory');
const fs = require('fs-extra');
const chalk = require("chalk");
const {
    promisify
} = require('util');
const makeNewFile = promisify(fs.outputFile);
const path = require('path');

exports.command = 'make:controller [name] [--model]';
exports.aliases = ['mc'];
exports.describe = 'Make a new controller';
exports.builder = {};

const baseDir = `controllers`;

exports.handler = async (argv) => {
    let content = '//';

    try {
        if (argv.model) {
            content = await exports.generateStub(argv.model, baseDir);
        }
        await cmdFactory.generateFile(argv.name, baseDir, content);
        console.log(chalk.green(`Controller Created Successfully`));
    } catch (err) {
        console.log(chalk.red(`${err}`))
    }
}

exports.generateStub = async (model, category) => {
    let stub = await cmdFactory.getStubFromFile(category);
    if (model) {
        stub = stub.replace(/#{model}/g, model);
    }
    return stub;
}