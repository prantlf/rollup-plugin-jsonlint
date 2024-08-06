import tehanu from 'tehanu'
import { deepStrictEqual, rejects, strictEqual } from 'node:assert'
import { readFileSync }  from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import { rollup }  from 'rollup'
import resolve  from 'rollup-plugin-node-resolve'
import testBundle  from './util/test-bundle.js'
import jsonlint from '../lib/index.js'

const test = tehanu(import.meta.url)
const read = file => readFileSync(file, 'utf-8')

const __dirname = dirname(fileURLToPath(import.meta.url))
process.chdir(__dirname)

test('converts json', async () => {
  const bundle = await rollup({
    input: 'fixtures/basic/main.js',
    plugins: [jsonlint()]
  })
  return testBundle(bundle)
})

test('converts cjson', async () => {
  const bundle = await rollup({
    input: 'fixtures/cjson/main.js',
    plugins: [jsonlint({ mode: 'cjson' })]
  })
  return testBundle(bundle)
})

test('converts json5', async () => {
  const bundle = await rollup({
    input: 'fixtures/json5/main.js',
    plugins: [jsonlint({ mode: 'json5' })]
  })
  return testBundle(bundle)
})

test('handles arrays', async () => {
  const bundle = await rollup({
    input: 'fixtures/array/main.js',
    plugins: [jsonlint()]
  })
  return testBundle(bundle)
})

test('handles literals', async () => {
  const bundle = await rollup({
    input: 'fixtures/literal/main.js',
    plugins: [jsonlint()]
  })
  return testBundle(bundle)
})

test('generates named exports', async () => {
  const bundle = await rollup({
    input: 'fixtures/named/main.js',
    plugins: [jsonlint()]
  })

  const { code, result } = await testBundle(bundle, { exports: {} })

  strictEqual(result?.version, '1.33.7')
  strictEqual(code.indexOf('this-should-be-excluded'), -1, 'should exclude unused properties')
})

test('resolves extensionless imports in conjunction with the node-resolve plugin', async () => {
  const bundle = await rollup({
    input: 'fixtures/extensionless/main.js',
    plugins: [resolve({ extensions: ['.js', '.json'] }), jsonlint()]
  })
  return testBundle(bundle)
})

test('handles JSON objects with no valid keys (#19)', async () => {
  const bundle = await rollup({
    input: 'fixtures/no-valid-keys/main.js',
    plugins: [jsonlint()]
  })
  return testBundle(bundle)
})

test('handles garbage', async () => {
  const bundle = () =>
    rollup({
      input: 'fixtures/garbage/main.js',
      plugins: [jsonlint()]
    })

  await rejects(bundle, 'Unexpected token o')
})

test('does not generate an AST', () => {
  strictEqual(jsonlint().transform(read('fixtures/form/input.json'), 'input.json').ast, undefined)
})

test('does not generate source maps', () => {
  deepStrictEqual(jsonlint().transform(read('fixtures/form/input.json'), 'input.json').map, {
    mappings: ''
  })
})

test('generates properly formatted code', () => {
  const { code } = jsonlint().transform(read('fixtures/form/input.json'), 'input.json')
  strictEqual(code, read('snapshots/default.js'))
})

test('generates correct code with preferConst', () => {
  const { code } = jsonlint({ preferConst: true }).transform(
    read('fixtures/form/input.json'),
    'input.json'
  )
  strictEqual(code, read('snapshots/prefer-const.js'))
})

test('uses custom indent string', () => {
  const { code } = jsonlint({ indent: '  ' }).transform(read('fixtures/form/input.json'), 'input.json')
  strictEqual(code, read('snapshots/indent.js'))
})

test('generates correct code with compact=true', () => {
  const { code } = jsonlint({ compact: true }).transform(
    read('fixtures/form/input.json'),
    'input.json'
  )
  strictEqual(code, read('snapshots/compact.js'))
})

test('generates correct code with namedExports=false', () => {
  const { code } = jsonlint({ namedExports: false }).transform(
    read('fixtures/form/input.json'),
    'input.json'
  )
  strictEqual(code, read('snapshots/named-exports.js'))
})

test('correctly formats arrays with compact=true', () => {
  deepStrictEqual(
    jsonlint({ compact: true }).transform(
      `[
  1,
  {
    "x": 1
  }
]`,
      'input.json'
    ).code,
    'export default[1,{x:1}];'
  )
})

test('handles empty keys', () => {
  deepStrictEqual(
    jsonlint().transform('{"":"a", "b": "c"}', 'input.json').code,
    'export var b = "c";\nexport default {\n\t"": "a",\n\tb: b\n};\n'
  )
})

test('converts json with duplicate object keys by default', async () => {
  const bundle = await rollup({
    input: 'fixtures/duplicates/main.js',
    plugins: [jsonlint()]
  })
  return testBundle(bundle)
})

test('rejects duplicate object keys if requested', async () => {
  const bundle = () =>
    rollup({
      input: 'fixtures/duplicates/main.js',
      plugins: [jsonlint({ allowDuplicateObjectKeys: false })]
    })

  await rejects(bundle, 'Duplicate key: "answer"')
})
