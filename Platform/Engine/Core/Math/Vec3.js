/* 3D VECTOR */

const { NEARZERO, DEGTORAD, EPSILON } = require('./Common');

class Vec3 extends Float32Array {
  constructor(arg1, arg2, arg3) {
    super(3);
    switch(arguments.length)
    {
      /* If a Vec3 or an array was passed we set the local x, y and z with these */
      case 1:
        if(arg1.length) { this[0] = arg1[0]; this[1] = arg1[1]; this[2] = arg1[2]; }
        break;
      /* if x, y and z were passed seperately we set them seperately */
      case 3:
        this[0] = arg1; this[1] = arg2; this[2] = arg3;
        break;
      /* if nothing was passed we zero out */
      default:
        this[0] = this[1] = this[2] = 0;
    }
  }
  
  /* Extra x, y and z properties tied to x, y and z indexes */
  get x() { return this[0]; } set x(v) { this[0] = v; }
  get y() { return this[1]; } set y(v) { this[1] = v; }
  get z() { return this[2]; } set z(v) { this[2] = v; }
  
  /**
  * Creates a new vec3 initialized with values from the existing vector
  *
  * @returns {Vec3} a new 3D vector
  */
  clone() {
    return new Vec3(this);
  }
  
  /**
  * Set the vec3 to zero
  *
  * @returns {Vec3}
  */
  zero() {
    this[0] = this[1] = this[2] = 0;
  }
  
  /**
  * Sets the vec3 point to zero if the number is below 6 decimal places
  *
  * @returns {Vec3}
  */
  zeroClamp() {
    return Vec3.zeroClamp(this);
  }
  
  /**
  * Sets X, Y and Z (Faster)
  *
  * @param {Number} x
  * @param {Number} y
  * @param {Number} z
  * @returns {Vec3}
  */
  setXYZ(x, y, z) {
    this[0] = x; this[1] = y; this[2] = z;
    return this;
  }
  
  /**
  * Sets Number (Faster)
  *
  * @param {Number} a
  * @returns {Vec3}
  */
  setNumber(a) {
    this[0] = this[1] = this[2] = a;
    return this;
  }
  
  /**
  * Sets Vec3 (Faster)
  *
  * @param {Vec3} a
  * @returns {Vec3}
  */
  setVec(a) {
    this[0] = a[0]; this[1] = a[1]; this[2] = a[2];
    return this;
  }
  
  /**
  * Sets the Vec3 based on a quat and forward vector
  *
  * @param {Quat} q
  * @param {Vec3} v
  * @returns {Vec3}
  */
  setQuat(q, v = new Vec3(Vec3.FORWARD)) {
    return Vec3.setQuat(this, q, v);
  }
  
  /**
  * Copy the values from one vec3 to this vec3
  *
  * @param {Vec3} a the source vector
  * @returns {Vec3}
  */
  copy(a) {
    return this.setVec(a)
  }
  
  /**
  * Add X, Y and Z (Faster)
  *
  * @param {Number} x
  * @param {Number} y
  * @param {Number} z
  * @returns {Vec3}
  */
  addXYZ(x, y, z) {
    this[0] += x; this[1] += y; this[2] += z;
    return this;
  }
  
  /**
  * Add Number (Faster)
  *
  * @param {Number} a
  * @returns {Vec3}
  */
  addNumber(a) {
    this[0] += a; this[1] += a; this[2] += a;
    return this;
  }
  
  /**
  * Add Vec3 (Faster)
  *
  * @param {Vec3} a
  * @returns {Vec3}
  */
  addVec(a) {
    this[0] += a[0]; this[1] += a[1]; this[2] += a[2];
    return this;
  }
  
  /**
  * Add Two Vec3s (Faster)
  *
  * @param {Vec3} a
  * @param {Vec3} b
  * @returns {Vec3}
  */
  addTwoVecs(a, b) {
    this[0] = a[0] + b[0]; this[1] = a[1] + b[1]; this[2] = a[2] + b[2];
    return this;
  }
  
  /**
  * Subtract X, Y and Z (Faster)
  *
  * @param {Number} x
  * @param {Number} y
  * @param {Number} z
  * @returns {Vec3}
  */
  subtractXYZ(x, y, z) {
    this[0] -= x; this[1] -= y; this[2] -= z;
    return this;
  }
  
  /**
  * Subtract Number (Faster)
  *
  * @param {Number} a
  * @returns {Vec3}
  */
  subtractNumber(a) {
    this[0] -= a; this[1] -= a; this[2] -= a;
    return this;
  }
  
  /**
  * Subtract Vec3 (Faster)
  *
  * @param {Vec3} a
  * @returns {Vec3}
  */
  subtractVec(a) {
    this[0] -= a[0]; this[1] -= a[1]; this[2] -= a[2];
    return this;
  }
  
  /**
  * Subtract Two Vec3s (Faster)
  *
  * @param {Vec3} a
  * @param {Vec3} b
  * @returns {Vec3}
  */
  subtractTwoVecs(a, b) {
    this[0] = a[0] - b[0]; this[1] = a[1] - b[1]; this[2] = a[2] - b[2];
    return this;
  }
  
