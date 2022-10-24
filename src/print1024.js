function print1024() {
  return [1, 0, 2, 4].map((n) => {
    return n.toString(2);
  }).join('');
}

console.log(print1024());