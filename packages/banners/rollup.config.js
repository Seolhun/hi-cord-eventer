import autoprefixer from 'autoprefixer';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const externals = Object.keys(pkg.dependencies);

export default {
  external: [...externals, 'path', 'fs', 'resolve', 'rollup-pluginutils'],
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'es',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'cjs',
      sourcemap: true,
    },
  ],
  plugins: [
    resolve({
      mainFields: ['main', 'module'],
      extensions: ['.js', '.jsx'],
    }),
    commonjs(),
    babel({
      exclude: /node_modules/,
    }),
    postcss({
      extract: true,
      modules: true,
      plugins: [autoprefixer],
    }),
    terser(),
  ],
};
