#! /usr/bin/env node
const yargs = require('yargs');
const fs = require('fs');
const path = require('path');

// fetch all commands...
const allCommands = () => {
    const directory = path.join(__dirname, '/../commands');
    const commands = [];
    fs.readdirSync(directory).forEach(file => {
        commands.push(file);
    });
    return commands;
}

// build the object...
const builder = yargs;
allCommands().forEach(command => {
    builder.command(require(`../commands/${command}`));
});

// Run the app...
const run = builder.argv;
