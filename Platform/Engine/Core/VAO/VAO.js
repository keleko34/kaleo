class VAO {
  constructor(name = 'untitled') {
    this.name = name;
    this.id = gl.createVertexArray();
    this.elmCount = 0;
    this.instanceCount = 0;
    this.isIndexed = false;
    this.isInstance = false;
    this.buffer = {};
  }
  
  set(elmCount = 0, isInstance = false, insatnceCount = 0) {
    this.elmCount = elmCount;
    this.isInstance = isInstance;
    this.instanceCount = insatnceCount;
    return this;
  }
  
  addBuffer(name, id, loc, len = 3, type = gl.FLOAT, stride = 0, offset = 0, isInstance = false) {
    gl.bindBuffer(gl.ARRAY_BUFFER, id);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, len, type, false, stride, offset);
    
    if(isInstance) gl.vertexAttribDivisor(loc, 1);
    this.buffer[name] = { id };
    return this;
  }
  
  addPartition(loc, len = 3, type = gl.FLOAT, stride = 0, offset = 0, isInstance = false) {
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, len, type, false, stride, offset);
    
    if(isInstance) gl.vertexAttribDivisor(loc, 1);
    return this;
  }
}

VAO.BUF_V_NAME = 'vertices';
VAO.BUF_N_NAME = 'normal';
VAO.BUF_UV_NAME = 'uv';
VAO.BUF_IDX_NAME = 'indices';
VAO.BUF_BI_NAME = 'bones';
VAO.BUF_BW_NAME = 'weight';

module.exports = VAO;
