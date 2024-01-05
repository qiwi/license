#!/usr/bin/env node

const esbuild = require('esbuild')
const { nodeExternalsPlugin } = require('esbuild-node-externals')
const { entryChunksPlugin } = require('esbuild-plugin-entry-chunks')

const esmConfig = {
  entryPoints: ['./src/main/ts/index.ts', './src/main/ts/cli.ts'],
  outdir: './target/esm',
  bundle: true,
  minify: false,
  sourcemap: true,
  sourcesContent: false,
  platform: 'node',
  target: 'ES2020',
  format: 'esm',
  outExtension: {
    '.js': '.mjs'
  },
  external: ['node:*'],    // https://github.com/evanw/esbuild/issues/1466
  plugins: [               // https://github.com/evanw/esbuild/issues/619
    nodeExternalsPlugin(),
    entryChunksPlugin()
  ],
  tsconfig: './tsconfig.json'
}

const cjsConfig = {
  ...esmConfig,
  outdir: './target/cjs',
  target: 'es6',
  format: 'cjs',
  plugins: [
    entryChunksPlugin()
  ],
  outExtension: {
    '.js': '.cjs'
  },
  define: {
    'import.meta': 'import_meta'
  },
  inject: ['./src/scripts/import.meta-polyfill.js']
}

const config = process.argv.includes('--cjs')
  ? cjsConfig
  : esmConfig

esbuild
  .build(config)
  .catch(() => process.exit(1))
