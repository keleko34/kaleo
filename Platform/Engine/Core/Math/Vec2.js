/* 2D VECTOR */

const { EPSILON, NEARZERO } = require('./Common');
const Vec3 = require('./Vec3');

class Vec2 extends Float32Array {
  /**
  * Creates a new vec2
  *
  * @params {Vec2}, {Array}(2) or {x} {y}
  * @returns {Vec2} a new 2D vector
  */
  constructor(arg1, arg2) {
    super(2);
    switch(arguments.length)
    {
      /* If a Vec2 or an array was passed we set the local x and y with these */
      case 1:
        if(arg1.length) { this[0] = arg1[0]; this[1] = arg1[1]; }
        break;
      /* if x and y were passed seperately we set them seperately */
      case 2:
        this[0] = arg1; this[1] = arg2;
        break;
      /* if nothing was passed we zero out */
      default:
        this[0] = this[1] = 0;
    }
  }
  
  /* Extra x and y properties tied to x and y indexes */
  get x() { return this[0]; } set x(v) { this[0] = v; }
  get y() { return this[1]; } set y(v) { this[1] = v; }
  
  /* REGION METHODS */
  
  /**
  * Creates a new vec2 initialized with values from the existing vector
  *
  * @returns {Vec2} a new 2D vector
  */
  clone() {
    return new Vec2(this);
  }
  
  /**
  * Set the vec2 to zero
  *
  * @returns {Vec2}
  */
  zero() {
    this[0] = this[1] = 0;
  }
  
  /**
  * Sets the vec2 point to zero if the number is below 6 decimal places
  *
  * @returns {Vec2}
  */
  zeroClamp() {
    return Vec2.zeroClamp(this);
  }
  
  /**
  * Sets X and Y (Faster)
  *
  * @param {Number} x
  * @param {Number} y
  * @returns {Vec2}
  */
  setXY(x, y) {
    this[0] = x; this[1] = y;
    return this;
  }
  
  /**
  * Sets Number (Faster)
  *
  * @param {Number} a
  * @returns {Vec2}
  */
  setNumber(a) {
    this[0] = this[1] = a;
    return this;
  }
  
  /**
  * Sets Vec2 (Faster)
  *
  * @param {Vec2} a
  * @returns {Vec2}
  */
  setVec(a) {
    this[0] = a[0]; this[1] = a[1];
    return this;
  }
  
  /**
  * Copy the values from one vec2 to this vec2
  *
  * @param {Vec2} a the source vector
  * @returns {Vec2}
  */
  copy(a) {
    return this.setVec(a)
  }
  
  /**
  * Add X and Y (Faster)
  *
  * @param {Number} x
  * @param {Number} y
  * @returns {Vec2}
  */
  addXY(x, y) {
    this[0] += x; this[1] += y;
    return this;
  }
  
  /**
  * Add Number (Faster)
  *
  * @param {Number} a
  * @returns {Vec2}
  */
  addNumber(a) {
    this[0] += a; this[1] += a;
    return this;
  }
  
  /**
  * Add Vec2 (Faster)
  *
  * @param {Vec2} a
  * @returns {Vec2}
  */
  addVec(a) {
    this[0] += a[0]; this[1] += a[1];
    return this;
  }
  
  /**
  * Add Two Vec2s (Faster)
  *
  * @param {Vec2} a
  * @param {Vec2} b
  * @returns {Vec2}
  */
  addTwoVecs(a, b) {
    this[0] = a[0] + b[0]; this[1] = a[1] + b[1];
    return this;
  }
  
  /**
  * Subtract X and Y (Faster)
  *
  * @param {Number} x
  * @param {Number} y
  * @returns {Vec2}
  */
  subtractXY(x, y) {
    this[0] -= x; this[1] -= y;
    return this;
  }
  
  /**
  * Subtract Number (Faster)
  *
  * @param {Number} a
  * @returns {Vec2}
  */
  subtractNumber(a) {
    this[0] -= a; this[1] -= a;
    return this;
  }
  
