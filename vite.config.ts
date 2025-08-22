import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
  // No need to manually define env vars - Vite automatically handles VITE_ prefixed vars
});
