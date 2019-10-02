/* 4D VECTOR, MOST USED FOR COLOR, TODO COME BACK TO LATER */

class Vec4 extends Float32Array {
  constructor(arg1, arg2, arg3, arg4) {
    super(4);
    switch(arguments.length)
    {
      /* If a Vec4 or an array was passed we set the local x, y, z and w with these */
      case 1:
        if(arg1.length) { this[0] = arg1[0]; this[1] = arg1[1]; this[2] = arg1[2]; this[3] = arg1[3]; }
        break;
      /* if x, y, z and w were passed seperately we set them seperately */
      case 4:
        this[0] = arg1; this[1] = arg2; this[2] = arg3; this[3] = arg4;
        break;
      /* if nothing was passed we zero out */
      default:
        this[0] = this[1] = this[2] = this[3] = 0;
    }
  }
  
  /* Extra x, y, z and w properties tied to x, y, z and w indexes */
  get x() { return this[0]; } set x(v) { this[0] = v; }
  get y() { return this[1]; } set y(v) { this[1] = v; }
  get z() { return this[2]; } set z(v) { this[2] = v; }
  get w() { return this[3]; } set w(v) { this[3] = v; }
  
  /**
  * Creates a new vec4 initialized with values from the existing vec4
  *
  * @returns {Vec4} a new 3D vector
  */
  clone() {
    return new Vec4(this);
  }
  
  /**
  * Set the vec4 to zero
  *
  * @returns {Vec34}
  */
  zero() {
    this[0] = this[1] = this[2] = this[3] = 0;
  }
  
  /**
  * Calculates a Vec4 from a 4x4 matrix
  *
  * @param {Mat4} a the source matrix
  * @returns {Vec4}
  */
  transformMat4(a) {
    return Vec4.transformMat4(this, a);
  }
  
  /**
  * Calculates a Vec4 from a 4x4 matrix and a Vec3
  *
  * @param {Mat4} a the source matrix
  * @param {Mat4} b the source vector
  * @returns {Vec4}
  */
  transformMat4FromVec3(a, b) {
    return Vec4.transformMat4AsVec3(this, a);
  }
  
  /**
  * Calculates a normalized Vec4 from a rgba array
  *
  * @param {RGBA ARRAY} a the source array
  * @returns {Vec4}
  */
  rgbaToVec(rgba) {
    return new Vec4(rgba[0] / 255, rgba[1] / 255, rgba[2] / 255, rgba[3]);
  }
  
  /**
  * Returns a string representation of a vector
  *
  * @returns {String} string representation of the vector
  */
  toString() {
    return `Vec4(${this[0]},${this[1]},${this[2]},${this[3]})`;
  }
  
  /* REGION STATICS */
  static clone(out = new Vec4()) {
    return new Vec4(out);
  }
  
  static zero(out = new Vec4()) {
    out[0] = out[1] = out[2] = out[3] = 0;
  }
  
  static transformMat4(out = new Vec4(), a) {
    const x = out[0], y = out[1], z = out[2], w = out[3];
    
    out[0] = a[0] * x + a[4] * y + a[8] * z + a[12] * w;
    out[1] = a[1] * x + a[5] * y + a[9] * z + a[13] * w;
    out[2] = a[2] * x + a[6] * y + a[10] * z + a[14] * w;
    out[3] = a[3] * x + a[7] * y + a[11] * z + a[15] * w;
    return out;
  }
  
  static transformMat4FromVec3(out = new Vec4(), a, b) {
    const x = b[0], y = b[1], z = b[2];
    
    out[0] = a[0] * x + a[4] * y + a[8] * z + a[12];
    out[1] = a[1] * x + a[5] * y + a[9] * z + a[13];
    out[2] = a[2] * x + a[6] * y + a[10] * z + a[14];
    out[3] = a[3] * x + a[7] * y + a[11] * z + a[15];
    return out;
  }
  
  static rgbaToVec(rgba) {
    return new Vec4(rgba[0] / 255, rgba[1] / 255, rgba[2] / 255, rgba[3]);
  }
}

module.exports = Vec4;
