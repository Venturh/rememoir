import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import voie from 'vite-plugin-voie'
import vueI18n from '@intlify/vite-plugin-vue-i18n'

import ViteComponents from 'vite-plugin-components'

export default defineConfig({
  plugins: [
    vue(),
    ViteComponents(),
    voie({
      extendRoute(route) {
        const authRoutes = ['home', 'pinned', 'archive', 'lists', 'settings']

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
})
