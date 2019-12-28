const testBundle = async (t, bundle, args = {}) => {
  const { output } = await bundle.generate({ format: 'cjs' })
  const [{ code }] = output
  const module = { exports: {} }
  const params = ['module', 'exports', 'require', 't', ...Object.keys(args)].concat(
    `process.chdir('${process.cwd()}'); let result;\n\n${code}\n\nreturn result;`
  )

  const func = new Function(...params) // eslint-disable-line no-new-func
  let error
  let result

  try {
    result = func(...[module, module.exports, require, t, ...Object.values(args)])
  } catch (e) {
    error = e
  }

  return { code, error, module, result }
}

module.exports = { testBundle }
