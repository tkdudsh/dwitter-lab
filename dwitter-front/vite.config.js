import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // /api/* 요청을 Express 서버로 프록시
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/upload': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
});

