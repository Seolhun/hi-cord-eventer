import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import html from 'rollup-plugin-bundle-html';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import autoprefixer from 'autoprefixer';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const isProduction = process.env.NODE_ENV === 'production';

const externals = Object.keys(pkg.dependencies);

export default (async () => ({
  external: [...externals, 'path', 'fs', 'resolve', 'rollup-pluginutils'],
  input: 'src/index.js',
  dest: 'dist/index.js',
  output: [
    {
      format: 'iife',
      file: pkg.main,
      name: 'bundle',
      sourcemap: isProduction,
    },
    {
      format: 'esm',
      file: pkg.module,
      sourcemap: isProduction,
    },
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    resolve({
      mainFields: ['main', 'module'],
      extensions: ['.js', '.jsx'],
    }),
    commonjs(),
    postcss({
      extract: true,
      modules: true,
      plugins: [autoprefixer],
    }),
    html({
      template: 'static/index.html',
      dest: 'dist',
      filename: 'index.html',
    }),
    isProduction && terser(),
    !isProduction && (
      serve({
        open: true,
        contentBase: ['./dist'],
        openPage: '/index.html',
        host: 'localhost',
        // https: {
        //   key: fs.readFileSync("/path/to/server.key"),
        //   cert: fs.readFileSync("/path/to/server.crt"),
        //   ca: fs.readFileSync("/path/to/ca.pem"),
        // },
        // headers: {
        //   "Access-Control-Allow-Origin": "*",
        //   foo: "bar",
        // },
      }),
      livereload()
    ),
  ],
}))();
