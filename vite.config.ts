import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import voie from 'vite-plugin-voie'
import vueI18n from '@intlify/vite-plugin-vue-i18n'

import ViteComponents from 'vite-plugin-components'

export default defineConfig({
  build: {
    brotliSize: false,
    chunkSizeWarningLimit: 1200,
    manifest: true,
  },
  plugins: [
    vue(),
    ViteComponents(),
    voie({
      importMode(path) {
        // Load index synchronously, all other pages are async.
        return path.includes('index') ? 'sync' : 'async'
      },
      extendRoute(route) {
        const authRoutes = [
          'home',
          'pinned',
          'archive',
          'lists',
          'settings',
          'test',
        ]
        if (authRoutes.includes(route.name.split('-')[0])) {
          return {
            ...route,
            meta: { requiresAuth: true },
          }
        }
        return route
      },
    }),
    vueI18n({
      include: resolve(__dirname, './src/locales/**'),
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    include: ['vue', 'vue-router'],
    exclude: ['vue-demi'],
  },
})
