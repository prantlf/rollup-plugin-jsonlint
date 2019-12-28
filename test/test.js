const { readFileSync } = require('fs')
const test = require('ava')
const { rollup } = require('rollup')
const resolve = require('rollup-plugin-node-resolve')
const { testBundle } = require('../util/test')
const jsonlint = require('..')

const read = (file) => readFileSync(file, 'utf-8')

require('source-map-support').install()

process.chdir(__dirname)

test('converts json', async (t) => {
  const bundle = await rollup({
    input: 'fixtures/basic/main.js',
    plugins: [jsonlint()]
  })
  t.plan(1)
  return testBundle(t, bundle)
})

test('converts cjson', async (t) => {
  const bundle = await rollup({
    input: 'fixtures/cjson/main.js',
    plugins: [jsonlint({ mode: 'cjson' })]
  })
  t.plan(1)
  return testBundle(t, bundle)
})

test('converts json5', async (t) => {
  const bundle = await rollup({
    input: 'fixtures/json5/main.js',
    plugins: [jsonlint({ mode: 'json5' })]
  })
  t.plan(1)
  return testBundle(t, bundle)
})

test('handles arrays', async (t) => {
  const bundle = await rollup({
    input: 'fixtures/array/main.js',
    plugins: [jsonlint()]
  })
  t.plan(1)
  return testBundle(t, bundle)
})

test('handles literals', async (t) => {
  const bundle = await rollup({
    input: 'fixtures/literal/main.js',
    plugins: [jsonlint()]
  })
  t.plan(1)
  return testBundle(t, bundle)
})

test('generates named exports', async (t) => {
  const bundle = await rollup({
    input: 'fixtures/named/main.js',
    plugins: [jsonlint()]
  })

  const { code, result } = await testBundle(t, bundle, { exports: {} })

  t.is(result.version, '1.33.7')
  t.is(code.indexOf('this-should-be-excluded'), -1, 'should exclude unused properties')
})

test('resolves extensionless imports in conjunction with the node-resolve plugin', async (t) => {
  const bundle = await rollup({
    input: 'fixtures/extensionless/main.js',
    plugins: [resolve({ extensions: ['.js', '.json'] }), jsonlint()]
  })
  t.plan(2)
  return testBundle(t, bundle)
})

test('handles JSON objects with no valid keys (#19)', async (t) => {
  const bundle = await rollup({
    input: 'fixtures/no-valid-keys/main.js',
    plugins: [jsonlint()]
  })
  t.plan(1)
  return testBundle(t, bundle)
})

test('handles garbage', async (t) => {
  const bundle = async () =>
    rollup({
      input: 'fixtures/garbage/main.js',
      plugins: [jsonlint()]
    })

  const error = await t.throwsAsync(bundle)
  t.is(error.message.indexOf('Parse error on line 1'), 0)
  t.true(error.message.indexOf('Unexpected token o') > 0)
})

test('does not generate an AST', async (t) => {
  t.is(jsonlint().transform(read('fixtures/form/input.json'), 'input.json').ast, undefined)
})

test('does not generate source maps', async (t) => {
  t.deepEqual(jsonlint().transform(read('fixtures/form/input.json'), 'input.json').map, {
    mappings: ''
  })
})

test('generates properly formatted code', async (t) => {
  const { code } = jsonlint().transform(read('fixtures/form/input.json'), 'input.json')
  t.snapshot(code)
})

test('generates correct code with preferConst', async (t) => {
  const { code } = jsonlint({ preferConst: true }).transform(
    read('fixtures/form/input.json'),
    'input.json'
  )
  t.snapshot(code)
})

test('uses custom indent string', async (t) => {
  const { code } = jsonlint({ indent: '  ' }).transform(read('fixtures/form/input.json'), 'input.json')
  t.snapshot(code)
})

test('generates correct code with compact=true', async (t) => {
  const { code } = jsonlint({ compact: true }).transform(
    read('fixtures/form/input.json'),
    'input.json'
  )
  t.snapshot(code)
})

test('generates correct code with namedExports=false', async (t) => {
  const { code } = jsonlint({ namedExports: false }).transform(
    read('fixtures/form/input.json'),
    'input.json'
  )
  t.snapshot(code)
})

test('correctly formats arrays with compact=true', async (t) => {
  t.deepEqual(
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

test('handles empty keys', async (t) => {
  t.deepEqual(
    jsonlint().transform('{"":"a", "b": "c"}', 'input.json').code,
    'export var b = "c";\nexport default {\n\t"": "a",\n\tb: b\n};\n'
  )
})

test('converts json with duplicate object keys by default', async (t) => {
  const bundle = await rollup({
    input: 'fixtures/duplicates/main.js',
    plugins: [jsonlint()]
  })
  t.plan(1)
  return testBundle(t, bundle)
})

test('rejects duplicate object keys if requested', async (t) => {
  const bundle = async () =>
    rollup({
      input: 'fixtures/duplicates/main.js',
      plugins: [jsonlint({ allowDuplicateObjectKeys: false })]
    })

  const error = await t.throwsAsync(bundle)
  t.is(error.message.indexOf('Parse error on line 3'), 0)
  t.true(error.message.indexOf('Duplicate key: "answer"') > 0)
})
