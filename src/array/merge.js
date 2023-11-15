var merge = function (intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    let res = [];
    let i = 0;
    while (i < intervals.length) {
        let left = intervals[i][0];
        let right = intervals[i][1];

        // 下一个的左边界，如果比当前的右边界小，说明是在之前区间内可以合并的
        while (i < intervals.length - 1 && intervals[i + 1][0] <= right) {
            i++;
            // 取下一个元素的右边界与当前最大的右边界取 max
            right = Math.max(right, intervals[i][1]);
        }
        res.push([left, right]);
        i++;
    }
    return res;
}
