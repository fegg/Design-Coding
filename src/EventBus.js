/**
 * EventBus 的各种实现
 */
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

    this.fnIndex = 0;
  }

  getHandleType(handler) {
    if (typeof handler === 'function') { // isFunction
      return this.TYPE_KEYS.FUNCTION;
    } else if (typeof handler === 'object') { // isObject
      return this.TYPE_KEYS.CONFIG;
    }
    // throw new Error('请按照 API 传入回调参数');
  }

  getLowerIndex(eventName, beforeArray) {
    const indexArray = [];

    this.listeners[eventName].forEach((event) => {
      const isIn = beforeArray.indexOf(event.fn.name) > -1;
      if (isIn) {
        indexArray.push(event.fnIndex);
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

    const newFnIndex = this.fnIndex++;

    if (handlerType === this.TYPE_KEYS.FUNCTION) {
      this.listeners[eventName].push({
        fn: handler,
        before: [],
        fnIndex: newFnIndex,
      });
    } else if (handlerType === this.TYPE_KEYS.CONFIG) {
      // TODO 判断下参数，null
      const { before, fn } = handler ?? {};

      const slotIndex = this.getLowerIndex(eventName, before);
      this.listeners[eventName].splice(slotIndex - 1, 0, {
        fn,
        before,
        fnIndex: newFnIndex,
      });
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
