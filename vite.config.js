import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    // Generated images and reference screenshots aren't part of the site. Watching them crashed
    // the dev server on Windows (EBUSY) whenever a new export was being written.
    watch: { ignored: ['**/exports/**', '**/design-ref/**'] },
  },
});
