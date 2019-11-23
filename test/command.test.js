const controller = require('../commands/MakeController');
const factory = require('../src/Factory');

describe('Command', () => {
    beforeEach(async () => {
        factory.setWorkingDirectory(TMP_DIR);
    });

    afterEach(async () => {
        await clearDirectories();
    })

    it('should create file in appropriate path', async () => {
        await runCommand('make:controller HomeController', controller).then(async res => {});
        let isFile = await factory.pathExists('controllers/HomeController.js');
        expect(isFile).toBe(true);
    });
});