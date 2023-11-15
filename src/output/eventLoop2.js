console.info('start')

async function async1() {
  return new Promise(() => {
    console.log('async2')
  }).then(() => {
    console.log('async1')
  })
}

setTimeout(function () {
  console.log(1)
}, 0)

new Promise(function (resolve) {
  console.log(2)
  for (var i = 0; i < 10000; i++) {
    i === 9999 && resolve()
  }
  console.log(3)
}).then(function () {
  console.log(4)
}).then(function () {
  console.log(5)
})

Promise.resolve().then(function () {
  console.log(6)
})

async1()

console.info('end')


// start -> 2 -> end -> 1 - 4 -> 3 -> 5 -> 6 -> async2 -> async1
