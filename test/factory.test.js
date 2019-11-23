const fs = require('fs-extra');
const factory = require('../src/Factory');
const os = require('os');
const path = require('path');
const {promisify} = require('util');


describe('Controller', () => {
    beforeEach(async () => {
        factory.setWorkingDirectory(TMP_DIR);
    })

    afterEach(async () => {
        await clearDirectories();
    })

    it('creates base directory if it does not exist', async () => {
        await factory.checkBaseDirectory('models');
        exists = await factory.pathExists('models');
        expect(exists).toBe(true);
    });

    it('creates the files in the current working directory', async () => {
        let baseDir = await factory.checkBaseDirectory('models');
        const pieces = baseDir.split('/');
        let parent = pieces.splice(0, (pieces.length - 1)).join('/');
        expect(parent).toBe(TMP_DIR);

        let model = await factory.createNewFile('User', 'models');
        const modelPieces = model.split('/');
        let modelParent = modelPieces.splice(0, (modelPieces.length - 1)).join('/');
        expect(modelParent).toBe(`${TMP_DIR}/models`);
    });
});