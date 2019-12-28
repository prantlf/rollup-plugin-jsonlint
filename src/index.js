import { createFilter, dataToEsm } from 'rollup-pluginutils'
import { parse } from '@prantlf/jsonlint'

export default function json (options = {}) {
  const filter = createFilter(options.include, options.exclude)
  const indent = 'indent' in options ? options.indent : '\t'

  return {
    name: 'jsonlint',
    transform (json, id) {
      if (!(id.endsWith('.json') && filter(id))) {
        return null
      }

      const data = parse(json, {
        mode: options.mode,
        ignoreComments: options.ignoreComments,
        ignoreTrailingCommas: options.ignoreTrailingCommas,
        allowSingleQuotedStrings: options.allowSingleQuotedStrings,
        allowDuplicateObjectKeys: options.allowDuplicateObjectKeys
      })

      return {
        code: dataToEsm(data, {
          preferConst: options.preferConst,
          compact: options.compact,
          namedExports: options.namedExports,
          indent
        }),
        map: { mappings: '' }
      }
    }
  }
}
