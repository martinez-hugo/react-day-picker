// @ts-check
import { babel } from '@rollup/plugin-babel';
import { dts } from 'rollup-plugin-dts';
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json' assert { type: 'json' };

const globals = {
  react: 'React',
  'date-fns': 'dateFns'
};

const input = 'src/index.ts';

/**
 * Rollup configuration to build the main bundles.
 * @type {import('rollup').RollupOptions}
 */
const mainConfig = {
  input,
  output: [
    {
      file: pkg.browser,
      format: 'umd',
      name: 'DatePicker',
      plugins: [terser()],
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
    typescript(),
    babel({
      babelHelpers: 'external',
      exclude: 'node_modules/**',
      presets: ['@babel/preset-react', '@babel/preset-env']
    }),
    commonjs(),
    filesize(),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  external: ['react', /date-fns/]
};

/**
 * Rollup configuration to build the type declaration file.
 * @type {import('rollup').RollupOptions}
 */
const dtsConfig = {
  input,
  output: {
    file: pkg.types,
    format: 'es'
  },
  plugins: [dts()]
};

export default [mainConfig, dtsConfig];
