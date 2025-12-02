import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Config simple pour Vite
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});
