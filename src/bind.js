const slice = Array.prototype.slice;

function bind(context) {
  const fn = this;
  const args = slice.call(arguments, 1);

  return function (...args2) {
    return fn.apply(context, args.concat(args2));
  }
}

function bind2(context, ...args) {
  const fn = this;

  return function (...args2) {
    fn.apply(context, args.concat(args2));
  }
}

function say() {

}

