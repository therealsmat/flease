const fs = require('fs-extra');
const { promisify } = require('util');
const makeDirectory = promisify(fs.mkdir);
const makeNewFile = promisify(fs.outputFile);
const stat = promisify(fs.stat);
const path = require('path');

exports.cwd;

exports.configPublishPath = `${process.cwd()}/flease.json`;

exports.getStubFromFile = async (category) => {
    let stub;
    await fs.readJson(exports.configPublishPath).then(res => {
        let data = res[category];
        stub = data ? data.join('') : '';
    }).catch(async err => {
        if (err.code == 'ENOENT') {
            stub = await exports.fetchStub(category)
        }
    });
    return stub;
}

exports.setWorkingDirectory = (cwd) => {
    exports.cwd = cwd || process.cwd();
}

exports.checkBaseDirectory = async (baseDir) => {
    let response = false;
    baseDir = path.join(exports.cwd, baseDir);
    await makeDirectory(baseDir, '0777')
        .then(res => response = baseDir)
        .catch(err => {
            if (err.code == 'EEXIST') { response = baseDir }
        });
    return response;
}

exports.createNewFile = async (fileName, dir = '', content = '', ext = 'js') => {
    let success = false;
    let filePath = path.join(exports.cwd, dir, `${fileName}.${ext}`);

    await makeNewFile(filePath, content, 'ascii')
        .then(res => success = filePath)
        .catch(err => success = false );

    return success;
}

exports.pathExists = async (pathName) => {
    let success = false;
    await stat(path.join(exports.cwd, pathName))
        .then(res => success = true)
        .catch(err => { 
            if (err.code == 'ENOENT') success = false;
        });
    return success;
}

// Wrapper around creation methods
exports.generateFile = async (name, dir, content) => {
    const _this = exports;
    if (!_this.cwd) _this.setWorkingDirectory();
    await _this.checkBaseDirectory(dir);
    await _this.createNewFile(name, dir, content);
}

exports.fetchStub = async (category) => {
    let stub;
    await fs.readJson(`${__dirname}/../stubs/Stub.json`).then(res => {
        stub = res[category];
    });
    return stub ? stub.join('') : '';
}

exports.generateStub = async(model, category) => {
    let stub = await exports.getStubFromFile(category);
    let camelCase = exports.toCamelCase(model);
    stub = stub.replace(/#{name}/g, camelCase);
    stub = stub.replace(/#{model}/g, model);
    return stub;
}

exports.toCamelCase = (str) => {
    return str.charAt(0).toLowerCase() + str.substring(1);
}