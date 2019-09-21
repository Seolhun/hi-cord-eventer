import html from "rollup-plugin-bundle-html";
import serve from "rollup-plugin-serve";
import autoprefixer from "autoprefixer";
import babel from "rollup-plugin-babel";
import postcss from "rollup-plugin-postcss";
import resolve from "rollup-plugin-node-resolve";

const isDev = process.env.NODE_ENV === "development";

import pkg from "./package.json";

const externals = Object.keys(pkg.dependencies);

export default {
  external: [...externals, "path", "fs", "resolve", "rollup-pluginutils"],
  input: "src/index.js",
  output: [
    {
      format: "cjs",
      file: pkg.main,
    },
    {
      format: "es",
      file: pkg.module,
    },
  ],
  plugins: [
    resolve({
      mainFields: ["main", "module"],
      extensions: [".js", ".jsx"],
    }),
    babel({
      exclude: /node_modules/,
    }),
    postcss({
      extract: true,
      modules: true,
      plugins: [autoprefixer],
    }),
    html({
      template: "static/index.html",
      dest: "dist",
      filename: "index.html",
      // externals: [
      //   { type: "js", file: "file1.js", pos: "before" },
      //   { type: "js", file: "file2.js", pos: "before" },
      // ],
    }),
    isDev
      ? serve({
          open: true,
          contentBase: ["dist"],
          openPage: "index.html",
          host: "localhost",
          port: 6000,
          // https: {
          //   key: fs.readFileSync("/path/to/server.key"),
          //   cert: fs.readFileSync("/path/to/server.crt"),
          //   ca: fs.readFileSync("/path/to/ca.pem"),
          // },
          // headers: {
          //   "Access-Control-Allow-Origin": "*",
          //   foo: "bar",
          // },
        })
      : null,
  ],
};
