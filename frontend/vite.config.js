import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

/*export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost/my-mealplanner-app/backend',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
});*/

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        // Promjena ovdje: Uključi /api u target
        target: 'http://localhost/my-mealplanner-app/backend/api',
        changeOrigin: true,
        // Rewrite i dalje uklanja /api iz putanje koju šalje frontend,
        // ali sada je to ispravno jer je /api već dio targeta.
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
});
