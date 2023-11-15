// https://github.com/galvez/fast-path-set/blob/main/index.js

'use strict'

import { utils } from './utils.js';

export function set (obj, path, value) {
  if (obj == null) {
    throw new TypeError('obj is null or undefined')
  }
  const len = path.length
  let i = 0, l = 0, prop = ''
  while (i < len) {
    if (path[i] === '.') {
      prop = path.slice(l, i)

      switch (prop.length) {
        case 9:
          if (prop === '__proto__' || prop === 'prototype') {
            return
          }
          break
        case 11:
          if (prop === 'constructor') {
            return
          }
          break
      }

      switch (typeof obj[prop]) {
        case 'object':
          obj = obj[prop]
          break
        case 'undefined':
          obj = obj[prop] = {}
          break
        default:
          return
      }
      l = ++i
      continue
    }
    i++
  }
  obj[path.slice(l, i)] = value
}

export function setter(obj, path, value) {
  if (obj === null || !utils.isObject(obj)) {
    throw new TypeError('参数必须是一个合法对象');
  }

  const pathLink = path.split('.');
  let len = pathLink.length;
  let key = pathLink.pop();
  let i = 0;

  while (key = pathLink.pop()) {
    if (utils.isUndefined(obj[key])) {
      obj = obj[key] = {};
    } else if (utils.isObject(obj[key])) {
      obj = obj[key];
    } else if (len - 1 === i) {
      obj[key] = value;
    }
    i++;
  }
}

export function getter(obj, path, defaultValue = null) {
  const pathLink = path.split('.');
  let result = obj;

  for (let i = 0; i < pathLink.length; i++) {
    const key = pathLink[i];

    if (utils.isUndefined(result[key])) {
      result = defaultValue;
      break;
    } else {
      result = result[key];
    }
  }
  return result;
}
