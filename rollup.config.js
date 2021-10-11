import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

const pkg = require('./package.json');

export default {
  input: `src/index.ts`,
  output: [{ dir: 'dist', format: 'es', sourcemap: true }],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash-es')
  external: ['@open-wc/scoped-elements'],
  watch: {
    include: 'src/**',
    clearScreen: false,
  },
  plugins: [
    replace({
      'window.customElements.define': '',
      delimiters: ['', ''],
    }),
    typescript({
      target: 'es6',
    }),
    resolve({
      browser: true,
    }),
  ],
};
