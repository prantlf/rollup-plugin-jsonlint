import buble from 'rollup-plugin-buble'

const pkg = require('./package.json')

const external = Object.keys(pkg.dependencies)

export default {
  input: 'src/index.js',
  output: [
    { file: pkg.main, format: 'cjs', sourcemap: true, exports: 'default' },
    { file: pkg.module, format: 'es', sourcemap: true, exports: 'auto' }
  ],
  plugins: [buble()],
  external
}
