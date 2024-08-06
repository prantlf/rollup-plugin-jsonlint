# rollup-plugin-jsonlint

[![Latest version](https://img.shields.io/npm/v/rollup-plugin-jsonlint)
 ![Dependency status](https://img.shields.io/librariesio/release/npm/rollup-plugin-jsonlint)
](https://www.npmjs.com/package/rollup-plugin-jsonlint)
[![Code coverage](https://codecov.io/gh/prantlf/rollup-plugin-jsonlint/branch/master/graph/badge.svg)](https://codecov.io/gh/prantlf/rollup-plugin-jsonlint)

A [Rollup] plugin which converts `.json` files to ES6 modules. Recognizes standard [JSON], CJSON (JSON with comments) and [JSON5] (further more flexible JSON).

This plugin started as an overwrite of [`@rollup/plugin-json`]. It supports all the original options. It leverages the parser from [`@prantlf/jsonlint`] to provide better error information in case or invalid input and to parse JSON extensions like CJSON and JSON5. If no extension is enabled, the standard `JSON.parse` will be used for the best performance.

## Requirements

This plugin requires [Node.js] [LTS] (currently 18, at least 14.8) and Rollup 1.20 or newer.

## Installation

Using npm:

    npm i -D rollup-plugin-jsonlint

## Usage

Create a `rollup.config.js` [configuration file] and import the plugin:

```js
import jsonlint from 'rollup-plugin-jsonlint'

export default {
  input: 'src/index.js',
  output: {
    dir: 'output',
    format: 'cjs'
  },
  plugins: [jsonlint({ mode: 'cjson' })]
}
```

Then call `rollup` either via the [command-line] or the [programmatically].

With an accompanying file `src/index.js`, the local `package.json` file would now be importable as seen below:

```js
import pkg from './package.json';
console.log(`Running version ${pkg.version}.`);
```

## Input Parsing Options

The following options customize the parser. If no default value is changed, only the standard JSON will be accepted.

### `mode`

Type: `String` (`json`|`cjson`|`json5`)<br>
Default: `json`

A shortcut for setting the three boolean flags below.

* `json` - expects the standard JSON (uses defaults)
* `cjson` - expects CJSON (sets `ignoreComments` to `true`)
* `json5` - expects JSON5 (sets `ignoreComments`, `ignoreTrailingCommas` and `allowSingleQuotedStrings` to `true`)

### `ignoreBOM`

Type: `Boolean`<br>
Default: `false`

If `true`, the leading UTF-8 byte-order mark will be ignored.

### `ignoreComments`

Type: `Boolean`<br>
Default: `false`

If `true`, single-line and multi-line JavaScript-style comments will be ignored as another "whitespace". (CJSON and JSON5 feature)

### `ignoreTrailingCommas`

Type: `Boolean`<br>
Default: `false`

If `true`, trailing commas after the last object entry and array items will be ignored without throwing an error. (JSON5 feature)

### `allowSingleQuotedStrings`

Type: `Boolean`<br>
Default: `false`

If `true`, single quotes will be accepted in addition to double quotes as characters for enclosing string literals within. (JSON5 feature)

### `allowDuplicateObjectKeys`

Type: `Boolean`<br>
Default: `true`

If `false`, duplicate object keys will be reported as an error. Useful for detecting mistakes in configuration files, where duplicate keys usually mean old properties forgotten to be deleted.

## Module Generation Options

The following options customize the ES6 module generator.

### `compact`

Type: `Boolean`<br>
Default: `false`

If `true`, instructs the plugin to ignore `indent` and generate the smallest code.

### `exclude`

Type: `String` | `Array[...String]`<br>
Default: `null`

A [minimatch pattern], or array of patterns, which specifies the files in the build the plugin should *ignore*. By default no files are ignored.

### `include`

Type: `String` | `Array[...String]`<br>
Default: `null`

A [minimatch pattern], or array of patterns, which specifies the files in the build the plugin should operate on. By default all files are targeted.

### `indent`

Type: `String`<br>
Default: `'\t'`

Specifies the indentation for the generated default export.

### `namedExports`

Type: `Boolean`<br>
Default: `true`

If `true`, instructs the plugin to generate a named export for every property of the JSON object.

### `preferConst`

Type: `Boolean`<br>
Default: `false`

If `true`, instructs the plugin to declare properties as variables, using either `var` or `const`. This pertains to tree-shaking.

## License

Copyright (C) 2019-2024 Ferdinand Prantl

Licensed under the [MIT License].

[MIT License]: http://en.wikipedia.org/wiki/MIT_License
[Rollup]: https://rollupjs.org/
[JSON]: https://tools.ietf.org/html/rfc8259
[JSON5]: https://spec.json5.org
[`@prantlf/jsonlint`]: https://github.com/prantlf/jsonlint#readme
[`@rollup/plugin-json`]: https://github.com/rollup/plugins/tree/master/packages/json#rollupplugin-json
[Node.js]: https://nodejs.org/
[LTS]: https://github.com/nodejs/Release
[configuration file]: https://www.rollupjs.org/guide/en/#configuration-files
[command-line]: https://www.rollupjs.org/guide/en/#command-line-reference
[programmatically]: https://www.rollupjs.org/guide/en/#javascript-api
[minimatch pattern]: https://github.com/isaacs/minimatch
