const commander = require('commander')
const fs = require('fs')
const path = require('path')
const program = commander.createCommand()
program.version('0.0.1')

/**
 * Create command
 */
program.createCommand = (name) => {
  const cmd = commander.createCommand(name);
  return cmd
}
program
    .command('create <name>')
    .description('Create a new three.js project')
    .action((name) => {
        console.log('Creating your project: ', name)
        createProjectStructure(name, structure, err => {
          if(err) console.log(err);
          else console.log('Success');
        });
    })
/**
 * Create directories
 */
const structure = {
  bundle: {},
  static: {},
  src: {
    fonts: {},
    models: {},
    shaders: {},
    sounds: {},
    style: {},
    textures: {},
    js: {
      Tools: {},
      World: {},
    },
  }
}

function createProjectStructure (dir, structure, cb=null) {
  cb = (cb => (...a) => setTimeout(() => cb.apply(null, a)))(cb)
  const subdirs = Reflect.ownKeys(structure)
  if(subdirs.length){
    const sub = subdirs[0]
    const pth = path.join(dir, sub)
    const subsub = structure[sub]
    const copy = Object.assign({}, structure)
    delete copy[sub]

    fs.mkdir(pth, {recursive: true},err => {
      if(err) return cb(err)
      createProjectStructure(pth, subsub, err => {
        if(err) return cb(err)
        createProjectStructure(dir, copy, cb)
      })
    })
  }else{
    cb(null)
  }
}

program.parse()