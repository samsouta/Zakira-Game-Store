import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    host: 'web.localhost', // subdomain name
    port: 5173,             // default port or change if needed
  },
})