  /**
  * Subtract Vec2 (Faster)
  *
  * @param {Vec2} a
  * @returns {Vec2}
  */
  subtractVec(a) {
    this[0] -= a[0]; this[1] -= a[1];
    return this;
  }
  
  /**
  * Subtract Two Vec2s (Faster)
  *
  * @param {Vec2} a
  * @param {Vec2} b
  * @returns {Vec2}
  */
  subtractTwoVecs(a, b) {
    this[0] = a[0] - b[0]; this[1] = a[1] - b[1];
    return this;
  }
  
  /**
  * Multiply X and Y (Faster)
  *
  * @param {Number} x
  * @param {Number} y
  * @returns {Vec2}
  */
  multiplyXY(x, y) {
    this[0] *= x; this[1] *= y;
    return this;
  }
  
  /**
  * Multiply Number (Faster)
  *
  * @param {Number} a
  * @returns {Vec2}
  */
  multiplyNumber(a) {
    this[0] *= a; this[1] *= a;
    return this;
  }
  
  /**
  * Multiply Vec2 (Faster)
  *
  * @param {Vec2} a
  * @returns {Vec2}
  */
  multiplyVec(a) {
    this[0] *= a[0]; this[1] *= a[1];
    return this;
  }
  
  /**
  * Multiply Two Vec2s (Faster)
  *
  * @param {Vec2} a
  * @param {Vec2} b
  * @returns {Vec2}
  */
  multiplyTwoVecs(a, b) {
    this[0] = a[0] * b[0]; this[1] = a[1] * b[1];
    return this;
  }
  
  /**
  * Divide X and Y (Faster)
  *
  * @param {Number} x
  * @param {Number} y
  * @returns {Vec2}
  */
  divideXY(x, y) {
    this[0] /= x; this[1] /= y;
    return this;
  }
  
  /**
  * Divide Number (Faster)
  *
  * @param {Number} a
  * @returns {Vec2}
  */
  divideNumber(a) {
    this[0] /= a; this[1] /= a;
    return this;
  }
  
  /**
  * Divide Vec2 (Faster)
  *
  * @param {Vec2} a
  * @returns {Vec2}
  */
  divideVec(a) {
    this[0] /= a[0]; this[1] /= a[1];
    return this;
  }
  
  /**
  * Divide Two Vec2s (Faster)
  *
  * @param {Vec2} a
  * @param {Vec2} b
  * @returns {Vec2}
  */
  divideTwoVecs(a, b) {
    this[0] = a[0] / b[0]; this[1] = a[1] / b[1];
    return this;
  }
  
  /**
  * Math.ceil the vec2
  *
  * @returns {Vec2}
  */
  ciel() {
    this[0] = Math.ciel(this[0]); this[1] = Math.ciel(this[1]);
    return this;
  }
  
  /**
  * Math.floor the vec2
  *
  * @returns {Vec2}
  */
  floor() {
    this[0] = Math.floor(this[0]); this[1] = Math.floor(this[1]);
    return this;
  }
  
  /**
  * Returns the minimum compared to a number
  *
  * @param {Number} a the operand
  * @returns {Vec2}
  */
  minNumber(a) {
    this[0] = Math.min(a, this[0]); this[1] = Math.min(a, this[1]);
    return this;
  }
  
  /**
  * Returns the minimum compared to another Vec2
  *
  * @param {Vec2} a the operand
  * @returns {Vec2}
  */
  minVec(a) {
    this[0] = Math.min(a[0], this[0]); this[1] = Math.min(a[1], this[1]);
    return this;
  }
  
  /**
  * Returns the minimum of two vec2's
  *
  * @param {Vec2} a the first operand
  * @param {Vec2} b the second operand
  * @returns {Vec2}
  */
  minTwoVecs(a, b) {
    this[0] = Math.min(a[0], b[0]); this[1] = Math.min(a[1], b[1]);
    return this;
  }
  
