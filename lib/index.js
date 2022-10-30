import { createFilter, dataToEsm } from 'rollup-pluginutils'
import { parse } from '@prantlf/jsonlint'

export default function jsonlint ({
  include, exclude, preferConst, compact, namedExports, indent = '\t',
  mode, ignoreBOM, ignoreComments, ignoreTrailingCommas,
  allowSingleQuotedStrings, allowDuplicateObjectKeys
} = {}) {
  const filter = createFilter(include, exclude)  

  return {
    name: 'jsonlint',

    transform (code, id) {
      if (!(id.endsWith('.json') && filter(id))) return null

      // try {
      const data = parse(code, {
        mode, ignoreBOM, ignoreComments, ignoreTrailingCommas,
        allowSingleQuotedStrings, allowDuplicateObjectKeys
      })

      return {
        code: dataToEsm(data, { preferConst, compact, namedExports, indent }),
        map: { mappings: '' }
      }
      // } catch (err) {
      //   /* c8 ignore next 2 */
      //   const message = err.reason ?? err.message
      //   const position = err?.location?.start?.offset ?? 1
      //   this.warn({ message, id, position })
      //   return null
      // }
    }
  }
}
