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
