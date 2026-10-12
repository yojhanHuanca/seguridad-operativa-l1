import { defineConfig } from '@playwright/test';
import base from './playwright.config';

// Comprueba el bundle generado por npm run build, sin reemplazar el servidor
// de desarrollo ni convertir esta vista previa local en un despliegue.
export default defineConfig({
  ...base,
  workers: 1,
  use: { ...base.use, baseURL: 'http://127.0.0.1:5175' },
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port 5175 --strictPort',
    url: 'http://127.0.0.1:5175',
    reuseExistingServer: false,
  },
});
