import vue from 'rollup-plugin-vue'
import css from 'rollup-plugin-css-only'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

export default {
  input: 'src/index.js',
  output: {
    format: 'iife',
    file: 'dist/bundle.js'
  },
  plugins: [
    nodeResolve({
      extensions: [".js"],
    }),
    css({ output: 'styles.css' }),
    vue({ css: false }),
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'development' ),
      preventAssignment: true
    }),
  ]
}