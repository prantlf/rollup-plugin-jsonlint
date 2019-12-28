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
  indent: string
	/**
	 * Ignores indent and generates the smallest code.
	 * @default false
	 */
  compact: boolean
	/**
	 * Generates a named export for every property of the JSON object.
	 * @default true
	 */
  namedExports: true
}

/**
 * Converts .json (JSON/CJSON/JSON5) files to ES6 modules.
 */
export default function jsonlint (options?: RollupJsonLintOptions): Plugin
