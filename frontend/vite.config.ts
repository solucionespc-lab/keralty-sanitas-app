import tsconfigPaths from 'vite-tsconfig-paths';
import { ViteWebfontDownload } from 'vite-plugin-webfont-dl';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    ViteWebfontDownload(
      [
        'https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap',
      ],
      { async: true }
    ),
  ],
  clearScreen: true,
  server: {
    open: true,
    port: 3000,
  },
});
