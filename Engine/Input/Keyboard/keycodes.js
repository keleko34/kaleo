export default class Keycodes {
  constructor() {
    var x =0,
        i = 0;
    
    /* Mouse Key Codes */
    this[0] = 'leftmouse';
    this[1] = 'middlemouse';
    this[2] = 'rightmouse';
    
    /* Insert Char Codes a-z */
    for(x=65;x<91;x++) {
      if(this[x] === undefined) {
        this[x] = String.fromCharCode(x).toLowerCase();
      }
    }

    /* Insert Digits 0-9 */
    for(x=48;x<58;x++) {
      if(this[x] === undefined) {
        this[x] = String.fromCharCode(x);
      }
    }

    /* Insert NumPad 0-9 */
    for(x=96;x<106;x++) {
      if(this[x] === undefined) {
        this[x] ='numpad'+i;
        i++;
      }
    }

    /* Insert F Keys 1-24 */
    i = 1;
    for(x=112;x<136;x++) {
      if(this[x] === undefined) {
        this[x] ='f'+i;
        i++;
      }
    }
    
    /* Arrows */
    this[37] = (this[37] === undefined ? 'left' : this[37]);
    this[38] = (this[38] === undefined ? 'up' : this[38]);
    this[39] = (this[39] === undefined ? 'right' : this[39]);
    this[40] = (this[40] === undefined ? 'down' : this[40]);

    /* Lower Specials */
    this[32] = (this[32] === undefined ? 'spacebar' : this[32]);
    this[91] = (this[91] === undefined ? 'command' : this[91]);
    this[18] = (this[18] === undefined ? 'alt' : this[18]);
    this[17] = (this[17] === undefined ? 'ctrl' : this[17]);
    this[93] = (this[93] === undefined ? 'context' : this[93]);

    /* Side Specials */
    this[16] = (this[16] === undefined ? 'shift' : this[16]);
    this[20] = (this[20] === undefined ? 'caps' : this[20]);
    this[13] = (this[13] === undefined ? 'enter' : this[13]);
    this[9] = (this[93] === undefined ? 'tab' : this[9]);
    this[220] = (this[93] === undefined ? '\\' : this[220]);

    /* Top Specials */
    this[8] = (this[8] === undefined ? 'backspace' : this[8]);
    this[61] = (this[61] === undefined ? '=' : this[61]);
    this[109] = (this[109] === undefined ? '-' : this[109]);
    this[176] = (this[176] === undefined ? '`' : this[176]);

    /* Mid Specials */
    this[221] = (this[221] === undefined ? ']' : this[221]);
    this[219] = (this[219] === undefined ? '[' : this[219]);
    this[222] = (this[222] === undefined ? "'" : this[222]);
    this[186] = (this[186] === undefined ? ';' : this[186]);
    this[191] = (this[191] === undefined ? '/' : this[191]);
    this[190] = (this[190] === undefined ? '.' : this[190]);
    this[188] = (this[188] === undefined ? ',' : this[188]);

    /* F Key Specials */
    this[27] = (this[27] === undefined ? 'esc' : this[27]);
    this[44] = (this[44] === undefined ? 'printscreen' : this[44]);
    this[145] = (this[145] === undefined ? 'scrolllock' : this[145]);
    this[19] = (this[19] === undefined ? 'pause' : this[19]);

    /* Page Keys */
    this[45] = (this[45] === undefined ? 'insert' : this[45]);
    this[46] = (this[46] === undefined ? 'delete' : this[46]);
    this[36] = (this[36] === undefined ? 'home' : this[36]);
    this[35] = (this[35] === undefined ? 'end' : this[35]);
    this[33] = (this[33] === undefined ? 'pageup' : this[33]);
    this[34] = (this[34] === undefined ? 'pagedown' : this[34]);

    /* Num Pad Specials */
    this[144] = (this[144] === undefined ? 'numlock' : this[144]);
    this[111] = (this[111] === undefined ? 'divide' : this[111]);
    this[106] = (this[106] === undefined ? 'multiply' : this[106]);
    this[109] = (this[109] === undefined ? 'subtract' : this[109]);
    this[107] = (this[107] === undefined ? 'add' : this[107]);
  }
  
  setKeyCode(code, str)
  {
    if(((typeof code === 'number') && (typeof str === 'string')) && code < 255 && code > -1) {
      this.codes[code] = str;
    }
  }
}
