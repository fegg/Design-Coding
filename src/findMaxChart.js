const toString = Object.prototype.toString;

function isString(str) {
  return typeof str ==='string' || toString.call(str) === '[object String]';
}

export function findMaxChart(str) {
  if (!isString(str)) return null;
  if (str.length === 0) return { count: 0, char: '' };

  const hashmap = {};
  const result = {
    count: 0,
    char: '',
  };

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (hashmap[char]) {
      hashmap[char]++;
    } else {
      hashmap[char] = 1;
    }

    if (hashmap[char] > result.count) {
      result.char = char;
      result.count = hashmap[char];
    }
  }

  return result;
}

console.log(findMaxChart('aabccc')); // c, 3
console.log(findMaxChart('abcdeff')); // f, 2
console.log(findMaxChart('abc')); // a, 1
console.log(findMaxChart('')); // a,) 1
console.log(findMaxChart(null)); // a, 1