  /**
  * Multiply X, Y and Z (Faster)
  *
  * @param {Number} x
  * @param {Number} y
  * @param {Number} z
  * @returns {Vec3}
  */
  multiplyXYZ(x, y, z) {
    this[0] *= x; this[1] *= y; this[2] *= z;
    return this;
  }
  
  /**
  * Multiply Number (Faster)
  *
  * @param {Number} a
  * @returns {Vec3}
  */
  multiplyNumber(a) {
    this[0] *= a; this[1] *= a; this[2] *= a;
    return this;
  }
  
  /**
  * Multiply Vec3 (Faster)
  *
  * @param {Vec3} a
  * @returns {Vec3}
  */
  multiplyVec(a) {
    this[0] *= a[0]; this[1] *= a[1]; this[2] *= a[2];
    return this;
  }
  
  /**
  * Multiply Two Vec3s (Faster)
  *
  * @param {Vec3} a
  * @param {Vec3} b
  * @returns {Vec3}
  */
  multiplyTwoVecs(a, b) {
    this[0] = a[0] * b[0]; this[1] = a[1] * b[1]; this[2] = a[2] * b[2];
    return this;
  }
  
  /**
  * Divide X, Y and Z (Faster)
  *
  * @param {Number} x
  * @param {Number} y
  * @param {Number} z
  * @returns {Vec3}
  */
  divideXYZ(x, y, z) {
    this[0] /= x; this[1] /= y; this[2] /= z;
    return this;
  }
  
  /**
  * Divide Number (Faster)
  *
  * @param {Number} a
  * @returns {Vec3}
  */
  divideNumber(a) {
    this[0] /= a; this[1] /= a; this[2] /= a;
    return this;
  }
  
  /**
  * Divide Vec3 (Faster)
  *
  * @param {Vec3} a
  * @returns {Vec3}
  */
  divideVec(a) {
    this[0] /= a[0]; this[1] /= a[1]; this[2] /= a[2];
    return this;
  }
  
  /**
  * Divide Two Vec3s (Faster)
  *
  * @param {Vec3} a
  * @param {Vec3} b
  * @returns {Vec3}
  */
  divideTwoVecs(a, b) {
    this[0] = a[0] / b[0]; this[1] = a[1] / b[1]; this[2] = a[2] / b[2];
    return this;
  }
  
  /**
  * Math.ceil the vec3
  *
  * @returns {Vec3}
  */
  ciel() {
    this[0] = Math.ciel(this[0]); this[1] = Math.ciel(this[1]); this[2] = Math.ciel(this[2]);
    return this;
  }
  
  /**
  * Math.floor the vec3
  *
  * @returns {Vec3}
  */
  floor() {
    this[0] = Math.floor(this[0]); this[1] = Math.floor(this[1]); this[2] = Math.floor(this[2]);
    return this;
  }
  
  /**
  * Returns the minimum compared to a number
  *
  * @param {Number} a the operand
  * @returns {Vec3}
  */
  minNumber(a) {
    this[0] = Math.min(a, this[0]);
    this[1] = Math.min(a, this[1]);
    this[2] = Math.min(a, this[2]);
    return this;
  }
  
  /**
  * Returns the minimum compared to a Vec3
  *
  * @param {Vec3} a the operand
  * @returns {Vec3}
  */
  minVec(a) {
    this[0] = Math.min(a[0], this[0]);
    this[1] = Math.min(a[1], this[1]);
    this[2] = Math.min(a[2], this[2]);
    return this;
  }
  
  /**
  * Returns the minimum of two vec3's
  *
  * @param {Vec3} a the first operand
  * @param {Vec3} b the second operand
  * @returns {Vec3}
  */
  minTwoVecs(a, b) {
    this[0] = Math.min(a[0], b[0]);
    this[1] = Math.min(a[1], b[1]);
    this[2] = Math.min(a[2], b[2]);
    return this;
  }
  
  /**
  * Returns the maximum of a Number
  *
  * @param {Number} a the operand
  * @returns {Vec2}
  */
  maxNumber(a) {
    this[0] = Math.max(a, this[0]); this[1] = Math.max(a, this[1]);
    return this;
  }
  
  /**
  * Returns the maximum compared to a Vec3
  *
  * @param {Vec3} a the operand
  * @returns {Vec3}
  */
  maxVec(a) {
    this[0] = Math.max(a[0], this[0]);
    this[1] = Math.max(a[1], this[1]);
    this[2] = Math.max(a[2], this[2]);
    return this;
  }
  
  /**
  * Returns the maximum of two vec3's
  *
  * @param {Vec3} a the first operand
  * @param {Vec3} b the second operand
  * @returns {Vec3}
  */
  maxTwoVecs(a, b) {
    this[0] = Math.max(a[0], b[0]);
    this[1] = Math.max(a[1], b[1]);
    this[2] = Math.max(a[2], b[2]);
    return this;
  }
  
  /**
  * Math.round the components of a vec3
  *
  * @returns {Vec3}
  */
  round() {
    return Vec3.round(this);
  }
  
