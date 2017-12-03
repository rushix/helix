import { expect } from 'chai';
import helix from '../src/app.js';

describe('corner cases and throws', () => {

  it('is array', () => expect(() => { helix(undefined) }).to.throw(TypeError));

  it('is matrix', () => expect(() => { helix([2, 'word', false]) }).to.throw(TypeError));

  it('is square matrix', () => {
    const matrix = [
      [1, 1, 1, 1, 1],
      [2, 2, 2, 2, 2],
      [3, 3, 3, 3, 3],
      [4, 4, 4, 4],
      [5, 5, 5, 5, 5]
    ];

    expect(() => { helix(matrix) }).to.throw(Error);
  });

  it('length is odd', () => {
    const matrix = [
      [], [], [], []
    ];

    expect(() => { helix(matrix) }).to.throw(Error);
  });

  it('single', () => {
    expect(helix([[true]], false)).to.equal('true');
  });

});
