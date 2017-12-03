'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (matrix) {
  var output = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;


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
    var firstLeft = function firstLeft() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : center;
      var partialResultString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      if (x === center + delta) {
        return partialResultString;
      }

      return firstLeft(x + 1, partialResultString + ' ' + m[x][center - delta]);
    };

    /*
     * x = center + delta
     * y E [center - delta, center + delta)
     */
    var bottom = function bottom() {
      var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : center - delta;
      var partialResultString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      if (y === center + delta) {
        return partialResultString;
      }

      return bottom(y + 1, partialResultString + ' ' + m[center + delta][y]);
    };

    /*
     * x E [center + delta, center - delta)
     * y = center + delta
     */
    var right = function right() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : center + delta;
      var partialResultString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      if (x === center - delta) {
        return partialResultString;
      }

      return right(x - 1, partialResultString + ' ' + m[x][center + delta]);
    };

    /*
     * x = center - delta
     * y E [center + delta, center - delta)
     */
    var top = function top() {
      var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : center + delta;
      var partialResultString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      if (y === center - delta) {
        return partialResultString;
      }

      return top(y - 1, partialResultString + ' ' + m[center - delta][y]);
    };

    /*
     * x E [center - delta, center)
     * y = center - delta
     */
    var lastLeft = function lastLeft() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : center - delta;
      var partialResultString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      if (x === center) {
        return partialResultString;
      }

      return lastLeft(x + 1, partialResultString + ' ' + m[x][center - delta]);
    };

    return helix(m, delta + 1, '' + resultString + firstLeft() + bottom() + right() + top() + lastLeft());
  }

  if (!Array.isArray(matrix)) {
    throw new TypeError('param should be an array');
  }

  if (!(matrix.length & 1)) {
    throw new Error('matrix length should be odd');
  }

  matrix.forEach(function (innerArray) {
    if (!Array.isArray(innerArray)) {
      throw new TypeError('param should be a matrix');
    }

    if (matrix.length !== innerArray.length) {
      throw new Error('matrix should be square');
    }
  });

  var center = parseInt(matrix.length / 2);

  return helix(matrix, 1, '' + matrix[center][center]);
};
