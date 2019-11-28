const controller = require('../commands/MakeController');
const factory = require('../src/Factory');
const path = require('path');

describe('Command', () => {
    beforeEach(async () => {
        factory.setWorkingDirectory(TMP_DIR);
    });

    afterEach(async () => {
        await clearDirectories();
    })

    it.only('should create file in appropriate path', async () => {
        let output = await runCommand('make:controller HomeController', controller);
        let filePath = path.join(TMP_DIR, 'controllers', 'HomeController.js');
        expect(fileExists(filePath)).toBe(true);
    });
});