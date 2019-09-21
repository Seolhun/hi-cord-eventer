import serve from "rollup-plugin-serve";
import babel from "rollup-plugin-babel";

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
  ],
};
