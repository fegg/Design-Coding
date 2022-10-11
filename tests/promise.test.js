import { XPromise } from '../src/XPromise.js';

const promise1 = new XPromise((resolve) => {
  resolve('promise ok');
});

promise1.then(res => {
  console.log(res);
  return 1;
}).then(res => {
  console.log('2: ', res);
  return 2;
}).then(res => {
  console.log('3: ', res);
}).catch(err => {
  console.log(err);
});

const promise2 = () => {
  return new XPromise((resolve) => {
    setTimeout(() => {
      resolve('promise2 ok');
    }, 1000);
  });
}

const promise3 = () => {
  return new XPromise((resolve) => {
    setTimeout(() => {
      resolve('promise3 ok');
    }, 2000);
  });
}

XPromise.race([promise2(), promise3()]).then(res => console.log('race: ', res));
XPromise.all([promise2(), promise3()]).then(res => console.log('all: ', JSON.stringify(res)));

const defer1 = XPromise.defer();
const defer2 = XPromise.defer();

testDefer(defer1, () => {
  defer1.resolve('ok');
});

testDefer(defer2, () => {
  defer2.reject(new Error('fail'));
})

function testDefer(x, cb) {
  x.promise.then((result) => {
    console.log('resolve defer', result);
  }).catch((err) => {
    console.log('reject defer', err.message);
  });

  cb();
}

