const { build } = require('esbuild');

build({
  entryPoints: ['src/main.ts'],
  outdir: 'dist',
  bundle: true,
  platform: 'node',
});
