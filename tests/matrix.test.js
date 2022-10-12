import { Matrix } from '../src/Matrix.js';

const mockData = {
  m1: [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ],
  m2: [
    [11, 22, 33, 44],
    [55, 66, 77, 88],
  ],
};

const matrix = new Matrix();

const r1 = matrix.printRBLT(mockData.m1);
const r2 = matrix.printRBLT(mockData.m2);

console.log(r1);
console.log(r2);

const r3 = matrix.print45TL(mockData.m1);
const r4 = matrix.print45TL(mockData.m2);

console.log(r3);
console.log(r4);

const r5 = matrix.print45TR(mockData.m1);
const r6 = matrix.print45TR(mockData.m2);

console.log(r5);
console.log(r6);
