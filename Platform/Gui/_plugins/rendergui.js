const __updates = [];
const __delays = [];

function loop()
{
  var x = 0,
      len = __updates.length;
  for(x;x<len;x++)
  {
    __updates[x].call(this)
  }
}

function loopDelay()
{
  var x = 0,
      len = __delays.length,
      item;
  for(x;x<len;x++)
  {
    item = __delays[x];
    item.curr += 1;
    if(item.curr === item.sync)
    {
      item.curr = 0;
      item.func.call(this);
    }
  }
}

export default {
  install(vue) {
    vue.prototype.$update = function(func) { __updates.push(func); }
    
    vue.prototype.$delay = function(func, sync) { __delays.push({
      func,
      sync: (sync || 1),
      curr: 0
    }); }
    
  },
  created() {
    nw.global.guiUpdate = loop.bind(this);
    nw.global.guiDelay = loopDelay.bind(this);
  }
}
