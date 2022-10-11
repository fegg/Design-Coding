export function longestCommonPrefix(strs) {
  const n = strs.length - 1;

  // 打个桩试试
  const pickIndex = [];
  for(let i = 0; i <= n; i++) {
    const current = strs[i].length;
    pickIndex.push({
      len: current,
      sourceStr: strs[i],
    });
  }

  // 找出最小值作为最大遍历的刻度
  const [minEl] = pickIndex.sort((a, b) => a.len - b.len);

  // 分片好
  const allTick = [];
  let loopMin = minEl.len;
  while(loopMin > 0) {
    const currentTick = minEl.sourceStr.substr(0, loopMin);
    allTick.push({
      tick: currentTick,
    });
    loopMin--;
  }

  for(let i = 0; i <= allTick.length - 1; i++) {
    const tick = allTick[i].tick;
    console.log(tick);

    for(let j = 0; j <= n; j++) {
      const currentEl = strs[j];
      // 打个标
      allTick[i].flag = currentEl.startsWith(tick);
      if (!allTick[i].flag) {
        break;
      }
    }
  }

  console.log('allTick->', allTick);

  const result = allTick.find(item => item.flag) ?? { tick: '', flag: true };

  console.log('result->', result);

  return result.tick;
};