  /**
  * Returns the maximum compared to a number
  *
  * @param {Number} a the operand
  * @returns {Vec2}
  */
  maxNumber(a) {
    this[0] = Math.max(a, this[0]); this[1] = Math.max(a, this[1]);
    return this;
  }
  
  /**
  * Returns the maximum compared to another Vec2
  *
  * @param {Vec2} a the operand
  * @returns {Vec2}
  */
  maxVec(a) {
    this[0] = Math.max(a[0], this[0]); this[1] = Math.max(a[1], this[1]);
    return this;
  }
  
  /**
  * Returns the maximum of two vec2's
  *
  * @param {Vec2} a the first operand
  * @param {Vec2} b the second operand
  * @returns {Vec2}
  */
  maxTwoVecs(a, b) {
    this[0] = Math.max(a, b); this[1] = Math.max(a, b);
    return this;
  }
  
  /**
  * Clamps Both points using x & y
  *
  * @param {Number} x the first operand
  * @param {Number} y the second operand
  * @returns {Vec2}
  */
  clampXY(x, y) {
    return Vec2.clampXY(this, x, y);
  }
  
  /**
  * Clamps Both points using a vec
  *
  * @param {Vec2} a the operand
  * @returns {Vec2}
  */
  clampVec(a) {
    return Vec2.clampVec(this, a);
  }
  
  /**
  * Clamps Both points using two seperate Vec2s
  *
  * @param {Vec2} a the first operand
  * @param {Vec2} b the second operand
  * @returns {Vec2}
  */
  clampTwoVecs(a, b) {
    return Vec2.clampTwoVecs(this, a, b);
  }
  
  /**
  * Math.round the components of a vec2
  *
  * @returns {Vec2}
  */
  round() {
    return Vec2.round(this);
  }
  
  /**
  * Math.round the components of a vec2 to the nearest number
  *
  * @param {Number} a nearest number
  * @returns {Vec2}
  */
  roundToNumber(a) {
    return Vec2.roundToNumber(this, a);
  }
  
  /**
  * Math.round the components to the nearest number of another Vec2
  *
  * @param {Vec2} a rounding Vec2
  * @returns {Vec2}
  */
  roundToVec(a) {
    return Vec2.roundToVec(this, a);
  }
  
  /**
  * Sets the fractional parts
  *
  * @returns {Vec2}
  */
  fract() {
    return Vec2.fract(this);
  }
  
  /**
  * Sets the fractional parts of a Vec2
  *
  * @param {Vec2} a vec to get fractional of
  * @returns {Vec2}
  */
  fractVec(a) {
    return Vec2.fractVec(this, a);
  }
  
  /**
  * Scales based on a number
  *
  * @param {Number} a scalar
  * @returns {Vec2}
  */
  scaleNumber(a) {
    this[0] *= a; this[1] *= a;
    return this;
  }
  
  /**
  * Scales another Vec2 based on a number
  *
  * @param {Vec2} a Vec2 to scale
  * @param {Number} b scalar
  * @returns {Vec2}
  */
  scaleVec(a, b) {
    return Vec2.scaleVec(a, b);
  }
  
  /**
  * Scales a vec2 and then adds it
  *
  * @param {Vec2} a Vec2 to scale
  * @param {Number} b scalar
  * @returns {Vec2}
  */
  scaleVecAndAdd(a, b) {
    return Vec2.scaleVecAndAdd(this, a, b);
  }
  
  /**
  * Scales a Vec2 and then adds it to a Vec2
  *
  * @param {Vec2} a Vec2 to add the scaled vec to
  * @param {Vec2} b Vec2 to scale
  * @param {Number} c scalar
  * @returns {Vec2}
  */
  scaleVecAndAddVec(a, b, c) {
    return Vec2.scaleVecAndAddVec(this, a, b, c);
  }
  
  /**
  * Calculates the euclidian distance between two vec2's
  *
  * @param {Vec2} a the operand
  * @returns {Number} distance between vec2 and this
  */
  distance(a) {
    return Vec2.distance(this, a);
  }
  
