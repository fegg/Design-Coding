/**
 * 针对原生的一些 API 实现
 */

export const MOCK_API = {
  bind(context) {
    const fn = this;
    const args = slice.call(arguments, 1);

    return function () {
      return fn.apply(context, args.concat(slice.call(arguments)));
    };
  },
  apply(context, args = []) {
    // TODO
  },
  // setTimeout 模拟 interval
  intervalByTimeout() {

  },
  debounce(fn, wait, options = {}) {
    let timerId = null;

    return function(...args) {
      if (timerId) {
        clearTimeout(timerId);
      }

      const { context } = options;

      const ctx = context ? context : this;

      timerId = setTimeout(() => {
        fn.apply(ctx, args);
      }, wait);
    }
  },
  throttle() {},
  curry(fn, _args) {
    const args = _args || [];
    const len = fn.length;

    return function () {
      // 合并新老参数
      const _args = args.concat([].slice.call(arguments, 0));

      if (_args.length >= len) {
        fn.apply(this, _args);
      } else {
        curry.call(this, fn, _args);
      }
    };
  },
};
