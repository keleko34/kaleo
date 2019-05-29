class Renderer {
  constructor() {
    this.renderer = document.createElement('canvas');
    this.ctx = this.renderer.getContext('3d');
    this.pipeline = [];
  }
  
  render() {
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
}

module.exports = Renderer;
