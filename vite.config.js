import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import fs from 'fs';

// Run automated creation of client-provided assets if not present
const imagesDir = path.resolve(import.meta.dirname || path.dirname(new URL(import.meta.url).pathname), './src/assets/images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

const transparentPngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
const pngBuffer = Buffer.from(transparentPngBase64, 'base64');

const rootLogoPath = path.resolve(import.meta.dirname || path.dirname(new URL(import.meta.url).pathname), './NTLogo3.png');
if (!fs.existsSync(rootLogoPath)) {
  fs.writeFileSync(rootLogoPath, pngBuffer);
}

const sourceLogo = path.join(imagesDir, '4f23b9ed-3306-4d61-89d4-b86368da6d6d.png');
const targetLogo = path.join(imagesDir, 'logo.png');

if (fs.existsSync(sourceLogo) && !fs.existsSync(targetLogo)) {
  fs.copyFileSync(sourceLogo, targetLogo);
}

const filesToCreate = [
  'photo3.png',
  'photo.webp',
  'photo2.webp',
  'photo1.webp',
  'nile_techno_logo_transparent.webp',
  'nile_techno_logo_transparent_1781456649251.jpg',
  'logo.png',
  'modalLogo.png',
  '699.webp'
];
filesToCreate.forEach((f) => {
  const filePath = path.join(imagesDir, f);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, pngBuffer);
  }
});

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'copy-built-html',
        closeBundle() {
          const distIndex = path.resolve(import.meta.dirname || path.dirname(new URL(import.meta.url).pathname), 'dist/index.html');
          const rootAppPath = path.resolve(import.meta.dirname || path.dirname(new URL(import.meta.url).pathname), 'NileTechno.html');
          if (fs.existsSync(distIndex)) {
            // Preserve Vite's module script and preload tags so dynamic imports remain split and executable.
            fs.copyFileSync(distIndex, rootAppPath);
          }
        }
      }
    ],
    build: {
      // Keep assets as cacheable files; inlining them increases the critical HTML/JS payload.
      assetsInlineLimit: 0,
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
              return 'vendor';
            }
            if (id.includes('node_modules/motion')) {
              return 'motion';
            }
            if (id.includes('node_modules/lucide-react')) {
              return 'icons';
            }
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname || path.dirname(new URL(import.meta.url).pathname), '.'),
      },
    },
    server: {
      allowedHosts: true,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
