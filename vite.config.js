import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        outros: resolve(__dirname, 'outros-servicos.html'),
        privacidade: resolve(__dirname, 'politica-de-privacidade.html'),
      },
    },
  },
});