  /**
  * Calculates the squared euclidian distance between two vec2's
  *
  * @param {Vec2} a the operand
  * @returns {Number} squared distance between a and this
  */
  distanceSquared(a) {
    return Vec2.distanceSquared(this, a);
  }
  
  /**
  * Calculates the euclidian length
  *
  * @returns {Number} squared length
  */
  len() {
    return Math.sqrt(this[0] * this[0] + this[1] * this[1])
  }
  
  /**
  * Calculates the squared length
  *
  * @returns {Number} squared length
  */
  lenSquared() {
    return this[0] * this[0] + this[1] * this[1];
  }
  
  /**
  * Sets the squared length
  *
  * @param {Number} len length to set it to
  * @returns {Vec2}
  */
  setLen(len) {
    return Vec2.normalize(this).scaleNumber(len);
  }
  
  /**
  * Negates the components
  *
  * @returns {Vec2}
  */
  negate() {
    this[0] = -this[0]; this[1] = -this[1];
    return this;
  }
  
  /**
  * sets the inverse
  *
  * @returns {Vec2}
  */
  inverse() {
    this[0] = 1 / this[0]; this[1] = 1 / this[1];
    return this;
  }
  
  /**
  * Normalize
  *
  * @returns {Vec2}
  */
  normalize() {
    return Vec2.normalize(this);
  }
  
  /**
  * Calculates the dot product of two vec2's
  *
  * @param {Vec2} a the operand
  * @returns {Number} dot product of a and this
  */
  dot(a) {
    return this[0] * a[0] + this[1] * a[1];
  }
  
  /**
  * Computes the cross product of two vec2's
  * Note that the cross product must by definition produce a 3D vector3
  *
  * @param {Vec3} out the receiving vector
  * @param {Vec2} a the operand
  * @returns {vec3} out
  */
  cross(a, out = new Vec3()) {
    return Vec2.cross(this, a, out);
  }
  
  /**
  * Performs a linear interpolation with another Vec2
  *
  * @param {Vec2} a the operand
  * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
  * @returns {Vec2}
  */
  lerp(a, t) {
    return Vec2.lerp(this, a, t);
  }
  
  /**
  * Performs a linear interpolation between two vec2's
  *
  * @param {Vec2} a the first operand
  * @param {Vec2} b the second operand
  * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
  * @returns {Vec2}
  */
  lerpVec(a, b, t) {
    return Vec2.lerpVec(this, a, b, t);
  }
  
  /**
  * Generates a random vector with the given scale
  *
  * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
  * @returns {Vec2}
  */
  random(scale) {
    return Vec2.random(this, scale);
  }
  
  /**
  * Transforms the vec2 with a mat2
  *
  * @param {Mat2} m matrix to transform with
  * @returns {Vec2}
  */
  transformMat2(m) {
    return Vec2.transformMat2(this, m);
  }
  
  /**
  * Transforms the vec2 with a mat2d
  *
  * @param {Mat2d} m matrix to transform with
  * @returns {Vec2}
  */
  transformMat2d(m) {
    return Vec2.transformMat2d(this, m);
  }
  
  /**
  * Transforms the vec2 with a mat3
  * 3rd vector component is implicitly '1'
  *
  * @param {Mat3} m matrix to transform with
  * @returns {Vec2}
  */
  transformMat3(m) {
    return Vec2.transformMat3(this, m);
  }
  
  /**
  * Transforms the vec2 with a mat4
  * 3rd vector component is implicitly '0'
  * 4th vector component is implicitly '1'
  *
  * @param {Mat4} m matrix to transform with
  * @returns {Vec2}
  */
  transformMat4(m) {
    return Vec2.transformMat4(this, m);
  }
  
  /**
  * Rotate a 2D vector
  * @param {Vec2} a The origin of the rotation
  * @param {Number} b The angle of rotation
  * @returns {Vec2}
  */
  rotate(a, b) {
    return Vec2.rotate(this, a, b);
  }
  
