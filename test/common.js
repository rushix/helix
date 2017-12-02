import { expect } from 'chai';
import helix from '../src/app.js';

describe('common cases' () => {

  it('3x3 matrix', () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];

    expect(helix(matrix)).to.equal('5 4 7 8 9 6 3 2 1');
  });

  it('7x7 matrix', () => {
    const matrix = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 1],
      [1, 2, 3, 3, 3, 2, 1],
      [1, 2, 3, 4, 3, 2, 1],
      [1, 2, 3, 3, 3, 2, 1],
      [1, 2, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];

    function chain(subject, times) {
      if (times <= 0) {
        return this;
      }

      this.toString = () => {
        return this.string;
      }

      this.chain = chain.bind(this);

      this.string = (this.string === undefined)
        ? `${ subject }`
        : `${ this.string } ${ subject }`;

      return chain.call(this, subject, --times);
    }

    const rightResult = chain(4, 1)
      .chain(3, 8)
      .chain(2, 16)
      .chain(1, 24);

    expect(helix(matrix)).to.equal(`${ rightResult }`);
  });

});
