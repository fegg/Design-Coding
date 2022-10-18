export function compose(middleware) {
  if (!Array.isArray(middleware)) {
    throw new Error('middleware must is array!');
  }

  return function (context, next) {
    let index = -1;
    return dispatch(0);

    function dispatch(i) {
      if (i <= index) {
        return Promise.reject(new Error('在中间件函数中的 next 只能执行一次!'));
      }

      index = i;

      // 一次执行 middleware
      let fn = middleware[i];

      if (!fn) {
        // 如果中间件不太对，还是直接执行后面的逻辑，不阻塞
        return Promise.resolve();
      }

      // 如果执行到最后一个中间件，就要执行 next 退出了
      if (i === middleware.length) {
        fn = next;
      }

      try {
        // 只是不断执行中间件的函数
        const nextCallback = dispatch.bind(null, i + 1);
        const result = fn(context, nextCallback);
        return Promise.resolve(result);
      } catch (err) {
        return Promise.reject(err);
      }
    }
  }
}