  /**
  * Get the angle between two 2D vectors
  * @param {vec2} a The operand
  * @returns {Number} The angle in radians
  */
  angle(a) {
    return Vec2.angle(this, a);
  }
  
  /**
  * Returns a string representation of a vector
  *
  * @returns {String} string representation of the vector
  */
  toString() {
    return `Vec2(${this[0]},${this[1]})`;
  }
  
  /**
  * Returns whether or not the vectors exactly have the same elements in the same position
  *
  * @param {vec2} a The vector to compare.
  * @returns {Boolean} True if the vectors are equal, false otherwise.
  */
  equalsExact(a) {
    return this[0] === a[0] && this[1] === a[1];
  }
  
  /**
  * Returns whether or not the vectors have approximately the same elements in the same position.
  *
  * @param {vec2} a The vector to compare.
  * @returns {Boolean} True if the vectors are equal, false otherwise.
  */
  equals(a) {
    const c1 = Math.abs(this[0] - a[0]) <= EPSILON * Math.max(1, Math.abs(this[0]), Math.abs(a[0])),
          c2 = Math.abs(this[1] - a[1]) <= EPSILON * Math.max(1, Math.abs(this[1]), Math.abs(a[1]));
    
    return c1 && c2;
  }
  
  /* ENDREGION METHODS */
  
  /* REGION STATICS */
  static clone(out = new Vec2()) {
    return new Vec2(out);
  }
  
  static zero(out = new Vec2()) {
    out[0] = out[1] = 0;
    
    return out;
  }
  
  static zeroClamp(out = new Vec2()) {
    if(Math.abs(out[0]) <= NEARZERO) out[0] = 0;
    if(Math.abs(out[1]) <= NEARZERO) out[1] = 0;
    return out;
  }
  
  static setXY(out = new Vec2(), x, y) {
    out[0] = x; out[1] = y;
    return out;
  }
  
  static setNumber(out = new Vec2(), a) {
    out[0] = out[1] = a;
    
    return out;
  }
  
  static setVec(out = new Vec2(), a) {
    out[0] = a[0]; out[1] = a[1];
    return out;
  }
  
  static copy(out = new Vec2(), a) {
    out[0] = a[0];
    out[1] = a[1];
    
    return out;
  }
  
  static addXY(out = new Vec2(), a, b) {
    out[0] += a;
    out[1] += b;
    
    return out;
  }
  
  static addNumber(out = new Vec2(), a) {
    out[0] += a; out[1] += a;
    return out;
  }
  
  static addVec(out = new Vec2(), a) {
    out[0] += a[0]; out[1] += a[1];
    return out;
  }
  
  static addTwoVecs(out = new Vec2(), a, b) {
    out[0] = a[0] + b[0]; out[1] = a[1] + b[1];
    return out;
  }
  
  static subtractXY(out = new Vec2(), x, y) {
    out[0] -= x; out[1] -= y;
    return out;
  }
  
  static subtractNumber(out = new Vec2(), a) {
    out[0] -= a; out[1] -= a;
    return out;
  }
  
  static subtractVec(out = new Vec2(), a) {
    out[0] -= a[0]; out[1] -= a[1];
    return out;
  }
  
  static subtractTwoVecs(out = new Vec2(), a, b) {
    out[0] = a[0] - b[0]; out[1] = a[1] - b[1];
    return out;
  }
  
  static multiplyXY(out = new Vec2(), x, y) {
    out[0] *= x; out[1] *= y;
    return out;
  }

  static multiplyNumber(out = new Vec2(), a) {
    out[0] *= a; out[1] *= a;
    return out;
  }

  static multiplyVec(out = new Vec2(), a) {
    out[0] *= a[0]; out[1] *= a[1];
    return out;
  }

  static multiplyTwoVecs(out = new Vec2(), a, b) {
    out[0] = a[0] * b[0]; out[1] = a[1] * b[1];
    return out;
  }

  static divideXY(out = new Vec2(), x, y) {
    out[0] /= x; out[1] /= y;
    return out;
  }

  static divideNumber(out = new Vec2(), a) {
    out[0] /= a; out[1] /= a;
    return out;
  }

