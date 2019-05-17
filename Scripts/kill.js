var ps = require('ps-node');

ps.lookup({ command: 'node' }, (err, results) => {
  if(err) throw new Error('Could not find a node process');
  results.forEach((command) => {
    if(command.arguments)
    {
      command.arguments.forEach((arg) => {
        if(arg.indexOf('nwjs') !== -1 || arg.indexOf('node.exe') !== -1)
        {
          console.info('Killing:', command.arguments);
          ps.kill(command.pid, {
            signal: 'SIGKILL'
          }, (err) => {
            if(err) return console.error('Failed to kill process:', command.arguments);
          })
        }
      })
    }
  })
})
