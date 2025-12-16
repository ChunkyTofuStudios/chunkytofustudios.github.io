
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'serve-subdirectory-index',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // Handle microsite routes (including policy aliases) in dev without duplicate files
          const [pathname, query = ''] = (req.url || '').split('?');
          const allowedBases = ['/dozy', '/pixel-buddy', '/beehive'];
          const policySlugs = new Set(['privacy-policy', 'terms-and-conditions', 'data-safety']);
          const ext = path.extname(pathname);
          const baseMatch = allowedBases.find(
            (base) => pathname === base || pathname.startsWith(`${base}/`),
          );

          const lastSegment = pathname.split('/').filter(Boolean).slice(-1)[0] || '';
          const lastSlug = lastSegment.replace('.html', '');
          const isPolicy = policySlugs.has(lastSlug);

          // Only intercept extensionless navigation or known policy pages
          if (!baseMatch || (ext && ext !== '.html' && !isPolicy)) {
            next();
            return;
          }

          const fallback = path.join(__dirname, baseMatch.replace(/^\//, ''), 'index.html');
          if (fs.existsSync(fallback)) {
            req.url = fallback.replace(__dirname, '') + (query ? `?${query}` : '');
          }

          next();
        });
      },
    },
  ],
  assetsInclude: ['**/*.md'],
  build: {
    target: 'esnext',
    outDir: 'build',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        beehive: resolve(__dirname, 'beehive/index.html'),
        'beehive-demo': resolve(__dirname, 'beehive/demo/index.html'),
        'beehive-demo-popular': resolve(__dirname, 'beehive/demo/popular.html'),
        'beehive-demo-tutorial': resolve(__dirname, 'beehive/demo/tutorial.html'),
        'pixel-buddy': resolve(__dirname, 'pixel-buddy/index.html'),
        dozy: resolve(__dirname, 'dozy/index.html'),
      },
      plugins: [
        // Generate HTML files for the markdown pages
        {
          name: 'markdown-page-html-generation',
          generateBundle(_, bundle) {
            const copies = {
              'dozy/index.html': [
                'dozy/privacy-policy.html',
                'dozy/terms-and-conditions.html',
                'dozy/data-safety.html',
              ],
              'pixel-buddy/index.html': [
                'pixel-buddy/privacy-policy.html',
                'pixel-buddy/terms-and-conditions.html',
                'pixel-buddy/data-safety.html',
              ],
              'beehive/index.html': [
                'beehive/privacy-policy.html',
                'beehive/terms-and-conditions.html',
                'beehive/data-safety.html',
              ],
            };

            for (const [source, targets] of Object.entries(copies)) {
              const asset = bundle[source];
              if (!asset || asset.type !== 'asset') continue;

              targets.forEach((fileName) => {
                // Create flat HTML (e.g. pixel-buddy/privacy-policy.html)
                bundle[fileName] = { ...asset, fileName };

                // Also emit folder-style indexes so trailing slashes resolve on static hosts
                // (e.g. pixel-buddy/privacy-policy/index.html)
                const folderIndex = fileName.replace(/\.html$/, '/index.html');
                bundle[folderIndex] = { ...asset, fileName: folderIndex };
              });
            }
          },
        },
      ],
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
