const { strictEqual } = require('assert')
const test = require('tehanu')(__filename)
const jsonlint = require('rollup-plugin-jsonlint')

test('exports', () => {
  strictEqual(typeof jsonlint, 'function')
})
