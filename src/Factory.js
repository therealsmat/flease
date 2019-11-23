const fs = require('fs-extra');
const { promisify } = require('util');
const makeDirectory = promisify(fs.mkdir);
const makeNewFile = promisify(fs.outputFile);
const stat = promisify(fs.stat);
const path = require('path');

exports.cwd;

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

exports.createNewFile = async (fileName, dir = '', ext = 'js') => {
    let success = false;
    let filePath = path.join(exports.cwd, dir, `${fileName}.${ext}`);
    await makeNewFile(filePath, 'Hello')
        .then(res => success = filePath)
        .catch(err => success = false );
    return success;
}

exports.pathExists = async (pathName) => {
    let success = false;
    await stat(path.join(exports.cwd, pathName))
        .then(res => success = true)
        .catch(err => { 
            console.log(`${err}`);
        });
    return success;
}