import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '.ngrok-free.dev'
    ],
    host: '0.0.0.0',
    port: 4200
  }
});