  static divideVec(out = new Vec2(), a) {
    out[0] /= a[0]; out[1] /= a[1];
    return out;
  }

  static divideTwoVecs(out = new Vec2(), a, b) {
    out[0] = a[0] / b[0]; out[1] = a[1] / b[1];
    return out;
  }
  
  static ciel(out = new Vec2()) {
    out[0] = Math.ciel(out[0]); out[1] = Math.ciel(out[1]);
    return out;
  }
  
  static floor(out = new Vec2()) {
    out[0] = Math.floor(out[0]); out[1] = Math.floor(out[1]);
    return out;
  }
  
  static minNumber(out = new Vec2(), a) {
    out[0] = Math.min(a, out[0]); out[1] = Math.min(a, out[1]);
    return out;
  }
  
  static minVec(out = new Vec2(), a) {
    out[0] = Math.min(a[0], out[0]); out[1] = Math.min(a[1], out[1]);
    return out;
  }

  static minTwoVecs(out = new Vec2(), a, b) {
    out[0] = Math.min(a[0], b[0]); out[1] = Math.min(a[1], b[1]);
    return out;
  }

  static maxNumber(out = new Vec2(), a) {
    out[0] = Math.max(a, out[0]); out[1] = Math.max(a, out[1]);
    return out;
  }
  
  static maxVec(out = new Vec2(), a) {
    out[0] = Math.max(a[0], out[0]); out[1] = Math.max(a[1], out[1]);
    return out;
  }

  static maxTwoVecs(out = new Vec2(), a, b) {
    out[0] = Math.max(a[0], b[0]); out[1] = Math.max(a[1], b[1]);
    return out;
  }
  
  static clampXY(out = new Vec2(), x, y) {
    out[0] = Math.min(Math.max(out[0], x), y);
    out[1] = Math.min(Math.max(out[1], x), y);
    return out;
  }
  
  static clampVec(out = new Vec2(), a) {
    out[0] = Math.min(Math.max(out[0], a[0]), a[1]);
    out[1] = Math.min(Math.max(out[1], a[0]), a[1]);
    return out;
  }
  
  static clampTwoVecs(out = new Vec2(), a, b) {
    out[0] = Math.min(Math.max(out[0], a[0]), a[1]);
    out[1] = Math.min(Math.max(out[1], b[0]), b[1]);
    return out;
  }
  
  static round(out = new Vec2()) {
    out[0] = Math.round(out[0]); out[1] = Math.round(out[1]);
    return out;
  }

  static roundToNumber(out = new Vec2(), a) {
    out[0] = Math.round(out[0] / a) * a; out[1] = Math.round(out[1] / a) * a;
    return out;
  }
  
  static roundToVec(out = new Vec2(), a) {
    out[0] = Math.round(out[0] / a[0]) * a[0]; out[1] = Math.round(out[1] / a[1]) * a[1];
    return out;
  }
  
  static fract(out = new Vec2()) {
    out[0] = (out[0] - Math.floor(out[0]));
    out[1] = (out[1] - Math.floor(out[1]));
    return out;
  }
  
  static fractVec(out = new Vec2(), a) {
    out[0] = (a[0] - Math.floor(a[0]));
    out[1] = (a[1] - Math.floor(a[1]));
    return out;
  }
  
  static scaleNumber(out = new Vec2(), a) {
    out[0] *= a; out[1] *= a;
    return out;
  }
  
  static scaleVec(out = new Vec2(), a, b) {
    out[0] = a[0] * b; out[1] = a[1] * b;
    return out;
  }
  
  static scaleVecAndAdd(out = new Vec2(), a, b) {
    out[0] += (a[0] * b); out[1] += (a[1] * b);
    return out;
  }
  
  static scaleVecAndAddVec(out = new Vec2(), a, b, c) {
    out[0] = a[0] + (b[0] * c);
    out[1] = a[1] + (b[1] * c);
    return out;
  }
  
