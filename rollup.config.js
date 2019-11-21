// Rollup plugins
import babel from "rollup-plugin-babel";
import uglify from "rollup-plugin-uglify";
import license from "rollup-plugin-license";
import pkjson from "./package.json";

const isDev = process.argv.splice(2).indexOf("--pub") < 0;
const plugins = isDev
  ? [
      babel({
        exclude: "node_modules/**"
      })
    ]
  : [
      babel({
        exclude: "node_modules/**"
      }),
      uglify()
    ];

const output = isDev
  ? { file: "build/ep.js" }
  : { file: "build/ep.min.js" };

export default {
  input: "src/index.js",
  output: {
    ...output,
    format: "umd",
    name: "Proton",
    sourcemap: true
  },
  plugins: plugins
};
