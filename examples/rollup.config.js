import serve from "..";

export default {
  input: "index.js",
  output: {
    file: "dest.js",
    format: "cjs",
  },
  plugins: [
    serve({
      open: true,
      openPage: "/index.html",
      contentBase: ["."],
    }),
  ],
};
