import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// npm run build        -> normal fast build (for the domain / hosting)  => dist/
// npm run build:local  -> single index.html that opens by double-click  => dist-local/
export default defineConfig(({ mode }) => {
  const single = mode === 'single';
  return {
    base: './',
    plugins: [react(), tailwindcss(), ...(single ? [viteSingleFile()] : [])],
    resolve: { alias: { '@': path.resolve(__dirname, '.') } },
    build: {
      outDir: single ? 'dist-local' : 'dist',
      ...(single
        ? {}
        : {
            rollupOptions: {
              output: {
                manualChunks(id) {
                  if (/node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return 'vendor';
                  if (id.includes('node_modules/motion')) return 'motion';
                  if (id.includes('node_modules/lucide-react')) return 'icons';
                }
              }
            }
          })
    },
    server: { host: '0.0.0.0', port: 3000, allowedHosts: true }
  };
});