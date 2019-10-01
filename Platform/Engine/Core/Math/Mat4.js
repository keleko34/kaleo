/* 4x4 Matrix */
const { EPSILON } = require('./common');
const Vec3 = require('./Vec3');

class Mat4 extends Float32Array {
  constructor(arg1) {
    super(16);
    let x = 0;
    
    if(arg1 && arg1.length === 9) { for(x;x<16;x++) { this[x] = arg1[x]; } }
    else{ for(x;x<16;x++) { this[x] = x % 4 === 0 ? 1 : 0; } }
  }
  
  /**
  * Creates a new Mat4 initialized with values from the existing mat3
  *
  * @returns {Mat4} a new 4x4 matrix
  */
  clone() {
    return new Mat4(this);
  }
  
  /**
  * Copy the values from one Mat4 to this Mat4
  *
  * @param {Mat4} a the source matrix
  * @returns {Mat4}
  */
  copy(a) {
    let x = 0;
    for(x;x<16;x++) this[x] = a[x];
    return this;
  }
  
  /**
  * Multiply two Mat4s
  *
  * @param {Mat4} a primary matrix
  * @param {Mat4} b secondary matrix
  * @returns {Mat4}
  */
  multiplyMatToMat(a, b) {
    return Mat4.multiplyMatToMat(this, a, b);
  }
  
  /**
  * Rotate a 4x4 matrix based on a vector axis
  *
  * @param {Vec3} a The axis vector
  * @param {Number} b The angle of rotation
  * @returns {Mat4} out
  */
  rotateAxisAngle(a, b) {
    return Mat4.rotateAxisAngle(this, a, b);
  }
  
  /**
  * Rotate a 4x4 matrix on the x axis
  *
  * @param {Number} a The angle of rotation
  * @returns {Mat4} out
  */
  rotateX(a) {
    return Mat4.rotateX(this, a);
  }
  
  /**
  * Rotate a 4x4 matrix on the y axis
  *
  * @param {Number} a The angle of rotation
  * @returns {Mat4} out
  */
  rotateY(a) {
    return Mat4.rotateY(this, a);
  }
  
  /**
  * Rotate a 4x4 matrix on the z axis
  *
  * @param {Number} a The angle of rotation
  * @returns {Mat4} out
  */
  rotateZ(a) {
    return Mat4.rotateZ(this, a);
  }
  
  /**
  * Creates a perspective view matrix
  *
  * @param {Number} a The field of view in the y direction
  * @param {Number} b The aspect ratio
  * @param {Number} c The near distance
  * @param {Number} d The far distance
  * @returns {Mat4} a 4x4 matrix
  */
  perspective(a, b, c, d) {
    return Mat4.perspective(this, a, b, c, d);
  }
  
  /**
  * Creates an orthographic view matrix
  *
  * @param {Number} a The left distance
  * @param {Number} b The right distance
  * @param {Number} c The bottom distance
  * @param {Number} d The top distance
  * @param {Number} e The near distance
  * @param {Number} f The far distance
  * @returns {Mat4} a 4x4 matrix
  */
  ortho(a, b, c, d, e, f) {
    return Mat4.ortho(this, a, b, c, d, e, f);
  }
  
  /**
  * Creates an new directional matrix based on the eye axis and the center vec
  *
  * @param {Vec3} a The eye axis
  * @param {Vec3} b The center of the object
  * @param {Number} c The up axis
  * @returns {Mat4} a 4x4 matrix
  */
  lookAt(a, b, c) {
    return Mat4.lookAt(this, a, b, c);
  }
  
  /**
  * Creates an new directional matrix based on the eye axis and the target location
  *
  * @param {Vec3} a The eye axis
  * @param {Vec3} b The target location
  * @param {Number} c The up axis
  * @returns {Mat4} a 4x4 matrix
  */
  targetAt(a, b, c) {
    return Mat4.targetAt(this, a, b, c);
  }
  
  /**
  * Transpose the values of a Mat4
  *
  * @param {Mat4} a the source matrix
  * @returns {Mat4} out
  */
  transpose(a) {
    if(a) return Mat4.transpose(this, a);
    
    const a01 = a[1], a02 = a[2], a03 = a[3], a12 = a[6], a13 = a[7], a23 = a[11];
    this[1] = a[4];
    this[2] = a[8];
    this[3] = a[12];
    this[4] = a01;
    this[6] = a[9];
    this[7] = a[13];
    this[8] = a02;
    this[9] = a12;
    this[11] = a[14];
    this[12] = a03;
    this[13] = a13;
    this[14] = a23;
    
    return this;
  }
  
