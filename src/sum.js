/**
 * 两数相加
 */

function twoSum(arr, total) {
  let result = [];
  let map = {};
  for (let i = 0; i < arr.length; i++) {
    if (map[arr[i]]) {
      result.push([map[arr[i]], arr[i]]);
    } else {
      map[total - arr[i]] = arr[i];
    }
  }
  return result;
}

/**
 * 三数相加
 */
function threeSumEqualZero(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    let map = {};
    for (let j = i + 1; j < arr.length; j++) {
      if (map[arr[j]]) {
        result.push([arr[i], map[arr[j]], arr[j]]);
      } else {
        map[-arr[i] - arr[j]] = arr[j];
      }
    }
  }
  return result;
}
