// rollup.config.js
import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/showdown.js',
    format: 'commonjs',
    name: 'Showdown',
    indent: true,
  },
  plugins: [typescript()],
  external: ['figlet', 'colorette', 'enquirer'],
}
