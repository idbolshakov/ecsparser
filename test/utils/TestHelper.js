const assert = require('assert');

/**
 * Базовый класс с вспомогательными методами для юнит-тестирования
 *
 * @author idbolshakov@gmail.com
 */
class TestHelper {

  /**
   * Метод для проверки, что переданный объект - класс
   *
   * @public
   */
  static assertIsClassInstance(description, classObject) {

    it(description, () => {

      let  instance = new classObject();

      assert(instance instanceof classObject);
    });
  }

  /**
   * Метод для проверки наличия у объекта публичного метода
   *
   * @public
   */

  static assertPublicMethod(description, classObject, method) {

    it(description, () => {

      let instance = new classObject();

      assert.equal('function', typeof instance[method]);
    });
  }
}

module.exports = TestHelper;
