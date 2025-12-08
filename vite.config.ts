
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import tailwindcss from '@tailwindcss/vite';
  import path from 'path';
  import { dirname, resolve } from 'node:path';
  import { fileURLToPath } from 'node:url';

  const __dirname = dirname(fileURLToPath(import.meta.url));

  export default defineConfig({
    base: '/',
    plugins: [react(), tailwindcss()],
    assetsInclude: ['**/*.md'],
    build: {
      target: 'esnext',
      outDir: 'build',
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          beehive: resolve(__dirname, 'beehive/index.html'),
          'beehive-data-safety': resolve(__dirname, 'beehive/data-safety.html'),
          'beehive-privacy-policy': resolve(__dirname, 'beehive/privacy-policy.html'),
          'beehive-terms-and-conditions': resolve(__dirname, 'beehive/terms-and-conditions.html'),
          'pixel-buddy': resolve(__dirname, 'pixel-buddy/index.html'),
          'pixel-buddy-data-safety': resolve(__dirname, 'pixel-buddy/data-safety.html'),
          'pixel-buddy-privacy-policy': resolve(__dirname, 'pixel-buddy/privacy-policy.html'),
          'pixel-buddy-terms-and-conditions': resolve(__dirname, 'pixel-buddy/terms-and-conditions.html'),
          dozy: resolve(__dirname, 'dozy/index.html'),
          'dozy-data-safety': resolve(__dirname, 'dozy/data-safety.html'),
          'dozy-privacy-policy': resolve(__dirname, 'dozy/privacy-policy.html'),
          'dozy-terms-and-conditions': resolve(__dirname, 'dozy/terms-and-conditions.html'),
        },
      },
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3000,
      open: true,
    },
  });
