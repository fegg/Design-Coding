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
    // @TODO：如果没有传入参数是否需要抛出异常 AddRemoteError
    return Promise.resolve(inputs[0] ?? 0);
  }

  const n = inputs.length;
  const promiseQueue = [];

  for(let i = 0; i < n - 1; i += 2) {
    const promise = addRemote(inputs[i], inputs[i+ 1]);
    promiseQueue.push(promise);
  }

  // 说明奇数，还需要再请求加一次
  if (n % 2 > 0) {
    const lastNum = inputs[n - 1];
    promiseQueue.push(Promise.resolve(lastNum));
  }

  return Promise.all(promiseQueue).then(result => {
    return add(...result);
  });
}

add().then(result => {
  console.log('么有参数:', result);
})

const start1 = now();
// 请用示例验证运行结果:
add(1, 2).then(result => {
  const end1 = now();
  console.log('1+2=', result, end1 - start1);
});

const start2 = now();
add(3, 5, 2).then(result => {
  const end2 = now();
  console.log('3+5+2=', result, end2 - start2);
});

add(3, 5, 2, 1, 2, 21, 212, 323).then(result => {
  console.log('total=', result);
});

const start3 = now();
add(...Array(100).fill(1)).then(result => {
  const end3 = now();
  console.log('100.fill(1)=', result, end3 - start3);
});
