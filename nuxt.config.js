import i18n from './config/i18n'

export default {
  ssr: false,
  head: {
    title: 'client',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://rsms.me/inter/inter.css',
      },
    ],
  },

  css: [],

  plugins: [
    '@/plugins/provide-apollo-client',
    '@/plugins/dayjs',
    '@/plugins/vue-final-modal',
    '@/plugins/vue-calendar',
    '@/plugins/v-click-outside',
  ],

  components: true,

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/composition-api',
    '@nuxtjs/tailwindcss',
  ],

  modules: ['@nuxtjs/apollo', ['nuxt-i18n', i18n]],

  apollo: {
    clientConfigs: {
      default: '~/plugins/apollo-config.ts',
    },
  },

  build: {
    transpile: ['vue-final-modal'],
  },
}