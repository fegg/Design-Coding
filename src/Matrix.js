import { utils } from './utils.js';

/**
 * 打印矩阵相关的算法
 */
export class Matrix {
  rotate(matrix) {
    // 先左右翻转
    let len = matrix[0].length;

    for (let i = 0; i < len; i++) {
      let left = 0;
      let right = len - 1;

      while (left < right) {
        let tmp = matrix[i][left];
        matrix[i][left] = matrix[i][right];
        matrix[i][right] = tmp;
        left++;
        right--;
      }
    }


    // 对角线翻转，左上角 45
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - i; j++) {
        const tmp = matrix[i][j];
        matrix[i][j] = matrix[len - j - 1][len - i - 1];
        matrix[len - j - 1][len - i -1] = tmp;
      }
    }

    return matrix;
  }

  printCycle(matrix) {
    if (!matrix || matrix.length <= 0) {
      return [];
    }

    let top    = 0,
        bottom = matrix.length - 1,
        left   = 0,
        right  = matrix[0].length - 1;

    const result = [];

    while (top < bottom && left < right) {
      for (let i = left; i < right; i++) {
        result.push(matrix[top][i]);
      }
      for (let i = top; i < bottom; i++) {
        result.push(matrix[i][right]);
      }
      for (let i = right; i > left; i--) {
        result.push(matrix[bottom][i]);
      }
      for (let i = bottom; i > top; i--) {
        result.push(matrix[i][left]);
      }

      top++;
      bottom--;
      right--;
      left++;
    }

    // 剩余一列
    if (left === right) {
      for (let i = top; i <= bottom; i++) {
        result.push(matrix[i][left]);
      }
    } else if (top === bottom) {
      for (let i = left; i <= right; i++) {
        result.push(matrix[top][i]);
      }
    }

    return result;
  }

  // 顺时针打印
  printRBLT(matrix) {
    if (!utils.isArray(matrix) || matrix.length <= 0) {
      return [];
    }

    let start = 0;
    const rows = matrix.length;
    const cols = matrix[0].length;
    const result = [];

    while (cols > start * 2 && rows > start * 2) {
      // 边界
      const endX = cols - 1 - start;
      const endY = rows - 1 - start;

      // →
      for (let i = start; i <= endX; i++) {
        result.push(matrix[start][i])
      }
      // ↓
      if (start < endY) {
        for (let i = start + 1; i <= endY; i++) {
          result.push(matrix[i][endX]);
        }
      }
      // ←
      if (start < endX && start < endY) {
        for (let i = endX - 1; i >= start; i--) {
          result.push(matrix[endY][i]);
        }
      }
      // ↑
      if (start < endX && start < endY - 1) {
        for (let i = endY - 1; i >= start + 1; i--) {
          result.push(matrix[i][start])
        }
      }

      start++;
    }

    return result;
  }

  // 45 左上开始
  print45TL(matrix) {
    let i = 0;
    let j = 0;
    let k = 0;
    const rows = matrix.length;
    const cols = matrix[0].length;
    const result = [];

    for (k = 0; k <= cols - 1; k++) {
      for (i = 0, j = k; i <= rows - 1 && j >= 0; i++, j--) {
        const el = matrix[i][j];
        result.push(el);
      }
    }

    for (k = 1; k <= rows - 1; k++) {
      for (i = k, j = cols - 1; i <= rows - 1 && j >= 0; i++, j--) {
        const el = matrix[i][j];
        result.push(el);
      }
    }

    return result;
  }

  // 45 右上开始
  print45TR(matrix) {
    let i = 0;
    let j = 0;
    let k = 0;
    const rows = matrix.length;
    const cols = matrix[0].length;
    const result = [];

    for (k = cols - 1; k >= 0; k--) {
      for (i = 0, j = k; i <= cols - 1 - k && j <= cols - 1; i++, j++) {
        const el = matrix[i][j];
        result.push(el);
      }
    }

    for (k = 1; k <= rows - 1; k++) {
      for (i = k, j = 0; i <= cols - 1 && j <= cols - 1 - k; i++, j++) {
        const el = matrix[i][j];
        result.push(el);
      }
    }

    return result;
  }
}

const matrix = new Matrix();

console.log(matrix.rotate([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]));

console.log(matrix.print45TL([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]))
