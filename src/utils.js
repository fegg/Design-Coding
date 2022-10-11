import { XPromise } from './XPromise.js';

export const utils = {
  type(x) {
    return Object.prototype.toString.call(x);
  },
  isObject(obj) {
    return obj !== null && typeof obj === 'object';
  },
  isFunction(fn) {
    return typeof fn === 'function';
  },
  isXPromiseInstance(promise) {
    // cycle deps
    return promise instanceof XPromise;
  },
  isArray(arr) {
    return Array.isArray ? Array.isArray : this.type(arr) === '[object Array]';
  }
};
