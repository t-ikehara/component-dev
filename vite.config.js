import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

// pages/ 配下の preview-*.html を自動検出してマルチページ入力に追加
function getPageEntries() {
  const pagesDir = resolve(__dirname, 'pages');
  const entries = {};
  if (fs.existsSync(pagesDir)) {
    fs.readdirSync(pagesDir)
      .filter((f) => f.endsWith('.html'))
      .forEach((f) => {
        const name = f.replace('.html', '');
        entries[name] = resolve(pagesDir, f);
      });
  }
  return entries;
}

export default defineConfig({
  root: '.',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        loadPaths: [resolve(__dirname, 'src/styles')],
      },
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ...getPageEntries(),
      },
    },
    assetsInlineLimit: 0,
  },
  server: {
    open: true,
  },
});
