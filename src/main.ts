import { createApp } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import VueFinalModal from 'vue-final-modal'

import App from './App.vue'

import vClickOutside from './config/clickoutside'
import { apolloClient } from '@/config/apollo'
import Router from './router'
import { i18n } from './config/i18n'
import './assets/index.css'

import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import updateLocale from 'dayjs/plugin/updateLocale'
import relativeTime from 'dayjs/plugin/relativeTime'
import calendar from 'dayjs/plugin/calendar'
import('dayjs/locale/de')

dayjs.extend(relativeTime)
dayjs.extend(customParseFormat)
dayjs.extend(updateLocale)
dayjs.extend(relativeTime)
dayjs.extend(calendar)

createApp(App)
  .provide(DefaultApolloClient, apolloClient)
  .directive('clickOutside', vClickOutside)
  .use(i18n)
  .use(Router)
  .use(VueFinalModal())
  .mount('#app')
