class GLBuffer extends Float32Array {
  constructor(data, isStatic = true, unbind = true, start = 0, len) {
    super(data);
    this.id = gl.createBuffer();
    this.type = isStatic ? gl.STATIC_DRAW : gl.DYNAMIC_DRAW;
    
    const ARRBUF = gl.ARRAY_BUFFER;
    
    gl.bindBuffer(ARRBUF, this.id);
    gl.bufferData(ARRBUF, this, this.type, start, len || data.length);
    
    if(unbind) gl.bindBuffer(ARRBUF, null);
  }
  
  empty(byteCount, isStatic = true, unbind = true) {
    this.id = gl.createBuffer();
    this.type = isStatic ? gl.STATIC_DRAW : gl.DYNAMIC_DRAW;
    
    const ARRBUF = gl.ARRAY_BUFFER;
    
    this.gl.bindBuffer(ARRBUF, this.id);
    this.gl.bufferData(ARRBUF, byteCount, this.type);
    
    if(unbind) gl.bindBuffer(ARRBUF, null);
  }
  
  bind(id) {
    this.id = id;
    gl.bindBuffer(gl.ARRAY_BUFFER, id);
  }
  
  unbind() {
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }
  
  static setAttributes(loc, len, type, strid = 0, offset = 0) {
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, len, type, false, strid, offset);
  }
  
  static bind(id) { 
    gl.bindBuffer(gl.ARRAY_BUFFER, id);
  }
  
  static unbind() {
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }
}

module.exports = GLBuffer;
