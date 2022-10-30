import { createRequire } from 'module'
import { fileURLToPath } from 'url'

const require = createRequire(fileURLToPath(import.meta.url))

export default async function (bundle, args = {}) {
  const { output } = await bundle.generate({ format: 'cjs' })
  const [{ code }] = output
  const module = { exports: {} }
  const params = ['module', 'exports', 'require', ...Object.keys(args)].concat(
    `process.chdir('${process.cwd()}'); let result;\n\n${code}\n\nreturn result;`
  )

  const func = new Function(...params) // eslint-disable-line no-new-func
  let error
  let result

  try {
    result = func(...[module, module.exports, require, ...Object.values(args)])
  } catch (e) {
    error = e
  }

  return { code, error, module, result }
}
