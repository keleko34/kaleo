const { graphics } = global.settings;
const Camera = require('./../Core/Camera');

class Renderer {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.pipeline = [];
    this.setup();
  }
  
  setup() {
    this.ctx = this.canvas.getContext('webgl2', { antialias: graphics.A_ALIAS });
    
    /* GL SETUP */
    this.setResolution(graphics.R_INDEX);
    this.ctx.cullFace(this.ctx.BACK);
    this.ctx.enable(this.ctx.CULL_FACE);
    this.ctx.depthFunc(this.ctx.LEQUAL);
    this.setBlendMode(graphics.B_MODE);
    
    this.camera = new Camera();
    
    this.camera.setPerspective();
  }
  
  render() {
    this.clear();
    
    const { ctx, pipeline } = this,
          len = pipeline.length;
    
    let x = 0;
    for(x;x<len;x++) { pipeline[x](ctx) }
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
    this.ctx.clear(this.ctx.COLOR_BUFFER_BIT | this.ctx.DEPTH_BUFFER_BIT);
  }
  
  setResolution(size) {
    if(graphics.R_LIST[size])
    {
      const res = graphics.R_LIST[size];
      this.canvas.width = res.w;
      this.canvas.height = res.h;
      this.ctx.viewport(0, 0, res.w, res.h);
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
