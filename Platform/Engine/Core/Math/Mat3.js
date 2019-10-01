/* 3X3 MATRIX */
const Vec3 = require('./Vec3');

class Mat3 extends Float32Array {
  constructor(arg1) {
    super(9);
    let x = 0;
    const len = this.length;
    
    if(arg1 && arg1.length === 9) { for(x;x<len;x++) { this[x] = arg1[x]; } }
    else{ for(x;x<len;x++) { this[x] = x % 4 === 0 ? 1 : 0; } }
    
  }
  
  /**
  * Creates a new Mat3 initialized with values from the existing mat3
  *
  * @returns {Mat3} a new 3x3 matrix
  */
  clone() {
    return new Mat3(this);
  }
  
  /**
  * Sets the look rotation based on the direction and up axis
  *
  * @param {Vec3} a the direction axis
  * @param {Vec3} b the up axis
  * @returns {Mat3} out
  */
  lookRotation(a, b) {
    return Mat3.lookRotation(this, a, b);
  }
  
  /**
  * Transpose the values of a mat3
  *
  * @param {Mat3} a the source matrix
  * @returns {Mat3} out
  */
  transpose(a) {
    if(a) return Mat3.transpose(this, a);
    
    const a01 = this[1], a02 = this[2], a12 = this[5];
    
    this[1] = this[3];
    this[2] = this[6];
    this[3] = a01;
    this[5] = this[7];
    this[6] = a02;
    this[7] = a12;
  }
  
  /**
  * Inverts a mat3
  *
  * @param {Mat3} a the source matrix
  * @returns {Mat3} out
  */
  invert(a) {
    return Mat3.invert(this, a || this);
  }
  
  /**
  * Calculates a 3x3 normal matrix (transpose inverse) from a 4x4 matrix
  *
  * @param {Mat3} a The eye axis
  * @returns {Mat3} a 4x4 matrix
  */
  transformMat4ToNormal(a) {
    return Mat3.transformMat4ToNormal(this, a);
  }
  
  /**
  * Returns a string representation of a matrix
  *
  * @returns {String} string representation of the matrix
  */
  toString() {
    return `Mat3(${this[0]},${this[1]},${this[2]},${this[3]},${this[4]},${this[5]},${this[6]},${this[7]},${this[8]},${this[9]})`;
  }
  
  /* REGION STATICS */
  
  static clone(out = new Mat3()) {
    return new Mat3(out);
  }
  
  static lookRotation(out = new Mat3(), a, b) {
    const zAxis = new Vec3(a),
          xAxis = new Vec3(),
          yAxis = new Vec3(),
          up = new Vec3(b);
    
    zAxis.normalize();
    Vec3.cross(xAxis, up, zAxis);
    xAxis.normalize();
    Vec3.cross(yAxis, zAxis, xAxis);
    
    out[0] = xAxis.x;
    out[1] = xAxis.y;
    out[2] = xAxis.z;
    
    out[3] = yAxis.x;
    out[4] = yAxis.y;
    out[5] = yAxis.z;
    
    out[6] = zAxis.x;
    out[7] = zAxis.y;
    out[8] = zAxis.z;
    
    return out;
  }
  
  static transpose(out = new Mat3(), a) {
    out[0] = a[0];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a[1];
    out[4] = a[4];
    out[5] = a[7];
    out[6] = a[2];
    out[7] = a[5];
    out[8] = a[8];
    return out;
  }
  
  static invert(out = new Mat3(), a) {
    const a00 = a[0], a01 = a[1], a02 = a[2],
          a10 = a[3], a11 = a[4], a12 = a[5],
          a20 = a[6], a21 = a[7], a22 = a[8],
          
          b01 = a22 * a11 - a12 * a21,
          b11 = -a22 * a10 + a12 * a20,
          b21 = a21 * a10 - a11 * a20;
    
    let det = a00 * b01 + a01 * b11 + a02 * b21;
    
    if(!det) return null;
    
    det = 1 / det;
    
    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
  }
  
  static transformMat4ToNormal(out = new Mat3(), a) {
    const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
          a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
          a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
          a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],
          
          b00 = a00 * a11 - a01 * a10,
          b01 = a00 * a12 - a02 * a10,
          b02 = a00 * a13 - a03 * a10,
          b03 = a01 * a12 - a02 * a11,
          b04 = a01 * a13 - a03 * a11,
          b05 = a02 * a13 - a03 * a12,
          b06 = a20 * a31 - a21 * a30,
          b07 = a20 * a32 - a22 * a30,
          b08 = a20 * a33 - a23 * a30,
          b09 = a21 * a32 - a22 * a31,
          b10 = a21 * a33 - a23 * a31,
          b11 = a22 * a33 - a23 * a32;
    
    let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if(!det) return null;
    
    det = 1 / det;
    
    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    return a;
  }
}

module.exports = Mat3;
