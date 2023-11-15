/**
 * EventBus 的各种实现
 */

export class EventBusRuntime {
  constructor() {
    this.data = {};
    this.triggerStateRecord = {};
  }

  buildDataKey(event) {
    return `${event.name}_${event.cursor}`;
  }

  buildDataValue(event, result) {
    return {
      event,
      result: result ?? null,
    };
  }

  record(event, result) {
    const dataValue = this.buildDataValue(event, result);
    const dataKey = this.buildDataKey(event);

    if (!this.data[dataKey]) {
      this.data[dataKey] = [];
    }

    this.data[dataKey].push(dataValue);
  }

  startTrigger(event) {
    const eventName = event.name;
    if (!this.triggerStateRecord[eventName]) {
      this.triggerStateRecord[eventName] = true;
    }
  }

  endTrigger(event) {
    const eventName = event.name;
    if (this.triggerStateRecord[eventName]) {
      this.triggerStateRecord[eventName] = false;
    }
  }
}

export class EventBusBeforeHook {
  constructor() {
    /**
     * [eventName]: [event1, event2],
     */
    this.listeners = {};

    this.TYPE_KEYS = {
      FUNCTION: 'FUNCTION',
      CONFIG: 'CONFIG',
    };

    this.cursor = 0;
  }

  getHandleType(handler) {
    if (typeof handler === 'function') { // isFunction
      return this.TYPE_KEYS.FUNCTION;
    } else if (typeof handler === 'object') { // isObject
      return this.TYPE_KEYS.CONFIG;
    }
    throw new Error('请按照 API 传入回调参数');
  }

  getLowerIndex(eventName, beforeArray) {
    const indexArray = [];

    this.listeners[eventName].forEach((event) => {
      const isIn = beforeArray.indexOf(event.fn.name) > -1;
      if (isIn) {
        indexArray.push(event.cursor);
      }
    });

    const sortResult = indexArray.sort((a, b) => a - b);
    const lower = sortResult[0];

    return lower;
  }

  on(eventName, handler) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    const handlerType = this.getHandleType(handler);

    const newFnIndex = this.cursor++;

    if (handlerType === this.TYPE_KEYS.FUNCTION) {
      this.listeners[eventName].push({
        fn: handler,
        before: [],
        cursor: newFnIndex,
      });
    } else if (handlerType === this.TYPE_KEYS.CONFIG) {
      const { before, fn } = handler ?? {};

      const slotIndex = this.getLowerIndex(eventName, before);

      if (slotIndex > 0) {
        this.listeners[eventName].splice(slotIndex - 1, 0, {
          fn,
          before,
          cursor: newFnIndex,
        });
      }
    }
  }

  trigger(eventName, payload) {
    const callStack = [];

    return new Promise((resolve) => {
      this.listeners[eventName].forEach((item) => {
        callStack.push(item.before);
        item.fn(payload);
      });

      resolve();
    })
  }
}

export class EventBus {
  constructor() {
    /**
     * [eventName]: []
     */
    this.listeners = {};
  }

  isFunction(fn) {
    return typeof fn === 'function';
  }

  on(eventName, handler, options = {}) {
    if (!this.isFunction(handler)) {
      console.warn('handler must is function');
      return;
    }

    if (options.once) {
      handler.once = true;
    }

    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].push(handler);
  }

  off(eventName, handlerName) {
    if (!this.listeners[eventName]) {
      return;
    }

    if (!handlerName) {
      delete this.listeners[eventName];
      return;
    }

    this.listeners[eventName] = this.listeners[eventName].filter((fn) => {
      return fn !== handlerName;
    });
  }

  once(eventName, handler) {
    this.on(eventName, handler, { once: true });
  }

  emit(eventName, payload, options = {}) {
    if (!this.hasEvent(eventName)) {
      console.warn(`${eventName} 没有监听`);
      return;
    }

    const context = options.context ?? this;
    const functions = this.listeners[eventName];

    functions.forEach((fn, index) => {
      fn.call(context, payload);

      if (fn.once) {
        this.off(eventName, fn);
      }
    });
  }

  hasEvent(eventName) {
    return this.listeners[eventName];
  }
}

export class EventHookBus {
  static TypeEnum = {
    FUNCTION: 'FUNCTION',
    CONFIG: 'CONFIG',
  };

  constructor() {
    /**
     * @type {{[typeName]: Array<{fn: Function, before: Array<string>}}}
     */
    this._listeners = {};
    this._cursor = 0;
    this._runtime = new EventBusRuntime();
  }

  isObject(obj) {
    const type = typeof obj;

    return obj !== null && (type === 'object' || type === 'function');
  }

