export default (matrix, output = true) => {

  function helix(m, delta, resultString) {
    if (center - delta < 0) {
      if (output) {
        console.log(resultString);
      }

      return resultString;
    }

    /*
     * x E [center, center + delta)
     * y = center - delta
     */
    const firstLeft = (x = center, partialResultString = '') => {
      if (x === center + delta) {
        return partialResultString;
      }

      return firstLeft(x + 1, `${ partialResultString } ${ m[x][center - delta] }`);
    }

    /*
     * x = center + delta
     * y E [center - delta, center + delta)
     */
    const bottom = (y = center - delta, partialResultString = '') => {
      if (y === center + delta) {
        return partialResultString;
      }

      return bottom(y + 1, `${ partialResultString } ${ m[center + delta][y] }`);
    }

    /*
     * x E [center + delta, center - delta)
     * y = center + delta
     */
    const right = (x = center + delta, partialResultString = '') => {
      if (x === center - delta) {
        return partialResultString;
      }

      return right(x - 1, `${ partialResultString } ${ m[x][center + delta] }`);
    }

    /*
     * x = center - delta
     * y E [center + delta, center - delta)
     */
    const top = (y = center + delta, partialResultString = '') => {
      if (y === center - delta) {
        return partialResultString;
      }

      return top(y - 1, `${ partialResultString } ${ m[center - delta][y] }`);
    }

    /*
     * x E [center - delta, center)
     * y = center - delta
     */
    const lastLeft = (x = center - delta, partialResultString = '') => {
      if (x === center) {
        return partialResultString;
      }

      return lastLeft(x + 1, `${ partialResultString } ${ m[x][center - delta] }`);
    }

    return helix(
      m,
      delta + 1,
      `${ resultString }${ firstLeft() }${ bottom() }${ right() }${ top() }${ lastLeft() }`
    );
  }

  if (!Array.isArray(matrix)) {
    throw new TypeError('param should be an array');
  }

  if (!(matrix.length & 1)) {
    throw new Error('matrix length should be odd');
  }

  matrix.forEach(innerArray => {
    if (!Array.isArray(innerArray)) {
      throw new TypeError('param should be a matrix');
    }

    if (matrix.length !== innerArray.length) {
      throw new Error('matrix should be square');
    }
  });

  const center = parseInt(matrix.length / 2);

  return helix(matrix, 1, `${ matrix[center][center] }`);

}
