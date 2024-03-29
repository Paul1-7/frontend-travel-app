import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import process from 'process'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(process.cwd(), './src')
    }
  },
  server: {
    host: '0.0.0.0',
    port: '5173',
    open: true
  }
})
