import serve from "rollup-plugin-serve";
import babel from "rollup-plugin-babel";

import pkg from "../package.json";

const externals = Object.keys(pkg.dependencies);

export default {
  external: [...externals],
  input: "index.js",
  output: {
    file: "dist/banner.js",
    format: "cjs",
  },
  plugins: [
    babel(),
    serve({
      open: true,
      openPage: "/index.html",
      contentBase: ["."],
    }),
  ],
};
