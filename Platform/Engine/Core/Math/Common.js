/**
 * Common utilities
 * @module glMatrix
 */
// Configuration Constants
const EPSILON = 0.000001,
      DEGREE = Math.PI / 180,
      NEARZERO = 1e-6,
      DEGTORAD = 0.01745329251,
      PIHALF = 1.5707963267948966;

/**
 * Convert Degree To Radian
 *
 * @param {Number} a Angle in Degrees
 */
function toRadian(a) {
  return a * DEGREE;
}

/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 *
 * @param {Number} a The first number to test.
 * @param {Number} b The second number to test.
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */
function equals(a, b) {
  return Math.abs(a - b) <= (EPSILON * Math.max(1, Math.abs(a), Math.abs(b)));
}

module.exports = { EPSILON, NEARZERO, DEGTORAD, DEGREE, PIHALF, equals, toRadian }
