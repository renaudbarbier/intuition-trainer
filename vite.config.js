import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' keeps every asset reference relative, so the build works whether
// it is served from the domain root or from a /repo/ sub-path (GitHub Pages).
// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
})
