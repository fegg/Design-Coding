const CLASSLOADER = Symbol('classLoader');

/**
 * egg-loader 简单实现
 */
export class XEggLoader {
  constructor() {
    this.ctx = {};
    this.app = {};
  }

  loadToApp() {}

  loadToContext() {}

  defineContext(property) {
    Object.defineProperty(this.ctx, property, {
      get() {
        if (!this[CLASSLOADER]) {
          this[CLASSLOADER] = new Map();
        }

        const classLoader = this[CLASSLOADER];

        let instance = classLoader.get(property);
        if (!instance) {
          instance = this.getInstance({}, this);
          classLoader.set(property, instance);
        }
      },
    });
  }

  getInstance() {
    // 单例的模式
  }

  /**
   * app/controller/group/repository.js
   * app => class RepositoryController extends app.Controller {}
   */
  parseFile(files = []) {
    const items = [];

    for (const file of files) {
      const properties = this.camelize(file);
      const callPath = file.split(/[/\\]/).slice(-1) + '.' + properties.join('.');
      const exports = this.getExports(file, callPath);

      if (exports === null) {
        continue;
      }

      items.push({
        fullpath: file,
        properties,
        exports,
      });
    }

    return items;
  }

  getExports(file) {
    const obj = require(file);
    if (!obj) {
      return obj;
    }
    if (obj.__esModule) {
      return 'default' in obj ? obj.default : obj;
    }
  }

  camelize() {
    return [];
  }
}
