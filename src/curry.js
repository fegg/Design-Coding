// function curry(fn, arguments) {
//   const args = arguments || [];
//   const len = fn.length;
//
//   return function () {
//     // 合并新老参数
//     const _args = args.concat([].slice.call(arguments, 0));
//
//     if (_args.length >= len) {
//       fn.apply(this, _args);
//     } else {
//       curry.call(this, fn, _args);
//     }
//   }
// }

function curry2(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  }
}


function test() {
  const arr = [...arguments];
  console.log(Object.prototype.toString.call(arr));
}

test();
