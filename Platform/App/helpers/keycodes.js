class Keycodes {
  constructor() {
    this.codes = [];
    
    var x =0,
        i = 0;
    
    /* Mouse Key Codes */
    this.codes[0] = 'leftmouse';
    this.codes[1] = 'middlemouse';
    this.codes[2] = 'rightmouse';
    
    /* Insert Char Codes a-z */
    for(x=65;x<91;x++) {
      if(this.codes[x] === undefined) {
        this.codes[x] = String.fromCharCode(x).toLowerCase();
      }
    }

    /* Insert Digits 0-9 */
    for(x=48;x<58;x++) {
      if(this.codes[x] === undefined) {
        this.codes[x] = String.fromCharCode(x);
      }
    }

    /* Insert NumPad 0-9 */
    for(x=96;x<106;x++) {
      if(this.codes[x] === undefined) {
        this.codes[x] ='numpad'+i;
        i++;
      }
    }

    /* Insert F codes 1-24 */
    i = 1;
    for(x=112;x<136;x++) {
      if(this.codes[x] === undefined) {
        this.codes[x] ='f'+i;
        i++;
      }
    }
    
    /* Arrows */
    this.codes[37] = (this.codes[37] === undefined ? 'left' : this.codes[37]);
    this.codes[38] = (this.codes[38] === undefined ? 'up' : this.codes[38]);
    this.codes[39] = (this.codes[39] === undefined ? 'right' : this.codes[39]);
    this.codes[40] = (this.codes[40] === undefined ? 'down' : this.codes[40]);

    /* Lower Specials */
    this.codes[32] = (this.codes[32] === undefined ? 'spacebar' : this.codes[32]);
    this.codes[91] = (this.codes[91] === undefined ? 'command' : this.codes[91]);
    this.codes[18] = (this.codes[18] === undefined ? 'alt' : this.codes[18]);
    this.codes[17] = (this.codes[17] === undefined ? 'ctrl' : this.codes[17]);
    this.codes[93] = (this.codes[93] === undefined ? 'context' : this.codes[93]);

    /* Side Specials */
    this.codes[16] = (this.codes[16] === undefined ? 'shift' : this.codes[16]);
    this.codes[20] = (this.codes[20] === undefined ? 'caps' : this.codes[20]);
    this.codes[13] = (this.codes[13] === undefined ? 'enter' : this.codes[13]);
    this.codes[9] = (this.codes[93] === undefined ? 'tab' : this.codes[9]);
    this.codes[220] = (this.codes[93] === undefined ? '\\' : this.codes[220]);

    /* Top Specials */
    this.codes[8] = (this.codes[8] === undefined ? 'backspace' : this.codes[8]);
    this.codes[61] = (this.codes[61] === undefined ? '=' : this.codes[61]);
    this.codes[109] = (this.codes[109] === undefined ? '-' : this.codes[109]);
    this.codes[176] = (this.codes[176] === undefined ? '`' : this.codes[176]);

    /* Mid Specials */
    this.codes[221] = (this.codes[221] === undefined ? ']' : this.codes[221]);
    this.codes[219] = (this.codes[219] === undefined ? '[' : this.codes[219]);
    this.codes[222] = (this.codes[222] === undefined ? "'" : this.codes[222]);
    this.codes[186] = (this.codes[186] === undefined ? ';' : this.codes[186]);
    this.codes[191] = (this.codes[191] === undefined ? '/' : this.codes[191]);
    this.codes[190] = (this.codes[190] === undefined ? '.' : this.codes[190]);
    this.codes[188] = (this.codes[188] === undefined ? ',' : this.codes[188]);

    /* F Key Specials */
    this.codes[27] = (this.codes[27] === undefined ? 'esc' : this.codes[27]);
    this.codes[44] = (this.codes[44] === undefined ? 'printscreen' : this.codes[44]);
    this.codes[145] = (this.codes[145] === undefined ? 'scrolllock' : this.codes[145]);
    this.codes[19] = (this.codes[19] === undefined ? 'pause' : this.codes[19]);

    /* Page codes */
    this.codes[45] = (this.codes[45] === undefined ? 'insert' : this.codes[45]);
    this.codes[46] = (this.codes[46] === undefined ? 'delete' : this.codes[46]);
    this.codes[36] = (this.codes[36] === undefined ? 'home' : this.codes[36]);
    this.codes[35] = (this.codes[35] === undefined ? 'end' : this.codes[35]);
    this.codes[33] = (this.codes[33] === undefined ? 'pageup' : this.codes[33]);
    this.codes[34] = (this.codes[34] === undefined ? 'pagedown' : this.codes[34]);

    /* Num Pad Specials */
    this.codes[144] = (this.codes[144] === undefined ? 'numlock' : this.codes[144]);
    this.codes[111] = (this.codes[111] === undefined ? 'divide' : this.codes[111]);
    this.codes[106] = (this.codes[106] === undefined ? 'multiply' : this.codes[106]);
    this.codes[109] = (this.codes[109] === undefined ? 'subtract' : this.codes[109]);
    this.codes[107] = (this.codes[107] === undefined ? 'add' : this.codes[107]);
  }  
  setKeyCode(code, str)
  {
    if(((typeof code === 'number') && (typeof str === 'string')) && code < 255 && code > -1) {
      this.codes[code] = str;
    }
  }
}

export default new Keycodes();
