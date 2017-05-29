let assert = require('assert');
let sinon = require('sinon');
let Helper = require('./TestHelper');


let GrammarCollector = require(`${Helper.ROOT_DIR}utils/grammar_collector/GrammarCollector`);


describe('utils/grammar_collector/GrammarCollector класc', () => {

  describe('Конструктор', () => {
   
    Helper.assertIsClassInstance('Должен создать новый экземпляр класа GrammarCollector', GrammarCollector);
  });

  describe('Публичные методы', () => {
   
    Helper.assertPublicMethod('Должен содержать публичный метод collect()', GrammarCollector, 'collect');
  });

  describe('метод collect', () => {

    it('Должен вызвать fileSystem.readFileSync(rootDir + config, "utf-8")', () => {

      let 
        helper = Helper.collectMethod(),
        spy    = sinon.spy(helper.fakeFS, 'readFileSync');

      let grammarCollector = new GrammarCollector(helper.fakeFS, helper.rootDir, helper.config);
      grammarCollector.collect();

      assert(spy.calledWith(helper.rootDir + helper.config, 'utf-8'));
    });

    it('Должен вызвать fileSystem.readFileSync(rootDir + filename, "utf-8") для каждого файла правил в конфиге', () => {

      let 
        helper = Helper.collectMethod(),
        spy    = sinon.spy(helper.fakeFS, 'readFileSync');

      let grammarCollector = new GrammarCollector(helper.fakeFS, helper.rootDir, helper.config);
      grammarCollector.collect();

      helper.rulesFilenames.forEach((filename) => {

        assert(spy.calledWith(helper.rootDir + filename, 'utf-8'));
      });
    });

    it('Должен вернуть строку с объединенными правилами грамматики', () => {

      let helper = Helper.collectMethod();

      let grammarCollector = new GrammarCollector(helper.fakeFS, helper.rootDir, helper.config);

      assert.strictEqual(helper.mergedRules, grammarCollector.collect());
    });
  });
});
