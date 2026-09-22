import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import fs from 'fs';
import { viteSingleFile } from 'vite-plugin-singlefile';

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
      viteSingleFile({ removeViteModuleLoader: true }),
      {
        name: 'remove-module-attributes',
        closeBundle() {
          const distIndex = path.resolve(import.meta.dirname || path.dirname(new URL(import.meta.url).pathname), 'dist/index.html');
          if (fs.existsSync(distIndex)) {
            let html = fs.readFileSync(distIndex, 'utf-8');
            html = html
              .replace(/<script\s+type="module"\s+crossorigin\s*>/g, '<script>')
              .replace(/<script\s+crossorigin\s+type="module"\s*>/g, '<script>')
              .replace(/<script\s+type="module"\s*>/g, '<script>')
              .replace(/<script\s+crossorigin\s*>/g, '<script>');
            fs.writeFileSync(distIndex, html, 'utf-8');
            console.log('Successfully stripped module type and crossorigin tags from build!');

            // Also save a copy to the root of the project as "NileTechno.html" for super easy access from outside/above the dist directory!
            const rootAppPath = path.resolve(import.meta.dirname || path.dirname(new URL(import.meta.url).pathname), 'NileTechno.html');
            fs.writeFileSync(rootAppPath, html, 'utf-8');
            console.log('Successfully copied the single-file built HTML to NileTechno.html at the project root!');
          }
        }
      }
    ],
    build: {
      assetsInlineLimit: 100000000, // Inline all media/images as base64 data URIs!
    },
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname || path.dirname(new URL(import.meta.url).pathname), '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