  isFunction(obj) {
    return typeof obj === 'function';
  }

  isPromise(obj) {
    if (!obj) {
      return false;
    }

    return obj instanceof Promise || (typeof obj === 'object' && typeof obj.then === 'function');
  }

  /**
   * @description 监听事件
   * @param eventName {string}
   * @param handler {Function|Object}
   */
  on(eventName, handler) {
    if (!eventName) {
      throw new Error('监听名称不能为空');
    }

    if (!handler) {
      throw new Error(`必须传入回调函数或者配置：{fn: Function, before: Array<Function>}`);
    }

    const handlerType = this.getHandlerType(handler);
    if (!handlerType) {
      throw new Error('请传入合适参数');
    }

    this._cursor++;
    const _eventName = eventName;

    if (!this._listeners[_eventName]) {
      this._listeners[_eventName] = [];
    }

    if (handlerType === EventHookBus.TypeEnum.FUNCTION) {
      this._listeners[_eventName].push({
        fn: handler,
        name: this.getFunctionName(handler),
        before: [],
        cursor: this._cursor,
      });
    } else if (handlerType === EventHookBus.TypeEnum.CONFIG) {
      const { before = [], fn } = handler;

      const slotIndex = this.getBeforeLowIndex(eventName, before);

      if (slotIndex >= 0) {
        this._listeners[_eventName].splice(slotIndex - 1, 0, {
          fn,
          name: this.getFunctionName(handler),
          before,
          cursor: this._cursor,
        });
      } else {
        this._listeners[_eventName].push({
          fn,
          name: this.getFunctionName(handler),
          before,
          cursor: this._cursor,
        });
      }
    }
  }

  trigger(eventName, payload) {
    return new Promise((resolve, reject) => {
      this._listeners[eventName].forEach((event) => {
        this._runtime.startTrigger(event);
        try {
          const result = event.fn(payload);
          if (this.isPromise(result)) {
            result.then((res) => {
              this._runtime.record(event, res);
              resolve(this._runtime);
            }).catch((err) => {
              this._runtime.record(event, err);
              reject(this._runtime);
            });
          } else {
            this._runtime.record(event, result);
            resolve(this._runtime);
          }
        } catch (err) {
          this._runtime.record(event, err);
          reject(this._runtime);
        } finally {
          this._runtime.endTrigger(event);
        }
      });
    });
  }

  getFunctionName(fn) {
    if (!fn) {
      throw new Error('事件函数不能为空');
    }

    return fn.name || 'event_' + fn.cursor;
  }

  getHandlerType(handler) {
    if (this.isFunction(handler)) { // isFunction
      return EventHookBus.TypeEnum.FUNCTION;
    } else if (this.isObject(handler)) { // isObject
      return EventHookBus.TypeEnum.CONFIG;
    }
    return '';
  }

  /**
   * @description 找到 before 对应插入的 index
   * @param eventName
   * @param beforeArray
   */
  getBeforeLowIndex(eventName, beforeArray) {
    if (!beforeArray || beforeArray.length <= 0) {
      return -1;
    }

    const handlers = this._listeners[eventName];
    const indexArr = [];

    handlers.forEach((handler) => {
      const isIn = beforeArray.indexOf(this.getFunctionName(handler.fn)) > -1;
      if (isIn) {
        indexArr.push(handler.cursor);
      }
    });

    if (indexArr.length === 0) {
      console.warn(`${eventName} before 中的事件未发现`);
      return -1;
    }

    const sortResult = indexArr.sort((a, b) => a - b);
    return sortResult[0];
  }
}

const bus = new EventHookBus();
// bus.on('event', function listener1(arg1) {
//   console.log('trigger listener1', arg1);
// })
// bus.trigger('event', { name: '1' })
// bus.on('event', function listener1() {
//   console.log('trigger listener1');
// });
// bus.on('event', {
//   fn: function listener2() {
//     console.log('trigger listener2');
//   },
//   // before: ['listener1']
// })
//
// bus.trigger('event', { name: '1' })

bus.on('event2', function listener2() {
  console.log('trigger listener2');
})

bus.on('event3', function listener3() {
  console.log('trigger listener3');
})

bus.on('event1', function listener1() {
  bus.trigger('event2')
  return new Promise(function (resolve) {
    setTimeout(function () {
      bus.trigger('event3').then(resolve).catch((err) => {
        console.log('event3',err);
        resolve(err);
      })
    }, 1000)
  })
})

bus.trigger('event1').then(function (callStack) {
  console.log('callStack:', callStack);
})
