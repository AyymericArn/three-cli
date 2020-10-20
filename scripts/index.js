const commander = require('commander')
const fs = require('fs')

const program = commander.createCommand()
program.version('0.0.1')

program.createCommand = (name) => {
  const cmd = commander.createCommand(name);
  return cmd
}

program
    .command('create <name>')
    .description('Create a new three.js project')
    .action((name) => {
        console.log('Creating your project: ', name)
        createProjectFolder(name)
    })

function createProjectFolder(name) {
    fs.mkdir(`${name}`, { recursive: false }, (err) => {
      if (err) {
        err.code === 'EEXIST' ? console.log('A folder with this name already exist.') : console.log(err)
      }
    })
}

program.parse()