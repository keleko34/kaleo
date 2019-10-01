if(!global.settings) global.settings = {};
global.settings.graphics = require('./graphics');
global.settings.engine = require('./engine');
global.settings.input = require('./mouse-keyboard');

module.exports = global.settings;