  /**
  * Math.round the components of a vec3 to the nearest number
  *
  * @param {Number} a nearest number
  * @returns {Vec3}
  */
  roundToNumber(a) {
    return Vec3.roundToNumber(this, a);
  }
  
  /**
  * Math.round the components to the nearest number of another Vec3
  *
  * @param {Vec3} a rounding Vec3
  * @returns {Vec3}
  */
  roundToVec(a) {
    return Vec3.roundToVec(this, a)
  }
  
  /**
  * Scales based on a number
  *
  * @param {Number} a scalar
  * @returns {Vec3}
  */
  scaleNumber(a) {
    this[0] *= a; this[1] *= a; this[2] *= a;
    return this;
  }
  
  /**
  * Scales another Vec3 based on a number
  *
  * @param {Vec3} a Vec3 to scale
  * @param {Number} b scalar
  * @returns {Vec3}
  */
  scaleVec(a, b) {
    return Vec3.scaleVec(this, a, b);
  }
  
  /**
  * Scales a vec3 and then adds it
  *
  * @param {Vec3} a Vec3 to scale
  * @param {Number} b scalar
  * @returns {Vec3}
  */
  scaleVecAndAdd(a, b) {
    return Vec3.scaleVecAndAdd(this, a, b);
  }
  
  /**
  * Scales a Vec3 and then adds it to another Vec3
  *
  * @param {Vec3} a Vec3 to add the scaled vec to
  * @param {Vec3} b Vec3 to scale
  * @param {Number} c scalar
  * @returns {Vec3}
  */
  scaleVecAndAddVec(a, b, c) {
    return Vec3.scaleVecAndAddVec(this, a, b, c);
  }
  
  /**
  * Calculates the euclidian distance between two vec3's
  *
  * @param {Vec3} a the operand
  * @returns {Number} distance between a and this
  */
  distance(a) {
    return Vec3.distance(this, a);
  }
  
  /**
  * Calculates the squared euclidian distance between two vec3's
  *
  * @param {Vec3} a the operand
  * @returns {Number} squared distance between a and this
  */
  distanceSquared(a) {
    return Vec3.distanceSquared(this, a);
  }
  
  /**
  * Calculates the euclidian length
  *
  * @returns {Number} squared length
  */
  len() {
    return Math.sqrt(this[0] * this[0] + this[1] * this[1] + this[2] * this[2]);
  }
  
  /**
  * Calculates the squared length
  *
  * @returns {Number} squared length
  */
  lenSquared() {
    return this[0] * this[0] + this[1] * this[1] + this[2] * this[2];
  }
  
  /**
  * Sets the squared length
  *
  * @param {Number} len length to set it to
  * @returns {Vec3}
  */
  setLen(len) {
    return Vec3.normalize(this).scaleNumber(len);
  }
  
  /**
  * Negates the components
  *
  * @returns {Vec3}
  */
  negate() {
    this[0] = -this[0]; this[1] = -this[1]; this[2] = -this[2];
    return this;
  }
  
  /**
  * sets the inverse
  *
  * @returns {Vec3}
  */
  inverse() {
    this[0] = 1 / this[0]; this[1] = 1 / this[1]; this[2] = 1 / this[2];
    return this;
  }
  
  /**
  * Normalize
  *
  * @returns {Vec3}
  */
  normalize() {
    return Vec3.normalize(this);
  }
  
  /**
  * Calculates the dot product of two vec3's
  *
  * @param {Vec3} a the operand
  * @returns {Number} dot product of a and this
  */
  dot(a) {
    return this[0] * a[0] + this[1] * a[1] + this[2] * a[2];
  }
  
  /**
  * Computes the cross product of two vec3's
  *
  * @param {Vec3} a the first operand
  * @param {Vec3} b the operand
  * @returns {vec3} out
  */
  cross(a, b) {
    return Vec3.cross(this, a, b);
  }
  
  /**
  * Performs a linear interpolation with another Vec3
  *
  * @param {Vec3} a the operand
  * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
  * @returns {Vec3}
  */
  lerp(a, t) {
    return Vec3.lerp(this, a, t);
  }
  
  /**
  * Performs a linear interpolation between two vec3's
  *
  * @param {Vec3} a the first operand
  * @param {Vec3} b the second operand
  * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
  * @returns {Vec3}
  */
  lerpVec(a, b, t) {
    return Vec3.lerpVec(this, a, b, t);
  }
  
  /**
  * Performs a polar interpolation based on a lon and lat
  *
  * @param {Number} lon the longitude
  * @param {Number} lat the latitude
  * @returns {Vec3}
  */
  polar(lon, lat) {
    return Vec3.polar(this, lon, lat);
  }
  
  /**
  * Performs a hermite interpolation with two control points
  *
  * @param {Vec3} a the first operand
  * @param {Vec3} b the second operand
  * @param {Vec3} c the third operand
  * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
  * @returns {Vec3} out
  */
  hermite(a, b, c, t) {
    return Vec3.hermite(this, a, b, c, t);
  }
  
