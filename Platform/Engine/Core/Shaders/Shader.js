const Vertex = require('./Vertex');
const Fragment = require('./Fragment');
const Vec3 = require('./../Math/Vec3');
const Vec4 = require('./../Math/Vec4');

class Shader {
  constructor(name, src, doValidate = true, tfVar = null, tfInt = false) {
    const isPath = typeof src === 'string';
    
    this.name = name || 'untitled';
    this.path = isPath ? src : null;
    this.program = null;
    this.fetched = false;
    this.compiled = false;
    
    this.textureSlot = 0;
    this.options = { modelMatrix: false, normalMatrix: false };
    this.uniforms = new Map();
    
    this.doValidate = doValidate;
    this.tfVar = tfVar;
    this.tfInt = tfInt;
    
    this.vShader = new Vertex(name, isPath ? src : src[0], isPath);
    this.fShader = new Fragment(name, isPath ? src : src[1], isPath);
    
    /* fetches the shader files */
    let fetched = 0;
    this.vShader.onFetched(() => { fetched += 1; this.fetched = (fetched === 2); });
    this.fShader.onFetched(() => { fetched += 1; this.fetched = (fetched === 2); });
  }
  
  compileShaders() {
    if(this.fetched) {
      this.vShader.compile();
      if(!this.vShader.compiled) return this;
      this.fShader.compile();
      if(!this.fShader.compiled) { gl.deleteShader(this.vShader.compiled); return this; }
      this.compiled = true;
      return this.createShaderProgram();
    }
    return this;
  }
  
  createShaderProgram() {
    if(this.compiled) this.program = Shader.createShaderProgram(this.vShader.compiled, this.fShader.compiled, this.doValidate, this.tfVar, this.tfInt);
    return this;
  }
  
  build() {
    return this.compileShaders().program || null;
  }
  
  dispose() {
    if(gl.getParameter(gl.CURRENT_PROGRAM) === this.program) gl.useProgram(null);
    gl.deleteProgram(this.program);
    return this;
  }
  
  bind() {
    gl.usProgram(this.program);
    return this;
  }
  
  unbind() {
    gl.useProgram(null);
    return this;
  }
  
  resetTextureSlot() {
    this.textureSlot = 0;
    return this;
  }
  
  prepareUniform(uName, uType) {
    const loc = gl.getUniformLocation(this.program, uName);
    if(!loc) { console.error('Uniforms not found for', uName); return this; }
    this.uniforms.set(uName, { loc, type: uType });
    return this;
  }
  
  prepareUniforms(uniforms) {
    const len = uniforms.length;
    let x = 0, loc, item;
    for(x;x<len;x++)
    {
      item = uniforms[x];
      loc = gl.getUniformLocation(this.program, item.name);
      if(!loc) { console.error('Uniforms not found for', item.name); }
      else { this.uniforms.set(item.name, { loc, type: item.type }); }
    }
    return this;
  }
  
  prepareUniformBlock(uboName) {
    const bIdx = gl.getUniformBlockIndex(this.program, uboName);
    if(bIdx > 1000) { console.error('Ubo not found', bIdx, uboName); return this; }
    gl.uniformBlockBinding(this.program, bIdx, this.getUBO(uboName).bindPoint);
  }
  
  prepareUniformBlocks(uboBlocks) {
    const len = uboBlocks.length;
    let x = 0;
    for(x; x < len; x++) this.prepareUniformBlock(uboBlocks[x]);
    return this;
  }
  
  setUniform(uName, uValue) {
    const itm = this.uniforms.get(uName),
          idx = Shader.UNIFORM_TYPES.indexOf(itm.type);
    if(!itm) { console.error('No uniform by the name', uName); return this; }
    
    switch(idx) {
      case 0: gl.uniform1f(itm.loc, uValue); break;
      case 1: gl.uniform1fv(itm.loc, uValue); break;
      case 2: gl.uniform2fv(itm.loc, uValue); break;
      case 3: gl.uniform3fv(itm.loc, Vec3.rgbToVec(uValue)); break;
      case 4: gl.uniform3fv(itm.loc, uValue); break;
      case 5: gl.uniform4fv(itm.loc, Vec4.rgbaToVec(uValue)); break;
      case 6: gl.uniform4fv(itm.loc, uValue); break;
      case 7: gl.uniform1i(itm.loc, uValue); break;
      case 8: gl.uniformMatrix4fv(itm.loc, false, uValue); break;
      case 9: gl.uniformMatrix3fv(itm.loc, false, uValue); break;
      case 10: gl.uniformMatrix2x4fv(itm.loc, false, uValue); break;
      case 11:
        gl.activeTexture(gl.TEXTURE0 + this.textureSlot);
        gl.bindTexture(gl.TEXTURE_2D, uValue);
        gl.uniform1i(itm.loc, this.textureSlot);
        this.textureSlot += 1;
        break;
      case 12:
        gl.activeTexture(gl.TEXTURE0 + this.texSlot);
        gl.bindTexture(gl.TEXTURE_2D_ARRAY, uValue);
        gl.uniform1i(itm.loc, this.textureSlot);
        this.textureSlot += 1;
        break;
      default: console.error('unknown uniform type', itm.type, uName);
    }
    
    return this;
  }
  
  static compile(src, type) {
    const shader = gl.createShader(type);
    
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { gl.deleteShader(shader); return null; }
    return shader;
  }
  
  static compileShaders(vShaderSrc, fShaderSrc, doValidate = true, tfVar = null, tfInt = false) {
    const vShader = Shader.compile(vShaderSrc, gl.VERTEX_SHADER);
    if(!vShader) return null;
    const fShader = Shader.compile(fShaderSrc, gl.FRAGMENT_SHADER);
    if(!fShader) { gl.deleteShader(vShader); return null; }
    return Shader.createProgram(vShader, fShader, doValidate, tfVar, tfInt);
  }
  
  static createShaderProgram(vShader, fShader, doValidate = true, tfVar = null, tfInt = false) {
    const program = gl.createProgram();
    
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    
    if(tfVar != null) gl.transformFeedbackVaryings(program, tfVar, tfInt ? gl.INTERLEAVED_ATTRIBS : gl.SEPARATE_ATTRIBS);
    
    gl.linkProgram(program);
    
    if(!gl.getPrograParameter(program, gl.LINK_STATUS)) { gl.deleteProgram(program); return null; }
    
    if(doValidate) {
      gl.validateProgram(program);
      if(!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) { gl.deleteProgram(program); return null; }
    }
    
    gl.detachShader(program, vShader);
    gl.detachShader(program, fShader);
    gl.deleteShader(vShader);
    gl.deleteShader(fShader);
    
    return program;
  }
  
  /* TODO: Create statics of class methods, add rgbToVec and rgbaToVec on Vec3 and Vec4, add uBlock cache, change loop to of */
  /* TODO: jsperf map for of vs standard for loop */
}

Shader.UNIFORM_TYPES = [
  'float',
  'afloat',
  'vec2',
  'rgb',
  'vec3',
  'rgba',
  'vec4',
  'int',
  'mat4',
  'mat3',
  'mat2x4',
  'sampler2D',
  'sampler2DArray'
]

Shader.POSITION_LOC = 0;
Shader.NORMAL_LOC = 1;
Shader.UV_LOC = 2;
Shader.COL_LOC = 3;
Shader.BONE_IDX_LOC = 8;
Shader.BONE_WEIGHT_LOC = 9;

module.exports = Shader;
