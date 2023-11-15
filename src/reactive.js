import { utils } from './utils.js';

export class Dep {
  constructor() {
    this.subscribe = [];
  }

  add(watcher) {
    this.subscribe.push(watcher);
  }

  notify(newValue, oldValue) {
    this.subscribe.forEach((watcher) => {
      watcher.update(newValue, oldValue);
    });
  }
}

const dep = new Dep();

export class Watcher {
  constructor(cb) {
    this.cb = cb;
  }

  update(newValue, oldValue) {
    this.cb(newValue, oldValue);
  }
}

export class Observer {
  define(obj, key, value, enumerable = true) {
    Object.defineProperty(obj, key, {
      enumerable,
      configurable: true,
      get: () => {
        return value;
      },
      set: (newValue) => {
        if (newValue === value) {
          return;
        }

        const oldValue = value;
        value = newValue;

        this.observe(value);
        dep.notify(newValue, oldValue);
      }
    });
  }

  observe(obj) {
    if (!utils.isObject(obj)) {
      return;
    }

    Object.keys(obj).forEach((key) => {
      this.define(obj, key, obj[key], true);
    });
  }
}

dep.add(new Watcher());
