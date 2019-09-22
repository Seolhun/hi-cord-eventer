import autoprefixer from 'autoprefixer';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const isProduction = process.env.NODE_ENV === 'production';

const externals = Object.keys(pkg.dependencies);

export default (async () => ({
  external: [...externals, 'path', 'fs', 'resolve', 'rollup-pluginutils'],
  input: 'src/index.js',
  output: [
    {
      format: 'cjs',
      file: pkg.main,
      sourcemap: isProduction,
    },
    {
      format: 'es',
      file: pkg.module,
      sourcemap: isProduction,
    },
  ],
  plugins: [
    resolve({
      mainFields: ['main', 'module'],
      extensions: ['.js', '.jsx'],
    }),
    commonjs({
      include: /node_modules/,
    }),
    babel({
      exclude: /node_modules/,
    }),
    postcss({
      extract: true,
      plugins: [autoprefixer],
      modules: true,
    }),
    isProduction && terser(),
  ],
}))();
