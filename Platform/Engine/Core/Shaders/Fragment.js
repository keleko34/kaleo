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
    this.file = isPath ? src + '/Fragment.shader' : null;
    this.src = isPath ? def : src;
    
    this.compiled = null;
    this.onFetched = () => {};
    
    if(isPath) {
      fs.readFile(this.file, (err, contents) => {
        if(err) return console.error('Failed to fetch', this.file);
        this.src = contents;
        this.onFetched();
      })
    }
  }
  
  onFetched(func) {
    if(this.src !== def) return func();
    this.onFetched = func;
  }
  
  compileShader() {
    const shader = gl.createShader(this.type);
    
    gl.shaderSource(shader, this.src);
    gl.compileShader(shader);
    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { gl.deleteShader(shader); return null; }
    this.compiled = shader;
    return shader;
  }
  
  static fetchShader(path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path + '/Fragment.shader', (err, contents) => {
        if(err) reject(err);
        resolve(contents);
      })
    })
  }
  
  static fetchShaderSync(path) {
    return fs.readFileSync(path + '/Fragment.shader');
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
