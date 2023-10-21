// @ts-check

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import terser from '@rollup/plugin-terser';
import filesize from 'rollup-plugin-filesize';
import replace from '@rollup/plugin-replace';
import { babel } from '@rollup/plugin-babel';

import pkg from './package.json' assert { type: 'json' };

const globals = {
  react: 'React',
  'date-fns': 'dateFns'
};

export default {
  input: 'src/index.ts', // Your library's entry point
  output: [
    {
      file: pkg.browser,
      format: 'umd',
      name: 'DatePicker',
      globals
    },
    {
      file: pkg.main,
      format: 'cjs',
      name: 'DatePicker',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    resolve(),
    typescript({ useTsconfigDeclarationDir: true }),
    babel({
      babelHelpers: 'external',
      exclude: 'node_modules/**',
      presets: ['@babel/preset-react', '@babel/preset-env']
    }),
    commonjs(),
    filesize(),
    terser(),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  external: ['react', 'date-fns', 'date-fns/locale/en-US']
};