  /**
  * Performs a hermite interpolation with two control points based on another vector
  *
  * @param {Vec3} a the first operand
  * @param {Vec3} b the second operand
  * @param {Vec3} c the third operand
  * @param {Vec3} d the fourth operand
  * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
  * @returns {Vec3} out
  */
  hermiteVec(a, b, c, d, t) {
    return Vec3.hermiteVec(this, a, b, c, d, t);
  }
  
  /**
  * Performs a bezier interpolation with two control points
  *
  * @param {Vec3} a the first operand
  * @param {Vec3} b the second operand
  * @param {Vec3} c the third operand
  * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
  * @returns {Vec3} out
  */
  bezier(a, b, c, t) {
    return Vec3.bezier(this, a, b, c, t);
  }
  
  /**
  * Performs a bezier interpolation with two control points based on another vector
  *
  * @param {Vec3} a the first operand
  * @param {Vec3} b the second operand
  * @param {Vec3} c the third operand
  * @param {Vec3} d the fourth operand
  * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
  * @returns {Vec3} out
  */
  bezierVec(a, b, c, d, t) {
    return Vec3.bezierVec(this, a, b, c, d, t);
  }
  
  /**
  * Generates a random vector with the given scale
  *
  * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
  * @returns {Vec3}
  */
  random(scale) {
    return Vec3.random(this, scale);
  }
  
  /**
  * Transforms the vec3 with a mat3.
  *
  * @param {mat3} m the 3x3 matrix to transform with
  * @returns {vec3} out
  */
  transformMat3(m) {
    return Vec3.transformMat3(this, m);
  }
  
  /**
  * Transforms the vec3 with a mat4.
  * 4th vector component is implicitly '1'
  *
  * @param {mat4} m matrix to transform with
  * @returns {vec3} out
  */
  transformMat4(m) {
    return Vec3.transformMat4(this, m);
  }
  
  /**
  * Transforms the vec3 with a quat
  * Can also be used for dual quaternions. (Multiply it with the real part)
  *
  * @param {quat} q quaternion to transform with
  * @returns {vec3} out
  */
  transformQuat(q) {
    return Vec3.transformQuat(this, q);
  }
  
  /**
  * Rotate a 3D vector around the x-axis
  * @param {Number} a The angle of rotation
  * @returns {Vec3} out
  */
  rotateX(a) {
    return Vec3.rotateX(this, a);
  }
  
  /**
  * Rotate a 3D vector around the x-axis
  * @param {Vec3} a The origin of the rotation
  * @param {Number} b The angle of rotation
  * @returns {Vec3} out
  */
  rotateXVec(a, b) {
    return Vec3.rotateXVec(this, a, b);
  }
  
  /**
  * Rotate a 3D vector around the x-axis
  * @param {Vec3} a The Vec3 point to rotate
  * @param {Vec3} b The origin of the rotation
  * @param {Number} c The angle of rotation
  * @returns {Vec3} out
  */
  rotateXVecToVec(a, b, c) {
    return Vec3.rotateXVecToVec(this, a, b, c);
  }
  
  /**
  * Rotate a 3D vector around the y-axis
  * @param {Number} a The angle of rotation
  * @returns {Vec3} out
  */
  rotateY(a) {
    return Vec3.rotateY(this, a);
  }
  
  /**
  * Rotate a 3D vector around the y-axis
  * @param {Vec3} a The origin of the rotation
  * @param {Number} b The angle of rotation
  * @returns {Vec3} out
  */
  rotateYVec(a, b) {
    return Vec3.rotateYVec(this, a, b);
  }
  
  /**
  * Rotate a 3D vector around the y-axis
  * @param {Vec3} a The Vec3 point to rotate
  * @param {Vec3} b The origin of the rotation
  * @param {Number} c The angle of rotation
  * @returns {Vec3} out
  */
  rotateYVecToVec(a, b, c) {
    return Vec3.rotateYVecToVec(this, a, b, c);
  }
  
  /**
  * Rotate a 3D vector around the z-axis
  * @param {Number} a The angle of rotation
  * @returns {Vec3} out
  */
  rotateZ(a) {
    return Vec3.rotateZ(this, a);
  }
  
  /**
  * Rotate a 3D vector around the z-axis
  * @param {Vec3} a The origin of the rotation
  * @param {Number} b The angle of rotation
  * @returns {Vec3} out
  */
  rotateZVec(a, b) {
    return Vec3.rotateZVec(this, a, b);
  }
  
  /**
  * Rotate a 3D vector around the z-axis
  * @param {Vec3} a The Vec3 point to rotate
  * @param {Vec3} b The origin of the rotation
  * @param {Number} c The angle of rotation
  * @returns {Vec3} out
  */
  rotateZVecToVec(a, b, c) {
    return Vec3.rotateZVecToVec(this, a, b, c);
  }
  
  /**
  * Rotate a 3D vector based on another vector axis
  * @param {Vec3} a The axis vector
  * @param {Number} b The angle of rotation
  * @returns {Vec3} out
  */
  rotateAxisAngle(a, b) {
    return Vec3.rotateAxisAngle(this, a, b);
  }
  
