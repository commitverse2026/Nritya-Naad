import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // MediaPipe requires 'global' to be defined in the browser environment
    global: 'window',
  },
  optimizeDeps: {
    // This forces Vite to pre-bundle these libraries correctly on startup
    include: ['@mediapipe/hands', '@mediapipe/camera_utils']
  }
})