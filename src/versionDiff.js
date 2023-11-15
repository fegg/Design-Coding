import { isString } from 'lodash-es';

const CONSTANTS = {
  dot: '.',
  defaultVersionNum: 0,
};

function toArray(str) {
  if (!isString(str)) {
    return [];
  }

  return str.split(CONSTANTS.dot);
}

function toFill(arr) {
  const data = ['', '', ''];

  const fillData = data.map((item, index) => {
    if (arr[index]) {
      return +arr[index];
    }

    return CONSTANTS.defaultVersionNum;
  });

  return fillData;
}

function versionDiff(v1, v2) {
  const arrVersion1 = toFill(toArray(v1));
  const arrVersion2 = toFill(toArray(v2));

  const len = arrVersion1.length;

  let diffCount = 0;

  for (let i = 0; i < len; i++) {
    if (arrVersion1[i] > arrVersion2[i]) {
      return 1;
    } else if (arrVersion1[i] < arrVersion2[i]) {
      return -1;
    } else if (diffCount < len) {
      diffCount++;
    }
  }

  return 0;
}

const r1 = versionDiff('1.01', '1.001');
const r2 = versionDiff('1.0', '1.0.0');
const r3 = versionDiff('0.1', '1.1');

console.log(r1, r2, r3);
