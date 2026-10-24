import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/Snowball/', // Ensures assets load properly on any cPanel path or subdomain
  plugins: [
    react(),
    tailwindcss(),
  ],
})
