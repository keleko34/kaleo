const { graphics } = global.settings;
const test = require('./../Test/Test');
const Camera = require('./Camera');

class Renderer {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.pipeline = [];
  }
  
  setup(canvas) {
    if(canvas) this.canvas = canvas;
    this.ctx = global.gl = this.canvas.getContext('webgl2', { antialias: graphics.A_ALIAS });
    
    /* GL SETUP */
    this.setResolution(graphics.R_INDEX);
    // gl.cullFace(gl.BACK);
    // gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    this.setBlendMode(graphics.B_MODE);
    
    // this.camera = new Camera();
    
    // this.camera.setPerspective();
    
    /* Test Code */
    test.init();
  }
  
  render() {
    this.clear();
    
    const { ctx, pipeline } = this,
          len = pipeline.length;
    
    let x = 0;
    for(x;x<len;x++) { pipeline[x](ctx); }
    test();
  }
  
  pipe(func) {
    this.pipeline.push(func);
    
    return this;
  }
  
  unpipe(func) {
    const { pipeline } = this,
          funcString = func.toString(),
          len = pipeline.length;
    
    let x = 0;
  
    for(x;x<len;x++)
    {
      if(funcString === pipeline[x].toString())
      {
        pipeline.splice(x, 1);
        break;
      }
    }
    
    return this;
  }
  
  clear() {
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }
  
  setResolution(size) {
    if(graphics.R_LIST[size])
    {
      const res = graphics.R_LIST[size];
      this.canvas.width = res.w;
      this.canvas.height = res.h;
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    }
  }
  
  setBlendMode(blendMode) {
    switch(blendMode)
    {
      case graphics.B_ALPHA:
        this.ctx.blendFunc(this.ctx.SRC_ALPHA, this.ctx.ONE_MINUS_SRC_ALPHA);
        break;
      case graphics.B_ADDITIVE:
        this.ctx.blendFunc(this.ctx.ONE, this.ctx.ONE);
        break;
      case graphics.B_ALPHA_ADDITIVE:
        this.ctx.blendFunc(this.ctx.SRC_ALPHA, this.ctx.ONE);
        break;
      case graphics.B_OVERRIDE:
        this.ctx.blendFunc(this.ctx.ONE, this.ctx.ZERO);
        break;
    }
  }
}

module.exports = Renderer;
