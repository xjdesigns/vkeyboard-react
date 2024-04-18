import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    open: true
  },

  build: {
    minify: true,
    copyPublicDir: false,
    lib: {
      // eslint-disable-next-line no-undef
      entry: resolve(__dirname, 'src/vkeyboard/index.jsx'),
      formats: ['es'],
    },

    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
    }
  }
})
