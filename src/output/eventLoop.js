/**
 * node v16, 浏览器环境可能 resolve 输出有差异
 */
// 1, 3, 5, script start, async2 start, async2 doing
// promise constructor, script end, 4, async2 end, promise then, 2, run timeout
function test1() {
  console.log(1);
  setTimeout(function () {
    console.log(2);
  }, 0);
  new Promise(resolve => {
    console.log(3);
    resolve();
  }).then(() => {
    console.log(4);
  });
  console.log(5);

  console.log('script start');

  async function async1() {
    console.log('async2 start');
    await async2();
    console.log('async2 end');
  }

  async function async2() {
    console.log('async2 doing');
  }

  setTimeout(() => {
    console.log('run timeout');
  }, 0);

  async1();

  new Promise((resolve) => {
    console.log('promise constructor');

    resolve();
  }).then(() => {
    console.log('promise then');
  });

  console.log('script end');
}

/**
 * 主要是微任务 nextTick 以及 Promise 默认是微任务执行上下文
 */
// 1, 7, 6
// 8, 2, 4, 3, 5
// 9, 11, 10, 12
function test2() {
  console.log('1')
  setTimeout(function() {
    console.log('2')
    process.nextTick(function() {
      console.log('3')
    })
    new Promise(function(resolve) {
      console.log('4')
      resolve()
    }).then(function() {
      console.log('5')
    })
  })

  process.nextTick(function() {
    console.log('6')
  })

  new Promise(function(resolve) {
    console.log('7')
    resolve()
  }).then(function() {
    console.log('8')
  })

  setTimeout(function() {
    console.log('9')
    process.nextTick(function() {
      console.log('10')
    })
    new Promise(function(resolve) {
      console.log('11')
      resolve()
    }).then(function() {
      console.log('12')
    })
  })
}

// 主要是遇到宏任务 jump
// 1~12 依次输出
function test3() {
  new Promise(function (resolve) {
    console.log('1')// 宏任务一
    resolve()
  }).then(function () {
    console.log('3') // 宏任务一的微任务
  })
  setTimeout(function () { // 宏任务二
    console.log('4')
    setTimeout(function () { // 宏任务五
      console.log('7')
      new Promise(function (resolve) {
        console.log('8')
        resolve()
      }).then(function () {
        console.log('10')
        setTimeout(function () {  // 宏任务七
          console.log('12')
        })
      })
      console.log('9')
    })
  })
  setTimeout(function () { // 宏任务三
    console.log('5')
  })
  setTimeout(function () {  // 宏任务四
    console.log('6')
    setTimeout(function () { // 宏任务六
      console.log('11')
    })
  })
  console.log('2') // 宏任务一
}