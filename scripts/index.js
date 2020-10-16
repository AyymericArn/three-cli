const { program } = require('commander')
program.version('0.0.1')

program.parse(process.argv)

program
    .command('create <name>')
    .description('crete a new three.js project')
    .action((name) => {
        console.log('name :', name);
    });
