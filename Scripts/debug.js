const concurrent = require('concurrently');

concurrent([
  {
    command: 'npm run vue-serve',
    name: 'vue-serve',
    prefixColor: 'green'
  },
  {
    command: 'npm run nw-debug',
    name: 'nw-serve',
    prefixColor: 'blue'
  }
],
{
  prefix: 'name',
  killOthers: ['failure', 'success']
})
