class GLElementBuffer extends Uint16Array {
  constructor(data, isStatic = true, unbind = true, start, len) {
    super(data);
    this.id = gl.createBuffer();
    this.type = isStatic ? gl.STATIC_DRAW : gl.DYNAMIC_DRAW;
    
    const ELARRBUF = gl.ELEMENT_ARRAY_BUFFER;
    
    gl.bindBuffer(ELARRBUF, this.id);
    gl.bufferData(ELARRBUF, this, this.type, start, len);
    
    if(unbind) gl.bindBuffer(ELARRBUF, null);
  }
  
  bind(id) {
    this.id = id;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, id);
  }
  
  unbind() {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  }
  
  static setAttributes(loc, len, type, strid=0, offset=0) {
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, len, type, false, strid, offset);
  }
  
  static bind(id) { 
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, id);
  }
  
  static unbind() {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  }
}

module.exports = GLElementBuffer;
