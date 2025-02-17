import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Set to true to listen on all addresses
    port: 5173  // You can also explicitly set the port if needed
  }
})
