import jsonlint from 'rollup-plugin-jsonlint'

declare type testCallback = () => void
declare function test (label: string, callback: testCallback): void

test('Type declarations for TypeScript', () => {
  jsonlint()
  jsonlint({})
  jsonlint({ include: [] })
  jsonlint({ include: [''] })
  jsonlint({ include: '' })
  jsonlint({ include: /a/ })
  jsonlint({ exclude: [] })
  jsonlint({ exclude: [''] })
  jsonlint({ exclude: '' })
  jsonlint({ exclude: /a/ })
  jsonlint({ preferConst: true })
  jsonlint({ indent: '  ' })
  jsonlint({ compact: true })
  jsonlint({ namedExports: true })
  jsonlint({ mode: 'json5' })
  jsonlint({ ignoreBOM: true })
  jsonlint({ ignoreComments: true })
  jsonlint({ ignoreTrailingCommas: true })
  jsonlint({ allowSingleQuotedStrings: true })
  jsonlint({ allowDuplicateObjectKeys: true })
})
