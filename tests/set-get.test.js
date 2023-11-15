import { getter, setter, set } from '../src/set-get.js';
import assert from 'power-assert';

describe('set and get', () => {
  it('getter is ok', () => {
    const obj = {
      a: {
        b: {
          c: 1,
        },
      },
    };
    const result = getter(obj, 'a.b.c');
    assert.equal(result, 1);
  });

  it('setter is ok', () => {
    const obj = {};
    setter(obj, 'a.b.c', 1);

    assert.deepEqual(obj, {
      a: {
        b: {
          c: 1,
        },
      },
    });
  });

  it('set is ok', () => {
    const obj = {
      a: {
        c: 1,
      },
    };
    set(obj, 'a.b.c', 1);

    assert.deepEqual(obj, {
      a: {
        c: 1,
        b: {
          c: 1,
        },
      },
    });
  });
});
