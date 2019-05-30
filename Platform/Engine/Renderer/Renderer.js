/* BLEND MODES */
const BLEND_ALPHA = 0,
      BLEND_ADDITIVE = 1,
      BLEND_ALPHA_ADDITIVE = 2,
      BLEND_OVERRIDE = 3;

class Renderer {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.pipeline = [];
    this.antialias = true;
    this.size = 3;
    this.resolutions = [
      { w: 800, h: 600 },
      { w: 1280, h: 720 },
      { w: 1600, h: 900 },
      { w: 1920, h: 1080 },
      { w: 2560, h: 1440 },
      { w: 3840, h: 2160 }
    ]
    
    this.setup();
  }
  
  setup() {
    this.ctx = this.canvas.getContext('webgl2', { antialias: this.antialias });
    
    /* GL SETUP */
    this.setResolution(this.size);
    this.ctx.cullFace(this.ctx.BACK);
    this.ctx.enable(this.ctx.CULL_FACE);
    this.ctx.depthFunc(this.ctx.LEQUAL);
    this.ctx.blendFunc(this.ctx.SRC_ALPHA, this.ctx.ONE_MINUS_SRC_ALPHA);
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
    if(this.resolutions[size])
    {
      const res = this.resolutions[size];
      this.canvas.width = res.w;
      this.canvas.height = res.h;
      this.ctx.viewport(0, 0, res.w, res.h);
    }
  }
  
  setBlendMode(blendMode) {
    switch(blendMode)
    {
      case BLEND_ALPHA:
        this.ctx.blendFunc(this.ctx.SRC_ALPHA, this.ctx.ONE_MINUS_SRC_ALPHA);
        break;
      case BLEND_ADDITIVE:
        this.ctx.blendFunc(this.ctx.ONE, this.ctx.ONE);
        break;
      case BLEND_ALPHA_ADDITIVE:
        this.ctx.blendFunc(this.ctx.SRC_ALPHA, this.ctx.ONE);
        break;
      case BLEND_OVERRIDE:
        this.ctx.blendFunc(this.ctx.ONE, this.ctx.ZERO);
        break;
    }
  }
}

module.exports = Renderer;
