import now from 'performance-now';

// 假设本地机器无法做加减乘除法，需要通过远程请求让服务端来实现。
// 以加法为例，现有远程API的模拟实现
const addRemote = async (a, b) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(a + b);
    }, 1000);
  });

/**
 * @idea 利用 Promise.all 计算已经缓存的 waitingCalc = fp(a) + fp(b) 表达式
 * @param inputs
 * @returns {Promise<unknown>}
 */
async function add(...inputs) {
  if (inputs.length <= 1) {
    return Promise.resolve(inputs[0]);
  }

  const n = inputs.length;
  const promiseQueue = [];

  if (!add.cache) {
    add.cache = {};
  }

  if (n % 2 > 0) {
    const x = inputs.shift();
    promiseQueue.push(x);
  }

  for(let i = 0; i * 2 < n - 1; i++) {
    const x = inputs[i * 2];
    const y = inputs[i * 2 + 1];
    promiseQueue.push(getValue(x, y));
  }

  function getValue(x, y) {
    const cacheValue = getCacheValue(x, y);
    return cacheValue ?? addRemoteByCache(x, y);
  }

  function getCacheValue(x, y) {
    return add.cache[`${x}${y}`] || add.cache[`${y}${x}`];
  }

  function addRemoteByCache(x, y) {
    return addRemote(x, y).then(r => {
      add.cache[`${x}${y}`] = r;
      return r;
    });
  }

  return Promise.all(promiseQueue).then(x => add(...x));
}

// const start1 = now();
// // 请用示例验证运行结果:
// await add(1, 2).then(result => {
//   const end1 = now();
//   console.log('1+2=', result, end1 - start1);
// });
//
// const start2 = now();
// await add(3, 5, 2).then(result => {
//   const end2 = now();
//   console.log('3+5+2=', result, end2 - start2);
// });
//
// const start11 = now();
// await add(3, 5, 2, 1, 2, 21, 212, 323).then(result => {
//   console.log('total=', result, now() - start11);
// });
//
// const start12 = now();
// await add(3, 5, 2, 1, 2, 21, 212).then(result => {
//   console.log('total2=', result,  now() - start12);
// });

const start13 = now();
await add(3, 5, 2, 1, 2, 21, 2123).then(result => {
  console.log('total3=', result, now() - start13);
});

// const start14 = now();
// await add(3, 5, 2, 1, 2, 21, 212).then(result => {
//   console.log('total4=', result, now() - start14);
// });
//
// add.cache = null;
// const start15 = now();
// await add(3, 5, 2, 1, 2, 21, 212).then(result => {
//   console.log('total5=', result, now() - start15);
// });
//
// const start3 = now();
// await add(...Array(13).fill(1)).then(result => {
//   const end3 = now();
//   console.log('100.fill(1)=', result, end3 - start3);
// });
//
// await add(...Array(13).fill(1)).then(result => {
//   const end3 = now();
//   console.log('100.fill(1).cache=', result, end3 - start3);
// });
