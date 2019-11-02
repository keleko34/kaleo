const fs = require('fs');
const def = [
  '#version 330',
  '',
  'layout(location = 0)in vec4 vert;',
  '',
  'uniform mat4 projection',
  'uniform mat4 view',
  'uniform mat4 model',
  '',
  'void main()',
  '{',
  '     gl_position = projection * view * model * vert;',
  '}'
].join('\r\n');

class Vertex {
  constructor(name = 'untitled_vertex', src, isPath) {    
    this.name = name;
    this.type = gl.VERTEX_SHADER;
    this.file = isPath? src.replace(/\\/g, '/') + '/Vertex.glsl' : null;
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
      fs.readFile(path + '/Vertex.glsl', 'utf8', (err, contents) => {
        if(err) reject(err);
        resolve(contents);
      })
    })
  }
  
  static fetchSync(path) {
    return fs.readFileSync(path + '/Vertex.glsl', 'utf8');
  }
  
  static compileShader(src) {
    const shader = gl.createShader(gl.VERTEX_SHADER);
    
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { gl.deleteShader(shader); return null; }
    return shader;
  }
}

module.exports = Vertex;
