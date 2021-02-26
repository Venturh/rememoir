import { createApp } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import VueFinalModal from 'vue-final-modal'

import App from './App.vue'

import vClickOutside from './config/clickoutside'
import { apolloClient } from '@/config/apollo'
import Router from './router'
import { i18n } from './config/i18n'
import './assets/index.css'

import { setLocale } from 'yup'

setLocale({
  mixed: {
    default: 'field_default',
    required: { key: 'field_required' },
    isValid: { key: 'field_valid' },
  },

  string: {
    min: ({ min }: { min: string }) => ({
      key: 'field_too_short',
      values: min,
    }),
    max: ({ max }: { max: string }) => ({
      key: 'field_too_big',
      values: { max },
    }),
    email: () => ({
      key: 'field_email',
    }),
  },
})

createApp(App)
  .provide(DefaultApolloClient, apolloClient)
  .directive('clickOutside', vClickOutside)
  .use(i18n)
  .use(Router)
  .use(VueFinalModal())
  .mount('#app')