  /**
  * Inverts the Mat4
  *
  * @param {Mat4} a the source matrix
  * @returns {Mat4} out
  */
  invert() {
    return Mat4.invert(this);
  }
  
  /**
  * Inverts a Mat4
  *
  * @param {Mat4} a the source matrix
  * @returns {Mat4} out
  */
  invertFromMat(a) {
    return Mat4.invertFromMat(this, a);
  }
  
  /**
  * Translate mat4 by the given vector
  *
  * @param {vec3} a vector to translate by
  * @returns {mat4} out
  */
  translate(a) {
    const x = a[0], y = a[1], z = a[2];
    
    this[12] = this[0] * x + this[4] * y + this[8] * z + this[12];
    this[13] = this[1] * x + this[5] * y + this[9] * z + this[13];
    this[14] = this[2] * x + this[6] * y + this[10] * z + this[14];
    this[15] = this[3] * x + this[7] * y + this[11] * z + this[15];
  }
  
  /**
  * Calculates a Mat4 from a quaternion
  *
  * @param {Quat} a the source quaternion
  * @returns {Mat4}
  */
  transformQuat(a) {
    return Mat4.transformQuat(this, a);
  }
  
  /**
  * Gets the translation Vec3 from the Mat4
  *
  * @returns {Vec3}
  */
  getTranslation() {
    return new Vec3(this[12], this[13], this[14]);
  }
  
  /**
  * Gets the scaling Vec3 from the Mat4
  *
  * @returns {Vec3}
  */
  getScaling() {
    return new Vec3([
      this[0] * this[0] + this[1] * this[1] + this[2] * this[2],
      this[4] * this[4] + this[5] * this[5] + this[6] * this[6],
      this[8] * this[8] + this[9] * this[9] + this[10] * this[10]
    ])
  }
  
  /* REGION STATICS */
  static clone(out = new Mat4()) {
    return new Mat4(out);
  }
  
  static copy(out = new Mat4(), a) {
    let x = 0;
    for(x;x<16;x++) this[x] = a[x];
    return this;
  }
  
  static multiplyMatToMat(out = new Mat4(), a, b) {
    const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
          a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
          a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
          a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    
    let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    
    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
  }
  
  static rotateX(out = new Mat4(), a) {
    const sin = Math.sin(a), cos = Math.cos(a),
          a10 = out[4], a11 = out[5], a12 = out[6],
          a13 = out[7], a20 = out[8], a21 = out[9],
          a22 = out[10], a23 = out[11];
    
    out[4] = a10 * cos + a20 * sin;
    out[5] = a11 * cos + a21 * sin;
    out[6] = a12 * cos + a22 * sin;
    out[7] = a13 * cos + a23 * sin;
    out[8] = a20 * cos - a10 * sin;
    out[9] = a21 * cos - a11 * sin;
    out[10] = a22 * cos - a12 * sin;
    out[11] = a23 * cos - a13 * sin;
    
    return out;
  }
  
  static rotateY(out = new Mat4(), a) {
    const sin = Math.sin(a), cos = Math.cos(a),
          a00 = out[0], a01 = out[1], a02 = out[2],
          a03 = out[3], a20 = out[8], a21 = out[9],
          a22 = out[10], a23 = out[11];
    
    out[0] = a00 * cos - a20 * sin;
    out[1] = a01 * cos - a21 * sin;
    out[2] = a02 * cos - a22 * sin;
    out[3] = a03 * cos - a23 * sin;
    out[8] = a00 * sin + a20 * cos;
    out[9] = a01 * sin + a21 * cos;
    out[10] = a02 * sin + a22 * cos;
    out[11] = a03 * sin + a23 * cos;
    return out;
  }
  
  static rotateZ(out = new Mat4(), a) {
    const sin = Math.sin(a), cos = Math.cos(a),
          a00 = out[0], a01 = out[1], a02 = out[2],
          a03 = out[3], a10 = out[4], a11 = out[5],
          a12 = out[6], a13 = out[7];
    
    out[0] = a00 * cos + a10 * sin;
    out[1] = a01 * cos + a11 * sin;
    out[2] = a02 * cos + a12 * sin;
    out[3] = a03 * cos + a13 * sin;
    out[4] = a10 * cos - a00 * sin;
    out[5] = a11 * cos - a01 * sin;
    out[6] = a12 * cos - a02 * sin;
    out[7] = a13 * cos - a03 * sin;
    return out;
  }
  
