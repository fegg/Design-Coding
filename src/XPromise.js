import { utils } from './utils.js';

export class XPromise {
  static STATE = {
    PENDING: 0,
    FULFILLED: 1,
    REJECT: 2,
  };

  constructor(execute) {
    // 初始状态为 pending
    this.state = XPromise.STATE.PENDING;
    this.result = null;

    // 多次 then pending 队列
    this.resolvePendingQueue = [];
    this.rejectPendingQueue = [];

    // 避免执行时候 this 问题
    const resolve = this.resolve.bind(this);
    const reject = this.reject.bind(this);

    try {
      execute(resolve, reject);
    } catch (exp) {
      // 如果异常
      reject(exp);
    }
  }

  tick(fn) {
    setTimeout(() => fn(), 0);
  }

  resolve(result) {
    if (this.state === XPromise.STATE.PENDING) {
      this.tick(() => {
        this.state = XPromise.STATE.FULFILLED;
        this.result = result;

        this.resolvePendingQueue.forEach((cb) => cb(result));
      });
    }
  }

  reject(reason) {
    if (this.state === XPromise.STATE.PENDING) {
      this.tick(() => {
        this.state = XPromise.STATE.REJECT;
        this.result = reason;

        this.rejectPendingQueue.forEach((cb) => cb(reason));
      });
    }
  }

  then(onResolve, onReject) {
    const _onResolve = utils.isFunction(onResolve) ? onResolve : value => value;
    const _onReject = utils.isFunction(onReject) ? onReject : (reason) => {
      throw new Error(reason);
    };

    return new XPromise((resolve, reject) => {
      const resolved = () => {
        this.tick(() => {
          try {
            const value = _onResolve(this.result);
            utils.isXPromiseInstance(value) ? value.then((res) => resolve(res)) : resolve(value);
          } catch (e) {
            reject(e);
          }
        });
      };
      const rejected = () => {
        this.tick(() => {
          try {
            const value = _onReject(this.result);
            utils.isXPromiseInstance(value) ? value.then((res) => reject(res)) : reject(value);
          } catch (e) {
            reject(e);
          }
        });
      };

      const { STATE } = XPromise;

      if (this.state === STATE.FULFILLED) {
        resolved();
      } else if (this.state === STATE.REJECT) {
        rejected();
      } else {
        this.resolvePendingQueue.push(resolved);
        this.rejectPendingQueue.push(rejected);
      }
    });
  }

  catch(onReject) {
    return this.then(null, onReject);
  }

  static resolve(value) {
    if (utils.isXPromiseInstance(value)) {
      return value.then(x => x);
    }

    return new XPromise((resolve) => resolve(value));
  }

  static reject(reason) {
    return new XPromise((resolve, reject) => reject(reason));
  }

  static race(promises) {
    if (!utils.isArray(promises)) {
      throw XPromise.reject(new Error('race params must is array!'));
    }

    return new XPromise((resolve, reject) => {
      promises.forEach((value) => {
        XPromise
          .resolve(value)
          .then((result) => resolve(result))
          .catch((err) => reject(err));
      });
    });
  }

  static all(promises) {
    if (!utils.isArray(promises)) {
      throw XPromise.reject(new Error('all params must is array!'));
    }

    return new XPromise((resolve, reject) => {
      const totalCount = promises.length;
      const values = new Array(totalCount);
      let resolveCount = 0;

      promises.forEach((value, index) => {
        XPromise
          .resolve(value)
          .then((result) => {
            values[index] = result;
            resolveCount++;

            // 如果都 resolved 了，就结束 promise
            if (resolveCount === totalCount) {
              resolve(values);
            }
          })
          .catch((err) => reject(err));
      });
    });
  }
}
