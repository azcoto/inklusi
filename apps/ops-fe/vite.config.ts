import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3001,
  },
  build: {
    outDir: './dist',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('@mantine')) {
            return 'vendor_mantine';
          } else if (id.includes('tabler-icons-react')) {
            return 'vendr_tir';
          }
          return 'vendor';
        },
      },
    },
  },
  plugins: [
    tsconfigPaths({
      projects: [resolve(__dirname, 'tsconfig.json')],
    }),
    react(),
    splitVendorChunkPlugin(),
  ],
});
