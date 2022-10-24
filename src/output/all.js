//promise returning function
function foo(whoCalled) {
  let p = new Promise(function(resolve, reject) { 
    setTimeout( () => {
      console.log('resolving from setTimeout - called by: ' + whoCalled)
      resolve('resolve value') }, .1)
  })
  return p
}

//async await
async function asyncFunc() {
 await foo('async function')
 //rest of running function’s code…
 console.log('async function howdy')
}

//generator yield:
function* gen() {
  yield foo('generator function')
  //rest of running function’s code…
  console.log('generator function howdy')
}

//promise.then():
function thenFunc() {
  let r = foo('promise.then function').then(() => {
      //rest of running function’s code…
      console.log('promise.then() howdy')
  })
  return r
}

//main
function main() {

 //async await
 var a = asyncFunc() 
 console.log(a) //logs Promise { <pending> }
                //the rest of the code following await foo() runs as a microtask runs once foo() resolves. The call stack was cleared.

 //generator
  var g = gen()
  console.log(g) // logs Object [Generator] {}
  var p = g.next().value
  console.log(p) //logs Promise { <pending> }
  g.next()       //the rest of the code following yield running gen function's code runs. call stack was not cleared.

  //promise.then()
  var x = thenFunc()
  console.log(x) //logs Promise { <pending> }
                  //the then(callback) microtask runs once foo() resolves. The call stack was cleared
}
main()
console.log('main is off the call stack - launch/startup macrotask completing. Event loop entering timer phase.')