  static rotateAxisAngle(out = new Mat4(), a, b) {
    const sin = Math.sin(b), cos = Math.cos(b), t = 1 - cos;
    
    let x = a[0], y = a[1], z = a[2],
    len = Math.sqrt(x * x + y * y + z * z)
    
    if(Math.abs(len) < EPSILON) return new Mat4(out);
    
    len = 1 / len;
    x *= len; y *= len; z *= len;
    
    const a00 = out[0], a01 = out[1], a02 = out[2], a03 = out[3],
          a10 = out[4], a11 = out[5], a12 = out[6], a13 = out[7],
          a20 = out[8], a21 = out[9], a22 = out[10], a23 = out[11],
          
          b00 = x * x * t + cos, b01 = y * x * t + z * sin, b02 = z * x * t - y * sin,
          b10 = x * y * t - z * sin, b11 = y * y * t + cos, b12 = z * y * t + x * sin,
          b20 = x * z * t + y * sin, b21 = y * z * t - x * sin, b22 = z * z * t + cos;
    
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;
    
    return out;
  }
  
  static perspective(out = new Mat4(), a, b, c, d) {
    const f = 1 / Math.tan(a, 2),
          nf = 1 / (c - d);
    
    out[0] = f / b;
    out[1] = out[2] = out[3] = out[4] = 0;
    out[5] = f;
    out[6] = out[7] = out[8] = out[9] = 0;
    out[10] = (d + c) * nf;
    out[11] = -1;
    out[12] = out[13] = 0;
    out[14] = (2 * d * c) * nf;
    out[15] = 0;
    
    return out;
  }
  
  static ortho(out = new Mat4(), a, b, c, d, e, f) {
    const lr = 1 / (a - b),
          bt = 1 / (c - d),
          nf = 1 / (e - f);
    
    out[0] = -2 * lr;
    out[1] = out[2] = out[3] = out[4] = 0;
    out[5] = -2 * bt;
    out[6] = out[7] = out[8] = out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (a + b) * lr;
    out[13] = (d + c) * bt;
    out[14] = (f + e) * nf;
    out[15] = 1;
    
    return out;
  }
  
  /* VIEW MATRIX */
  static lookAt(out = new Mat4(), a, b, c) {
    const eyex = a[0], eyey = a[1], eyez = a[2],
          centerx = b[0], centery = b[1], centerz = b[2];
    
    let z0 = eyex - centerx, z1 = eyey - centery, z2 = eyez - centerz;
    
    if(Math.abs(z0) < EPSILON) {
      if(Math.abs(z1) < EPSILON) {
        if(Math.abs(z2) < EPSILON) return new Mat4(out);
      }
    }
    
    let len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    
    z0 *= len;
    z1 *= len;
    z2 *= len;
    
    let x0 = c[1] * z2 - c[2] * z1,
        x1 = c[2] * z0 - c[0] * z2,
        x2 = c[0] * z1 - c[1] * z0;
    
    len = x0 * x0 + x1 * x1 + x2 * x2;
    
    if(!len) { x0 = x1 = x2 = 0; }
    else {
      len = 1 / Math.sqrt(len);
      x0 *= len;
      x1 *= len;
      x2 *= len;
    }
    
    let y0 = z1 * x2 - z2 * x1,
        y1 = z2 * x0 - z0 * x2,
        y2 = z0 * x1 - z1 * x0;
    
    len = y0 * y0 + y1 * y1 + y2 * y2;
    
    if(!len) { y0 = y1 = y2 = 0; }
    else {
      len = 1 / Math.sqrt(len);
      y0 *= len;
      y1 *= len;
      y2 *= len;
    }
    
    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;
    
    return out;
  }
  
  /* WORLD MATRIX */
  static targetAt(out = new Mat4(), a, b, c) {
    let z0 = a[0] - b[0],
        z1 = a[1] - b[1],
        z2 = a[2] - b[2],
        len = z0 * z0 + z1 * z1 + z2 * z2;
    
    if(len) {
      len = 1 / Math.sqrt(len);
      z0 *= len; z1 *= len; z2 *= len;
    }
    
    let x0 = c[1] * z2 - c[2] * z1,
        x1 = c[2] * z0 - c[0] * z2,
        x2 = c[0] * z1 - c[1] * z0;
    
    len = x0 * x0 + x1 * x1 + x2 * x2;
    
    if(len) {
      len = 1 / Math.sqrt(len);
      x0 *= len; x1 *= len; x2 *= len;
    }
    
    out[0] = x0;
    out[1] = x1;
    out[2] = x2;
    out[3] = 0;
    out[4] = z1 * x2 - z2 * x1;
    out[5] = z2 * x0 - z0 * x2;
    out[6] = z0 * x1 - z1 * x0;
    out[7] = 0;
    out[8] = z0;
    out[9] = z1;
    out[10] = z2;
    out[11] = 0;
    out[12] = a[0];
    out[13] = a[1];
    out[14] = a[2];
    out[15] = 1;
    
    return out;
  }
  
