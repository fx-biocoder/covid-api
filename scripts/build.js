const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/app.ts'],
  bundle: true,
  outfile: 'dist/bundle.js',
  format: 'esm',
  platform: 'browser',
  sourcemap: true,
  target: ['es6']
}).catch(() => process.exit(1));