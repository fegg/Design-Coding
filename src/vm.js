import {utils} from "./utils.js";

class Dep {
  constructor() {
    this.subscribes = [];
  }

  add(subscribe) {
    if (!utils.isFunction(subscribe)) {
      return;
    }

    this.subscribes.push(subscribe);
  }

  notify(newValue, oldValue) {
    this.subscribes.forEach((subscribe) => {
      subscribe.update(newValue, oldValue);
    });
  }
}

const dep = new Dep();

class Watcher {
  constructor(callback) {
    this.callback = callback;
  }

  update(newValue, oldValue) {
    this.callback(newValue, oldValue);
  }
}

function observe(obj) {
  if (!utils.isObject(obj)) return;

  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key]);
  });
}

function defineReactive(obj, key, value, enumerable) {
  observe(value);

  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable,
    get: () => {
      return value;
    },
    set: (newValue) => {
      if (newValue === value) return;

      const oldValue = value;
      value = newValue;
      observe(newValue);
      dep.notify(newValue, oldValue);
    }
  })
}

const o = {
  a: 1,
  d: {
    e: 2,
  },
};

observe(o);

dep.add(new Watcher((newValue, oldValue) => {
  console.log('newValue, oldValue', newValue, oldValue);
}));

o.a = 2

o.d.e = 22;
