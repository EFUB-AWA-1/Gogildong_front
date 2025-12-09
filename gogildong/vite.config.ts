// vite.config.ts
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const certPath = env.VITE_SSL_CERT_PATH || './mkcert/cert.pem';
  const keyPath = env.VITE_SSL_KEY_PATH || './mkcert/key.pem';
  const hasCert = fs.existsSync(certPath) && fs.existsSync(keyPath);

  return {
    plugins: [react(), tailwindcss(), svgr()],
    resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
    server: {
      host: true,
      https: hasCert
        ? {
            key: fs.readFileSync(keyPath),
            cert: fs.readFileSync(certPath)
          }
        : undefined
    }
  };
});
