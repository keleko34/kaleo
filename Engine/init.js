function init()
{
  this.renderer = document.createElement('canvas');
  this.ctx = this.renderer.getContext('3d');
  this.renderPipeline = [];
  console.log('hello from backend', nw.global.$listen)
  return this;
}

init.prototype.render = function()
{
  var x = 0,
      ctx = this.ctx,
      pipeline = this.renderPipeline,
      len = pipeline.length;
  
  for(x;x<len;x++)
  {
    pipeline[x](ctx);
  }
}

init.prototype.pipe = function(func)
{
  this.renderPipeline.push(func);
}

init.prototype.unpipe = function(func)
{
  var funcString = func.toString(),
      x = 0,
      pipeline = this.renderPipeline,
      len = pipeline.length;
  
  for(x;x<len;x++)
  {
    if(funcString === pipeline[x].toString())
    {
      pipeline.splice(x, 1);
      break;
    }
  }
}

module.exports = init;
