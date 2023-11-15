function moveZeroes (nums) {
  if (!Array.isArray(nums)) return [];
  if (nums.length <= 0) return [];

  const n = nums.length;

  // 移动的次数和移动的位置
  let moveIndex = 0;
  // 循环索引
  let j = 0;

  while(j < n) {
    const isZero = nums[moveIndex] === 0;

    if (isZero) {
      // 如果是 0，就删除，然后在数组末尾追究一个 0
      // i: 0 {[0, 0, 1] -> [0, 1, 0]}
      // i: 0 {[0, 1, 0] -> [1, 0, 0]}
      nums.splice(moveIndex, 1);
      nums.push(0);
    }

    if (!isZero) {
      moveIndex++;
    }

    j++;
  }

  return nums;
}

console.log(
  moveZeroes([0, 0, 1])
)
console.log(
  moveZeroes([1, 0, 1])
)
