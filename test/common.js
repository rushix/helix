import { expect } from 'chai';
import helix from '../src/app.js';

describe('common cases', () => {

  it('3x3 matrix', () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];

    expect(helix(matrix, false)).to.equal('5 4 7 8 9 6 3 2 1');
  });

  it('5x5 matrix', () => {
    const matrix = [
      [true,        null,   undefined,            8,  'a'],
      [[3, 1],      3,      { a: true, 0: '2' },  0,  1389],
      ['abirvalg',  false,  '',                   12, 'o'],
      [' ',         3,      'abc',                14, undefined],
      [1,           2,      3,                    4,  'true'],
    ];

    const correctResultString = ' false 3 abc 14 12 0 [object Object] 3 abirvalg   1 2 3 4 true undefined o 1389 a 8 undefined null true 3,1';
    expect(helix(matrix, false)).to.equal(correctResultString);
  });

  it('NxN matrix, where N is odd', () => {
    const nMax = 200;
    const n = parseInt(Math.random() * nMax, 10);

    console.log(`\n       N = 2 * n + 1`);
    console.log(`       n = parseInt(Math.random() * 200, 10) = ${ n }`);
    console.log(`       N = 2 * ${ n } + 1 = ${ 2 * n + 1 }\n`);

    // const values = [1, 2, 3, 4, ..., n];
    const values = Array.from({ length: n }, (v, i) => i + 1);

    /*
     *
     * const matrix = [
     *   [n,   n,   n,   n,   n,   n, n],
     *   [n, ..., ..., ..., ..., ..., n],
     *   [n, ...,   1,   1,   1, ..., n],
     *   [n, ...,   1,   0,   1, ..., n],
     *   [n, ...,   1,   1,   1, ..., n],
     *   [n, ..., ..., ..., ..., ..., n],
     *   [n,   n,   n,   n,   n,   n, n]
     * ];
     *
     * */
    const matrix = values.reduce((acc, value) => {
      const length = acc.length + 2;
      const frameArray = Array.from({ length }, () => value);

      return [
        frameArray,

        ...acc.map(innerAcc => [value, ...innerAcc, value]),

        frameArray
      ];
    }, [[0]]);

    const printer = (number, times, partialResultString) => {
      if (times <= 0) {
        return partialResultString;
      }

      return printer(number, --times, `${ partialResultString } ${ number }`);
    }

    const correctResultString = values.reduce((acc, value) => {
      return printer(value, 8 * value, acc);
    }, '0');

    expect(helix(matrix, false)).to.equal(`${ correctResultString }`);
  });

});
