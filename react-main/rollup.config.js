import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';

export default {
  input: "src/index.js",
  output: {
    file: "dist/bundle.js",
    format: "iife",
    sourcemap: true,
  },
  plugins: [
    // so you can import modules from node_modules in bundle 
    nodeResolve({
      extensions: [".js"],
    }),
    // https://github.com/rollup/rollup/issues/487#issuecomment-486229172
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'development' ),
      preventAssignment: true
    }),
    babel({
      presets: ["@babel/preset-react"],
      babelHelpers: 'bundled',
    }),
    // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
    commonjs(),
  ]
};