  /**
  * Rotate a 3D vector based on another vector axis
  * @param {Vec3} a The origin vector
  * @param {Vec3} b The axis vector
  * @param {Number} c The angle of rotation
  * @returns {Vec3} out
  */
  rotateAxisAngleVec(a, b, c) {
    return Vec3.rotateAxisAngleVec(this, a, b, c);
  }
  
  /**
  * Get the angle between two 3D vectors
  * @param {Vec3} a The operand
  * @returns {Number} The angle in radians
  */
  angle(a) {
    return Math.atan2(Vec3.cross(this, a), Vec3.dot(this, a));
  }
  
  /**
  * Translates a rgb array to a normalized Vec3
  * @param {RGB ARRAY} a The color array to alter
  * @returns {Vec3} the normalized Vec3
  */
  rgbToVec(rgb) {
    return new Vec3(rgb[0] / 255, rgb[1] / 255, rgb[2] / 255);
  }
  
  /**
  * Returns a string representation of a vector
  *
  * @returns {String} string representation of the vector
  */
  toString() {
    return `Vec3(${this[0]},${this[1]},${this[2]})`;
  }
  
  /**
  * Returns whether or not the vectors exactly have the same elements in the same position
  *
  * @param {Vec3} a The vector to compare.
  * @returns {Boolean} True if the vectors are equal, false otherwise.
  */
  equalsExact(a) {
    return this[0] === a[0] && this[1] === a[1] && this[2] === a[2];
  }
  
  /**
  * Returns whether or not the vectors have approximately the same elements in the same position.
  *
  * @param {Vec3} a The vector to compare.
  * @returns {Boolean} True if the vectors are equal, false otherwise.
  */
  equals(a) {
    const c1 = Math.abs(this[0] - a[0]) <= EPSILON * Math.max(1, Math.abs(this[0]), Math.abs(a[0])),
          c2 = Math.abs(this[1] - a[1]) <= EPSILON * Math.max(1, Math.abs(this[1]), Math.abs(a[1])),
          c3 = Math.abs(this[2] - a[2]) <= EPSILON * Math.max(1, Math.abs(this[2]), Math.abs(a[2]));
    
    return c1 && c2 && c3;
  }
  
  /* REGION STATICS */
  static clone(out = new Vec3()) {
    return new Vec3(out);
  }
  
  static zero(out = new Vec3()) {
    out[0] = out[1] = out[2] = 0;
    
    return out;
  }
  
  static zeroClamp(out = new Vec3()) {
    if(Math.abs(out[0]) <= NEARZERO) out[0] = 0;
    if(Math.abs(out[1]) <= NEARZERO) out[1] = 0;
    if(Math.abs(out[2]) <= NEARZERO) out[2] = 0;
    return out;
  }
  
  static setXYZ(out = new Vec3(), x, y, z) {
    out[0] = x; out[1] = y; out[2] = z;
    return out;
  }
  
  static setNumber(out = new Vec3(), a) {
    out[0] = out[1] = out[2] = a;
    return out;
  }
  
  static setVec(out = new Vec3(), a) {
    out[0] = a[0]; out[1] = a[1]; out[2] = a[2];
    return out;
  }
  
  static setQuat(out = new Vec3(), q, v = new Vec3(Vec3.FORWARD)) {
    const qx = q[0], qy = q[1], qz = q[2], qw = q[3],
          vx = v[0], vy = v[1], vz = v[2],
          x1 = qy * vz - qz * vy,
          y1 = qz * vx - qx * vz,
          z1 = qx * vy - qy * vx;
    
    out[0] = vx + 2 * (qw * x1 + qy * z1 - qz * y1);
    out[1] = vy + 2 * (qw * y1 + qz * x1 - qx * z1);
    out[2] = vz + 2 * (qw * z1 + qx * y1 - qy * x1);
    return this;
  }
  
  static copy(out = new Vec3(), a) {
    return Vec3.setVec(out, a);
  }
  
  static addXYZ(out = new Vec3(), x, y, z) {
    out[0] += x; out[1] += y; out[2] += z;
    return out;
  }

  static addNumber(out = new Vec3(), a) {
    out[0] += a; out[1] += a; out[2] += a;
    return out;
  }

  static addVec(out = new Vec3(), a) {
    out[0] += a[0]; out[1] += a[1]; out[2] += a[2];
    return this;
  }

  static addTwoVecs(out = new Vec3(), a, b) {
    out[0] = a[0] + b[0]; out[1] = a[1] + b[1]; out[2] = a[2] + b[2];
    return out;
  }

  static subtractXYZ(out = new Vec3(), x, y, z) {
    out[0] -= x; out[1] -= y; out[2] -= z;
    return out;
  }

  static subtractNumber(out = new Vec3(), a) {
    out[0] -= a; out[1] -= a; out[2] -= a;
    return out;
  }

  static subtractVec(out = new Vec3(), a) {
    out[0] -= a[0]; out[1] -= a[1]; out[2] -= a[2];
    return out;
  }

  static subtractTwoVecs(out = new Vec3(), a, b) {
    out[0] = a[0] - b[0]; out[1] = a[1] - b[1]; out[2] = a[2] - b[2];
    return out;
  }

