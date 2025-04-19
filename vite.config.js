import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server:{
    proxy:{
      "/api":{
        target:"https://mern-backend-latest.onrender.com",
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
