import { utils } from './utils.js';

/**
 * 打印矩阵相关的算法
 */
export class Matrix {
  // 顺时针打印
  printRBLT(matrix) {
    if (!utils.isArray(matrix) || matrix.length <= 0) {
      return [];
    }

    let start = 0;
    const rows = matrix.length;
    const cols = matrix[0].length;
    const result = [];

    while(cols > start * 2 && rows > start * 2) {
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
      for(i = 0, j = k; i <= rows - 1 && j >= 0; i++, j--) {
        const el = matrix[i][j];
        result.push(el);
      }
    }

    for (k = 1; k <= rows - 1; k++) {
      for(i = k, j = cols - 1; i <= rows - 1 && j >= 0; i++, j--) {
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
      for(i = 0, j = k; i <= cols - 1 - k && j <= cols - 1; i++, j++) {
        const el = matrix[i][j];
        result.push(el);
      }
    }

    for (k = 1; k <= rows - 1; k++) {
      for(i = k, j = 0; i <= cols - 1 && j <= cols - 1 - k; i++, j++) {
        const el = matrix[i][j];
        result.push(el);
      }
    }

    return result;
  }
}