  static multiplyXYZ(out = new Vec3(), x, y, z) {
    out[0] *= x; out[1] *= y; out[2] *= z;
    return out;
  }

  static multiplyNumber(out = new Vec3(), a) {
    out[0] *= a; out[1] *= a; out[2] *= a;
    return out;
  }

  static multiplyVec(out = new Vec3(), a) {
    out[0] *= a[0]; out[1] *= a[1]; out[2] *= a[2];
    return out;
  }

  static multiplyTwoVecs(out = new Vec3(), a, b) {
    out[0] = a[0] * b[0]; out[1] = a[1] * b[1]; out[2] = a[2] * b[2];
    return out;
  }

  static divideXYZ(out = new Vec3(), x, y, z) {
    out[0] /= x; out[1] /= y; out[2] /= z;
    return out;
  }

  static divideNumber(out = new Vec3(), a) {
    out[0] /= a; out[1] /= a; out[2] /= a;
    return out;
  }

  static divideVec(out = new Vec3(), a) {
    out[0] /= a[0]; out[1] /= a[1]; out[2] /= a[2];
    return out;
  }

  static divideTwoVecs(out = new Vec3(), a, b) {
    out[0] = a[0] / b[0]; out[1] = a[1] / b[1]; out[2] = a[2] / b[2];
    return out;
  }
  
  static ciel(out = new Vec3()) {
    out[0] = Math.ciel(out[0]); out[1] = Math.ciel(out[1]); out[2] = Math.ciel(out[2]);
    return out;
  }

  static floor(out = new Vec3()) {
    out[0] = Math.floor(out[0]); out[1] = Math.floor(out[1]); out[2] = Math.floor(out[2]);
    return out;
  }

  static minNumber(out = new Vec3(), a) {
    out[0] = Math.min(a, out[0]);
    out[1] = Math.min(a, out[1]);
    out[2] = Math.min(a, out[2]);
    return out;
  }

  static minVec(out = new Vec3(), a) {
    out[0] = Math.min(a[0], out[0]);
    out[1] = Math.min(a[1], out[1]);
    out[2] = Math.min(a[2], out[2]);
    return out;
  }

  static minTwoVecs(out = new Vec3(), a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    return out;
  }

  static maxNumber(out = new Vec3(), a) {
    out[0] = Math.max(a, out[0]); out[1] = Math.max(a, out[1]);
    return out;
  }

  static maxVec(out = new Vec3(), a) {
    out[0] = Math.max(a[0], out[0]);
    out[1] = Math.max(a[1], out[1]);
    out[2] = Math.max(a[2], out[2]);
    return out;
  }

  static maxTwoVecs(out = new Vec3(), a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    return out;
  }
  
  static round(out = new Vec3()) {
    out[0] = Math.round(out[0]);
    out[1] = Math.round(out[1]);
    out[2] = Math.round(out[2]);
    
    return out;
  }
  
  static roundToNumber(out = new Vec3(), a) {
    out[0] = Math.round(out[0] / a) * a;
    out[1] = Math.round(out[1] / a) * a;
    out[2] = Math.round(out[2] / a) * a;

    return out;
  }
  
  static roundToVec(out = new Vec3(), a) {
    out[0] = Math.round(out[0] / a[0]) * a[0];
    out[1] = Math.round(out[1] / a[1]) * a[1];
    out[2] = Math.round(out[2] / a[2]) * a[2];
    
    return out;
  }
  
  static scaleNumber(out = new Vec3(), a) {
    out[0] *= a; out[1] *= a; out[2] *= a;
    return out;
  }
  
  static scaleVec(out = new Vec3(), a, b) {
    out[0] = a[0] * b; out[1] = a[1] * b; out[2] = a[2] * b;
    return out;
  }
  
  static scaleVecAndAdd(out = new Vec3(), a, b) {
    out[0] += (a[0] * b);
    out[1] += (a[1] * b);
    out[2] += (a[2] * b);
    return out;
  }
  
  static scaleVecAndAddVec(out = new Vec3(), a, b, c) {
    out[0] = a[0] + (b[0] * c);
    out[1] = a[1] + (b[1] * c);
    out[2] = a[2] + (b[2] * c);
    return out;
  }
  
  static distance(out = new Vec3(), a) {
    return Math.sqrt((out[0] - a[0]) ** 2 + (out[1] - a[1]) ** 2 + (out[2] - a[2]) ** 2);
  }
  
  static distanceSquared(out = new Vec3(), a) {
    return (out[0] - a[0]) ** 2 + (out[1] - a[1]) ** 2 + (out[2] - a[2]) ** 2;
  }
  
  static len(out = new Vec3()) {
    return Math.sqrt(out[0] * out[0] + out[1] * out[1] + out[2] * out[2]);
  }
  
  static lenSquared(out = new Vec3()) {
    return out[0] * out[0] + out[1] * out[1] + out[2] * out[2];
  }
  
  static setLen(out = new Vec3(), len) {
    Vec3.normalize(out);
    Vec3.scale(out, len);
    return out;
  }
  
  static negate(out = new Vec3()) {
    out[0] = -out[0]; out[1] = -out[1]; out[2] = -out[2];
    return out;
  }

