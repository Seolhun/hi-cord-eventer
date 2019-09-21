import serve from "rollup-plugin-serve";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";

export default {
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
    terser(),
  ],
};
