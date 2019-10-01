const { DEGREE } = require('./Math/Common');
const Mat4 = require('./Math/Mat4');
const Vec4 = require('./Math/Vec4');
const Vec3 = require('./Math/Vec3');
const Vec2 = require('./Math/Vec2');

class Camera {
  constructor()
  {
    this.vMatrix = new Mat4();
    this.pMatrix = new Mat4();
    this.pMatrixInv = new Mat4();
    this.pvMatrix = new Mat4();
  }
  
  setOrthographic(left, right, bottom, top, near, far) {
    return Mat4.ortho(this.pMatrix, left, right, bottom, top, near, far) && this;
  }
  
  setPerspective(fov=45, near=0.1, far=100) {
    return Camera.setPerspective(this, fov, near, far);
  }
  
  static setOrthographic(camera, left, right, bottom, top, near, far) {
    return Mat4.ortho(camera.pMatrix, left, right, bottom, top, near, far) && camera;
  }
  
  static setPerspective(camera, fov=45, near=0.1, far=100) {
    const { R_WIDTH, R_HEIGHT } = global.settings.graphics;
    const ratio = R_WIDTH * R_HEIGHT;
    
    Mat4.perspective(camera.pMatrix, fov * DEGREE, ratio, near, far);
    Mat4.invertFromMat(camera.pMatrixInv, camera.pMatrix);
    return camera;
  }
  
  static update(node, camera) {
    Mat4.invertFromMat(node.mMatrix, camera.vMatrix);
    Mat4.multiplyMatToMat(camera.pvmatrix, camera.pMatrix, camera.vMatrix);
    return camera;
  }
  
  /* REGION SPACE CONVERSIONS */
  
  static screenToWorld(node, camera, inputX, inputY) {
    const { R_WIDTH, R_HEIGHT } = global.settings.graphics,
          nx = inputX / R_WIDTH * 2 - 1,
          ny = 1 - inputY / R_HEIGHT * 2,
          worldMat = new Mat4(),
          vec4Near = new Vec4(nx, ny, -1, 1);
    
    Mat4.multiplyMatToMat(worldMat, node.mMatrix, camera.pMatrix);
    Vec4.transformMat4(vec4Near, worldMat);
    
    let x = 0;
    for(x;x<3;x++) vec4Near[x] /= vec4Near[3];
    
    return new Vec3(vec4Near)
  }
  
  static worldToScreen(node, camera, pos) {
    const { R_WIDTH, R_HEIGHT } = global.settings.graphics,
          worldMat = new Mat4(),
          p = new Vec4();
    
    Mat4.multiplyMatToMat(worldMat, camera.pMatrix, camera.vMatrix);
    Vec4.transformMat4FromVec3(p, worldMat, pos);
    if(p[3] !== 0) { p[0] = p[0] / p[3]; p[1] = p[1] / p[3]; }
    
    return new Vec2((p[0] + 1) * 0.5 * R_WIDTH, (-p[1] + 1) * 0.5 * R_HEIGHT);
  }
}

module.exports = Camera;