  static inverse(out = new Vec3()) {
    out[0] = 1 / out[0]; out[1] = 1 / out[1]; out[2] = 1 / out[2];
    return out;
  }
  
  static normalize(out = new Vec3()) {
    const len = Math.sqrt(out[0]**2 + out[1]**2 + out[2]**2);
    if(!len) return out;
    
    out[0] *= 1 / len; out[1] *= 1 / len; out[1] *= 1 / len;
    return out;
  }
  
  static dot(out = new Vec3(), a) {
    return out[0] * a[0] + out[1] * a[1] + out[2] * a[2];
  }
  
  static cross(out = new Vec3(), a, b) {
    out[0] = a[1] * b[2] - a[2] * b[1];
    out[1] = a[2] * b[0] - a[0] * b[2];
    out[2] = a[0] * b[1] - a[1] * b[0];
    return out;
  }
  
  static lerp(out = new Vec3(), a, t = 0) {
    out[0] = out[0] + t * (a[0] - out[0]);
    out[1] = out[1] + t * (a[1] - out[1]);
    out[2] = out[2] + t * (a[2] - out[2]);
    return out;
  }
  
  static lerpVec(out = new Vec3(), a, b, t = 0) {
    out[0] = a[0] + t * (b[0] - a[0]);
    out[1] = a[1] + t * (b[1] - a[1]);
    out[2] = a[2] + t * (b[2] - a[2]);
    return out;
  }
  
  static polar(out = new Vec3(), lon, lat) {
    const phi = (90 - lat) * DEGTORAD,
          theta = lon * DEGTORAD,
          sp = Math.sin(phi);
    
    out[0] = -sp * Math.sin(theta);
    out[1] = Math.cos(phi);
    out[2] = sp * Math.cos(theta);
    return out;
  }
  
  static hermite(out = new Vec3(), a, b, c, t) {
    const ft = t * t,
          f1 = ft * (2 * t - 3) + 1, f2 = ft * (t - 2) + t,
          f3 = ft * (t - 1), f4 = ft * (3 - 2 * t);

    out[0] = out[0] * f1 + a[0] * f2 + b[0] * f3 + c[0] * f4;
    out[1] = out[1] * f1 + a[1] * f2 + b[1] * f3 + c[1] * f4;
    out[2] = out[2] * f1 + a[2] * f2 + b[2] * f3 + c[2] * f4;
    return out;
  }
  
  static hermiteVec(out = new Vec3(), a, b, c, d, t) {
    const ft = t * t,
          f1 = ft * (2 * t - 3) + 1, f2 = ft * (t - 2) + t,
          f3 = ft * (t - 1), f4 = ft * (3 - 2 * t);

    out[0] = a[0] * f1 + b[0] * f2 + c[0] * f3 + d[0] * f4;
    out[1] = a[1] * f1 + b[1] * f2 + c[1] * f3 + d[1] * f4;
    out[2] = a[2] * f1 + b[2] * f2 + c[2] * f3 + d[2] * f4;
    return out;
  }
  
  static bezier(out = new Vec3(), a, b, c, t) {
    const inf = 1 - t, inft = inf * inf, ft = t * t,
          f1 = inft * inf, f2 = 3 * t * inft,
          f3 = 3 * ft * inf, f4 = ft * t;

    out[0] = out[0] * f1 + a[0] * f2 + b[0] * f3 + c[0] * f4;
    out[1] = out[1] * f1 + a[1] * f2 + b[1] * f3 + c[1] * f4;
    out[2] = out[2] * f1 + a[2] * f2 + b[2] * f3 + c[2] * f4;
    return out;
  }
  
  static bezierVec(out = new Vec3(), a, b, c, d, t) {
    const inf = 1 - t, inft = inf * inf, ft = t * t,
          f1 = inft * inf, f2 = 3 * t * inft,
          f3 = 3 * ft * inf, f4 = ft * t;

    out[0] = a[0] * f1 + b[0] * f2 + c[0] * f3 + d[0] * f4;
    out[1] = a[1] * f1 + b[1] * f2 + c[1] * f3 + d[1] * f4;
    out[2] = a[2] * f1 + b[2] * f2 + c[2] * f3 + d[2] * f4;
    return out;
  }
  
  static random(out = new Vec3(), scale = 1) {
    const r = Math.random() * 2 * Math.PI,
          z = Math.random() * 2 - 1,
          zScale = Math.sqrt(1 - z * z) * scale;

    out[0] = Math.cos(r) * zScale; out[1] = Math.sin(r) * zScale; out[2] = z * scale;
    return out;
  }
  
