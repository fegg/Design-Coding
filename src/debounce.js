/**
 * 防抖
 * @param {Function} fn 
 * @param {Number} wait 
 * @param { context, maxWait, ... } options 
 * @returns 
 */
function debounce(fn, wait, options = {}) {
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
}