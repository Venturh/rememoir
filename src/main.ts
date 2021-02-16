import { createApp } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import VueFinalModal from 'vue-final-modal'

import App from './App.vue'

import { apolloClient } from '@/config/apollo'
import Router from './router'
import { i18n } from './config/i18n'
import './assets/index.css'

createApp(App)
  .provide(DefaultApolloClient, apolloClient)
  .use(i18n)
  .use(Router)
  .use(VueFinalModal())
  .mount('#app')
