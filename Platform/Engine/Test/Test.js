const fs = require('fs'),
      Vec3 = require('./../Core/Math/Vec3');

const fragment = fs.readFileSync(`${__dirname}/Fragment.glsl`),
      vertex = fs.readFileSync(`${__dirname}/Vertex.glsl`);

let program = null;

function createShader(src, type)
{
  const shader = gl.createShader(type);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  
  if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
  {
    const info = gl.getShaderInfoLog(shader);
    console.error('Failed to compile shader', info);
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/* doValidate using debug mode */
function createProgram(vShader, fShader, doValidate)
{
  const program = gl.createProgram();
  gl.attachShader(program, vShader);
  gl.attachShader(program, fShader);
  gl.linkProgram(program);

  if(!gl.getProgramParameter(program, gl.LINK_STATUS))
  {
    console.error('Error creating shader program');
    gl.deleteProgram(program);
    return null;
  }

  if(doValidate)
  {
    gl.validateProgram(program);
    if(!gl.getProgramParameter(program, gl.VALIDATE_STATUS))
    {
      console.error("Error validating shader program");
      gl.deleteProgram(program);
      return null;
    }
  }
  
  gl.detachShader(program, vShader);
  gl.detachShader(program, fShader);
  gl.deleteShader(vShader);
  gl.deleteShader(fShader);

  return program;
}

function init() {
  const vShader = createShader(vertex, gl.VERTEX_SHADER),
  fShader = createShader(fragment, gl.FRAGMENT_SHADER),
  program = createProgram(vShader, fShader);

  /* GET UNIFORMS */
  gl.useProgram(program);
  const aPositionLoc = gl.getAttribLocation(program, 'position');
  gl.useProgram(null);

  const vertices = new Float32Array([0, 0, 0]),
        bufferVertices = gl.createBuffer();
  
  /* Bind vertice data */
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferVertices);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  /* Setup for drawing */
  gl.useProgram(program);

  /* Setup Vertex Buffer Attributes */
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferVertices);
  gl.enableVertexAttribArray(aPositionLoc);
  gl.vertexAttribPointer(aPositionLoc, 3, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
}

function main() {
  gl.drawArrays(gl.POINTS, 0, 1);
}

main.init = init;

module.exports = main;
