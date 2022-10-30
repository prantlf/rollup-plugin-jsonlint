import { Plugin } from 'rollup'

export interface RollupJsonLintOptions {
  /**
   * All JSON files will be parsed by default,
   * but you can also specifically include files.
   */
  include?: string | RegExp | ReadonlyArray<string | RegExp> | null

  /**
   * All JSON files will be parsed by default,
   * but you can also specifically exclude files.
   */
  exclude?: string | RegExp | ReadonlyArray<string | RegExp> | null

  /**
   * For tree-shaking, properties will be declared as variables, using
   * either `var` or `const`.
   * @default false
   */
  preferConst?: boolean

  /**
   * Specifies indentation for the generated default export.
   * @default '\t'
   */
  indent?: string

  /**
   * Ignores indent and generates the smallest code.
   * @default false
   */
  compact?: boolean

  /**
   * Generates a named export for every property of the JSON object.
   * @default true
   */
  namedExports?: boolean

  /**
   * If `true`, the leading UTF-8 byte-order mark will be ignored.
   * @default false
   */
  ignoreBOM?: boolean

  /**
   * A shortcut for setting the three boolean flags below.
   * @default undefined
   */
  mode?: 'json' | 'cjson' | 'json5'

  /**
   * If `true`, single-line and multi-line JavaScript-style comments will be ignored as another "whitespace". (CJSON and JSON5 feature)
   * @default false
   */
  ignoreComments?: boolean

  /**
   * If `true`, trailing commas after the last object entry and array items will be ignored without throwing an error. (JSON5 feature)
   * @default false
   */
  ignoreTrailingCommas?: boolean

  /**
   * If `true`, single quotes will be accepted in addition to double quotes as characters for enclosing string literals within. (JSON5 feature)
   * @default false
   */
  allowSingleQuotedStrings?: boolean

  /**
   * If `false`, duplicate object keys will be reported as an error. Useful for detecting mistakes in configuration files, where duplicate keys usually mean old properties forgotten to be deleted.
   * @default false
   */
  allowDuplicateObjectKeys?: boolean
}

/**
 * Converts .json (JSON/CJSON/JSON5) files to ES6 modules.
 */
export default function jsonlint (options?: RollupJsonLintOptions): Plugin
