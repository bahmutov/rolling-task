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

// filenames should be from the integration root
const root = join(__dirname, '..', 'integration')

function bundleRollup (file) {
  // TODO use inline source maps id:0
  // Gleb Bahmutov
  // gleb.bahmutov@gmail.com
  // https://github.com/bahmutov/rolling-task/issues/1
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
    const outputOptions = {
      format: 'iife'
    }
    return bundle.generate(outputOptions)
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