  static transformMat3(out = new Vec3(), m) {
    const x = out[0], y = out[1], z = out[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
  }
  
  static transformMat4(out = new Vec3(), m) {
    const x = out[0], y = out[1], z = out[2],
          w = m[3] * x + m[7] * y + m[11] * z + m[15] || 1;
    
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
    return out;
  }
  
  static transformQuat(out = new Vec3(), q) {
    const x = out[0], y = out[1], z = out[2],
          qx = q[0], qy = q[1], qz = q[2],
          w2 = q[3] * 2,
          
          uvx = (qy * z - qz * y) * w2,
          uvy = (qz * x - qx * z) * w2,
          uvz = (qx * y - qy * x) * w2;
    
    out[0] = x + uvx + ((qy * uvz - qz * uvy) * 2);
    out[1] = y + uvy + ((qz * uvx - qx * uvz) * 2);
    out[2] = z + uvz + ((qx * uvy - qy * uvx) * 2);
    return out;
  }
  
  static rotateX(out = new Vec3(), a) {
    const cos = Math.cos(a),
          sin = Math.sin(a);
    
    out[1] = out[1] * cos - out[2] * sin;
    out[2] = out[1] * sin + out[2] * cos;
    return out;
  }
  
  static rotateXVec(out = new Vec3(), a, b) {
    const cos = Math.cos(b),
          sin = Math.sin(b),
          ry = out[1] - a[1], rz = out[2] - a[2];
    
    out[1] = ry * cos - rz * sin;
    out[2] = ry * sin + rz * cos;
    return out;
  }
  
  static rotateXVecToVec(out = new Vec3(), a, b, c) {
    const cos = Math.cos(c),
          sin = Math.sin(c),
          ry = a[1] - b[1], rz = a[2] - b[2];
    
    out[1] = ry * cos - rz * sin;
    out[2] = ry * sin + rz * cos;
    return out;
  }
  
  static rotateY(out = new Vec3(), a) {
    const cos = Math.cos(a),
          sin = Math.sin(a);
    
    out[0] = out[2] * sin + out[0] * cos;
    out[2] = out[2] * cos - out[0] * sin;
    return out;
  }
  
  static rotateYVec(out = new Vec3(), a, b) {
    const cos = Math.cos(b),
          sin = Math.sin(b),
          rx = out[0] - a[0], rz = out[2] - a[2];
    
    out[1] = rz * sin + rx * cos;
    out[2] = rz * cos - rx * sin;
    return out;
  }
  
  static rotateYVecToVec(out = new Vec3(), a, b, c) {
    const cos = Math.cos(c),
          sin = Math.sin(c),
          rx = a[0] - b[0], rz = a[2] - b[2];
    
    out[1] = rz * sin + rx * cos;
    out[2] = rz * cos - rx * sin;
    return out;
  }
  
  static rotateZ(out = new Vec3(), a) {
    const cos = Math.cos(a),
          sin = Math.sin(a);
    
    out[0] = out[0] * cos - out[1] * sin;
    out[1] = out[0] * sin + out[1] * cos;
    return out;
  }
  
  static rotateZVec(out = new Vec3(), a, b) {
    const cos = Math.cos(b),
          sin = Math.sin(b),
          rx = out[0] - a[0], ry = out[1] - a[1];
    
    out[1] = rx * cos - ry * sin;
    out[2] = rx * sin + ry * cos;
    return out;
  }
  
  static rotateZVecToVec(out = new Vec3(), a, b, c) {
    const cos = Math.cos(c),
          sin = Math.sin(c),
          rx = a[0] - b[0], ry = a[1] - b[1];
    
    out[1] = rx * cos - ry * sin;
    out[2] = rx * sin + ry * cos;
    return out;
  }
  
  static rotateAxisAngle(out = new Vec3(), a, b) {
    const cos = Math.cos(b),
          sin = Math.sin(b),
          cp = Vec3.cross(a, out),
          dot = Vec3.dot(a, out),
          ci = 1 - cos;
    
    out[0] = out[0] * cos + cp[0] * sin + a[0] * dot * ci;
    out[1] = out[1] * cos + cp[1] * sin + a[1] * dot * ci;
    out[2] = out[2] * cos + cp[2] * sin + a[2] * dot * ci;
    return out;
  }
  
  static rotateAxisAngleVec(out = new Vec3(), a, b, c) {
    const cos = Math.cos(c),
          sin = Math.sin(c),
          cp = Vec3.cross(b, a),
          dot = Vec3.dot(b, a),
          ci = 1 - cos;
    
    out[0] = a[0] * cos + cp[0] * sin + b[0] * dot * ci;
    out[1] = a[1] * cos + cp[1] * sin + b[1] * dot * ci;
    out[2] = a[2] * cos + cp[2] * sin + b[2] * dot * ci;
    return out;
  }
  
  static angle(out = new Vec3(), a) {
    return Math.atan2(Vec3.cross(out, a), Vec3.dot(out, a));
  }
  
  static rgbToVec(rgb) {
    return new Vec3(rgb[0] / 255, rgb[1] / 255, rgb[2] / 255);
  }
}

Vec3.UP = new Vec3(0, 1, 0);
Vec3.DOWN = new Vec3(0, -1, 0);
Vec3.LEFT = new Vec3(1, 0, 0);
Vec3.RIGHT = new Vec3(-1, 0, 0);
Vec3.FORWARD = new Vec3(0, 0, 1);
Vec3.BACK = new Vec3(0, 0, -1);
Vec3.ZERO = new Vec3(0, 0, 0);

module.exports = Vec3;
