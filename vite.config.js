// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/me/',     // 👈  path donde se sirve tu app
  plugins: [react()],
});
