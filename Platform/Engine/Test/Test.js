const Shader = require('./../Core/Shaders/Shader');

function init() {
  
  const testShader = new Shader('test', __dirname);
  
  testShader.fetch().then(() => {
    testShader.compileShaders();
    
    console.log('shaders compiled')
    const program = testShader.createShaderProgram().program;

    console.log(program, testShader);

    /* GET UNIFORMS */
    gl.useProgram(program);
    const aPositionLoc = gl.getAttribLocation(program, 'aPosition');
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
    
  })
}

function main() {
  console.log('attempting to draw arrays')
  gl.drawArrays(gl.POINTS, 0, 1);
}

main.init = init;

module.exports = main;