  static distance(out = new Vec2(), a) {
    const x = out[0] - a[0],
          y = out[1] - a[1];
    return Math.sqrt(x * x + y * y);
  }
  
  static distanceSquared(out = new Vec2(), a) {
    const x = out[0] - a[0],
          y = out[1] - a[1];
    return x * x + y * y;
  }
  
  static len(out = new Vec2()) {
    return Math.sqrt(out[0] * out[0] + out[1] * out[1]);
  }
  
  static lenSquared(out = new Vec2()) {
    return out[0] * out[0] + out[1] * out[1];
  }

  static setLen(out = new Vec2(), len) {
    Vec2.normalize(out);
    Vec2.scale(out, len);
    return out;
  }
  
  static negate(out = new Vec2()) {
    out[0] = -out[0]; out[1] = -out[1];
    return out;
  }

  static inverse(out = new Vec2()) {
    out[0] = 1 / out[0]; out[1] = 1 / out[1];
    return out;
  }
  
  static normalize(out = new Vec2()) {
    const len = Math.sqrt(out[0] * out[0] + out[1] * out[1]);
    if(!len) return out;

    out[0] *= 1 / len; out[1] *= 1 / len;
    return out;
  }
  
  static dot(out = new Vec2(), a) {
    return out[0] * a[0] + out[1] * a[1];
  }

  static cross(a = new Vec2(), b, out = new Vec3()) {
    out[0] = out[1] = 0; out[2] = a[0] * b[0] - a[1] * b[1];
    return out;
  }
  
  static lerp(out = new Vec2(), a, t = 0) {
    out[0] = out[0] + t * (a[0] - out[0]);
    out[1] = out[1] + t * (a[1] - out[1]);
    return out;
  }

  static lerpVec(out = new Vec2(), a, b, t = 0) {
    out[0] = a[0] + t * (b[0] - a[0]);
    out[1] = a[1] + t * (b[1] - a[1]);
    return out;
  }
  
  static random(out = new Vec2(), scale = 1) {
    const r = Math.random() * 2 * Math.PI;

    out[0] = Math.cos(r) * scale; out[1] = Math.sin(r) * scale;
    return out;
  }
  
  static transformMat2(out = new Vec2(), m) {
    out[0] = m[0] * out[0] + m[2] * out[1];
    out[1] = m[1] * out[0] + m[3] * out[1];
    return out;
  }
  
  static transformMat2d(out = new Vec2(), m) {
    out[0] = m[0] * out[0] + m[2] * out[1] + m[4];
    out[1] = m[1] * out[0] + m[3] * out[1] + m[5];
    return out;
  }
  
  static transformMat3(out = new Vec2(), m) {
    out[0] = m[0] * out[0] + m[3] * out[1] + m[6];
    out[1] = m[1] * out[0] + m[4] * out[1] + m[7];
    return out;
  }
  
  static transformMat4(out = new Vec2(), m) {
    out[0] = m[0] * out[0] + m[4] * out[1] + m[12];
    out[1] = m[1] * out[0] + m[5] * out[1] + m[13];
    return out;
  }
  
  static rotate(out = new Vec2(), a, b) {
    const x = out[0] - a[0], y = out[1] - a[1],
          sinA = Math.sin(b), cosA = Math.cos(b);
    out[0] = x * cosA - y * sinA + a[0];
    out[1] = x * sinA + y * cosA + a[1];
    return out;
  }
  
  static angle(out = new Vec2(), a) {
    const x1 = out[0], y1 = out[1], x2 = a[0], y2 = a[1];
    
    let len1 = x1 * x1 + y1 * y1;
    if(len1) len1 = 1 / Math.sqrt(len1);
    
    let len2 = x2 * x2 + y2 * y2;
    if(len2) len2 = 1 / Math.sqrt(len2);
    
    const cosine = (x1 * x2 + y1 * y2) * len1 * len2;
    if(cosine > 1) return 0;
    if(cosine < -1) return Math.PI;
    return Math.acos(cosine);
  }
}

module.exports = Vec2;
