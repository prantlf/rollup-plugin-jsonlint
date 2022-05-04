// @ts-check
import jsonlint, { RollupJsonLintOptions } from '..'

const options: RollupJsonLintOptions = {
  include: 'node_modules/**',
  exclude: ['node_modules/foo/**', 'node_modules/bar/**'],
  preferConst: true,
  indent: '  ',
  compact: true,
  namedExports: true
}

/** @type {import("rollup").RollupOptions} */
const config = {
  input: 'main.js',
  output: {
    file: 'bundle.js',
    format: 'iife'
  },
  plugins: [
    jsonlint(options)
  ]
}

export default config