  static transpose(out = new Mat4(), a) {
    out[0] = a[0];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a[1];
    out[5] = a[5];
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a[2];
    out[9] = a[6];
    out[10] = a[10];
    out[11] = a[14];
    out[12] = a[3];
    out[13] = a[7];
    out[14] = a[11];
    out[15] = a[15];
    
    return out;
  }
  
  static invert(out = new Mat4()) {
    const a00 = out[0], a01 = out[1], a02 = out[2], a03 = out[3],
          a10 = out[4], a11 = out[5], a12 = out[6], a13 = out[7],
          a20 = out[8], a21 = out[9], a22 = out[10], a23 = out[11],
          a30 = out[12], a31 = out[13], a32 = out[14], a33 = out[15],
          
          b00 = a00 * a11 - a01 * a10, b01 = a00 * a12 - a02 * a10,
          b02 = a00 * a13 - a03 * a10, b03 = a01 * a12 - a02 * a11,
          b04 = a01 * a13 - a03 * a11, b05 = a02 * a13 - a03 * a12,
          b06 = a20 * a31 - a21 * a30, b07 = a20 * a32 - a22 * a30,
          b08 = a20 * a33 - a23 * a30, b09 = a21 * a32 - a22 * a31,
          b10 = a21 * a33 - a23 * a31, b11 = a22 * a33 - a23 * a32;
    
    let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if(!det) return null;
    det = 1 / det;
    
    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
  }
  
  static invertFromMat(out = new Mat4(), a) {
    const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
          a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
          a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
          a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],
          
          b00 = a00 * a11 - a01 * a10, b01 = a00 * a12 - a02 * a10,
          b02 = a00 * a13 - a03 * a10, b03 = a01 * a12 - a02 * a11,
          b04 = a01 * a13 - a03 * a11, b05 = a02 * a13 - a03 * a12,
          b06 = a20 * a31 - a21 * a30, b07 = a20 * a32 - a22 * a30,
          b08 = a20 * a33 - a23 * a30, b09 = a21 * a32 - a22 * a31,
          b10 = a21 * a33 - a23 * a31, b11 = a22 * a33 - a23 * a32;
    
    let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if(!det) return null;
    det = 1 / det;
    
    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
  }
  
  static translate(out = new Mat4(), a) {
    const x = a[0], y = a[1], z = a[2];
    
    out[12] = out[0] * x + out[4] * y + out[8] * z + out[12];
    out[13] = out[1] * x + out[5] * y + out[9] * z + out[13];
    out[14] = out[2] * x + out[6] * y + out[10] * z + out[14];
    out[15] = out[3] * x + out[7] * y + out[11] * z + out[15];
  }
  
  static tranformQuat(out = new Mat4(), a) {
    const x = a[0], y = a[1], z = a[2], w = a[3],
          x2 = x + x, y2 = y + y, z2 = z + z;
    
    out[0] = 1 - (y * y2 + z * z2);
    out[1] = x * y2 + w * z2;
    out[2] = x * z2 - w * y2;
    out[3] = 0;
    out[4] = x * y2 - w * z2;
    out[5] = 1 - (x * x2 + z * z2);
    out[6] = y * z2 + w * x2;
    out[7] = 0;
    out[8] = x * z2 + w * y2;
    out[9] = y * y2 - w * x2;
    out[10] = 1 - (x * x2 + y * y2);
    out[11] = 0;
    return out;
  }
  
  static getTranslation(out = new Mat4()) {
    return new Vec3(out[12], out[13], out[14]);
  }
  
  static getScaling(out = new Mat4()) {
    return new Vec3([
      out[0] * out[0] + out[1] * out[1] + out[2] * out[2],
      out[4] * out[4] + out[5] * out[5] + out[6] * out[6],
      out[8] * out[8] + out[9] * out[9] + out[10] * out[10]
    ])
  }
}

module.exports = Mat4;
