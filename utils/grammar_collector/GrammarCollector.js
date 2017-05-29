/**
 * Класс отвечает за сборку правил грамматики
 * для генератора грамматик PEG.js
 *
 * @author idbolshakov@gmail.com
 */
class GrammarCollector {

  /**
   * конструктор
   *
   * @public
   * @param {object} fileStystem - объект для работы с файловой системой
   * @param {string} rootDir     - корневой каталог с грамматикой метаязыка 
   * @param {string} config      - название файла с конфигурацией метаязыка
   */
  constructor(fileSystem, rootDir, config) {

    this._fileSystem = fileSystem;
    this._rootDir    = rootDir;
    this._config     = config;
  }

  /**
   * Собирает правила грамматики метаязыка из конфига и возвращает их
   *
   * @public
   * @return {string} - правила грамматики метаязыка
   */
  collect() {

    let config = JSON.parse(this._fileSystem.readFileSync(this._rootDir + this._config, 'utf-8'));

    return this._mergeRulesFromConfig(config);
  }

  /**
   * читает правила файлы с правилами грамматики и объединяет их содержимое в одну строку
   *
   * @private
   * @param {array} config - массив с названиями файлов с правилами грамматики
   * @return {string} - правила грамматики метазяыка
   */
  _mergeRulesFromConfig(config) {
    return config.reduce((rules, filename) => {

      return rules + this._fileSystem.readFileSync(this._rootDir + filename, 'utf-8');
    }, '');
  }
} 

module.exports = GrammarCollector;
