var NWBuilder = require('nw-builder');
var nw = new NWBuilder({
    files: './Build/**/**', // use the glob format
    platforms: ['osx64', 'win32', 'win64'],
    flavor: 'normal',
    cacheDir: './Distribution/cache',
    buildDir: './Distribution',
    forceDownload: true,
    version: '0.38.3',
    zip: true
});

nw.on('log', console.log);
 
nw.build()
.then(function () {
   console.log('Finished building distribution builds');
}).catch(function (error) {
    console.error(error);
});
