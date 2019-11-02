class Attributes extends Map {
  constructor(m) {
    super();
    
    if(m instanceof Map)
    {
      m.forEach((v, k) => { this.set(k, v); });
    }
    else
    {
      Object.keys(m).forEach((k) => { this.set(k, m[k]); };)
    }
  }

  
}