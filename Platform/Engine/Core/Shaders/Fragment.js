const fs = require('fs');
const def = [
  '#version 330',
  '',
  'out vec4 fragColor;',
  '',
  'void main()',
  '{',
  '   fragColor = vec4(0.0, 0.0, 0.0, 1.0);',
  '}'
].join('\r\n');

class Fragment {
  constructor(name = 'untitled_fragment', src, isPath) {
    
    this.name = name;
    this.type = gl.FRAGMENT_SHADER;
    this.file = isPath ? src.replace(/\\/g, '/') + '/Fragment.glsl' : null;
    this.src = isPath ? def : src;
    
    this.compiled = null;
  }
  
  fetch() {
    return new Promise((resolve, reject) => {
      if(!this.file) return resolve();
      fs.readFile(this.file, 'utf8', (err, contents) => {
        if(err) return reject(err);
        this.src = contents;
        resolve(contents);
      })
    });
  }
  
  compileShader() {
    const shader = gl.createShader(this.type);
    
    gl.shaderSource(shader, this.src);
    gl.compileShader(shader);
    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    {
      gl.deleteShader(shader);
      console.error(gl.getShaderInfoLog(shader));
      return null;
    }
    this.compiled = shader;
    return shader;
  }
  
  static fetch(path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path + '/Fragment.glsl', 'utf8', (err, contents) => {
        if(err) return reject(err);
        resolve(contents);
      })
    })
  }
  
  static fetchShaderSync(path) {
    return fs.readFileSync(path + '/Fragment.glsl', 'utf8');
  }
  
  static compileShader(src) {
    const shader = gl.createShader(gl.FRAGMENT_SHADER);
    
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { gl.deleteShader(shader); return null; }
    return shader;
  }
}

module.exports = Fragment;
