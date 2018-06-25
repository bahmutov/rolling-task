// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const rollup = require('rollup')
const json = require('rollup-plugin-json')
const postcss = require('rollup-plugin-postcss')
const buble = require('rollup-plugin-buble')
const resolve = require('rollup-plugin-node-resolve')
const { join } = require('path')
const fs = require('fs')

// filenames should be from the integration root
const root = join(__dirname, '..', 'integration')

function bundleRollup (file) {
  const inputOptions = {
    input: file,
    plugins: [
      json(),
      postcss(),
      buble({
        jsx: 'h' // for Hyperapp
      }),
      resolve()
    ]
  }

  // create a bundle
  return rollup.rollup(inputOptions).then(bundle => {
    // TODO avoid having to save to a file to get "nice" source inlined maps id:1
    // Gleb Bahmutov
    // gleb.bahmutov@gmail.com
    // https://github.com/bahmutov/rolling-task/issues/6
    // bundle.generate() resolves with code and map and it should be enough
    // to find utility that can patch these two together.
    // For now use output file, read it back and send the source with source map
    // back to the caller
    const outputOptions = {
      format: 'iife',
      sourcemap: 'inline',
      dir: 'dist',
      file: 'out.js'
    }
    return bundle.write(outputOptions).then(() => {
      const outFile = join(outputOptions.dir, outputOptions.file)
      const source = fs.readFileSync(outFile, 'utf8')
      return { code: source }
    })
  })
}

module.exports = (on, config) => {
  on('task', {
    roll (filename) {
      filename = join(root, filename)
      console.log('file to bundle %s', filename)

      return bundleRollup(filename)
    }
  })
}
