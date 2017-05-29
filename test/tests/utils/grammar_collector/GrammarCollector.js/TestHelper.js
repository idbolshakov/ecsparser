const TEST_ROOT_DIR  = '../../../../';
const BaseTestHelper = require(`${TEST_ROOT_DIR}utils/TestHelper`);

class TestHelper extends BaseTestHelper {

  static collectMethod() {

    let 
      rootDir        = 'root/',
      config         = 'config.cfg',
      rulesFilenames = ['a', 'b', 'c'],
      mergedRules    = rulesFilenames.reduce((rules, filename) => {
        return rules + `content from ${filename};`;
      }, '');

    return {

      fakeFS: {

        readFileSync: (filename) => { 
          
          // Если чтение конфига
          if (filename === rootDir + config) {

            return JSON.stringify(rulesFilenames);
          }

          // Если чтение файла с набором правил из конфига
          if (~rulesFilenames.indexOf(filename.slice(rootDir.length))) {

            return `content from ${filename.slice(rootDir.length)};`;
          }
        }
      },
      rootDir: rootDir,
      config: config,
      rulesFilenames: rulesFilenames,
      mergedRules: mergedRules
    }
  }
}
TestHelper.ROOT_DIR = `${TEST_ROOT_DIR}../`;

module.exports = TestHelper;
