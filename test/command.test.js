const controller = require('../commands/MakeController');
const factory = require('../src/Factory');
const fs = require('fs-extra');
const path = require('path');

describe('Command', () => {
    beforeEach(async () => {
        factory.setWorkingDirectory(TMP_DIR);
    });

    afterEach(async () => {
        await clearDirectories();
    })

    it.only('should create file in appropriate path', async () => {
        await runCommand('make:controller HomeController', controller).then(async res => {});
        let isFile = false;
        await fs.ensureFile(path.join(TMP_DIR, 'controllers', 'HomeController'))
                .then(res => isFile = true)
                .catch(err => isFile = false);

        expect(isFile).toBe(true);
    });
});