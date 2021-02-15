import { DefaultApolloClient } from '@vue/apollo-composable'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faGlobeEurope,
  faMoon,
  faSun,
  faExclamationCircle,
  faEllipsisV,
  faHome,
  faMapMarker,
  faArchive,
  faUser,
  faTimes,
  faPlus,
  faSearch,
  faColumns,
  faListUl,
  faChevronDown,
  faBackspace,
  faSquare,
  faAlignCenter,
  faClock,
  faFolder,
  faPlay,
  faExternalLinkAlt,
  faLayerGroup,
  faEdit,
  faShareAlt,
  faLink,
  faCog,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons'
import VueFinalModal from 'vue-final-modal'

import { createApp } from 'vue'
import App from './App.vue'

import { apolloClient } from '@/config/apollo'
import Router from './router'
import './assets/index.css'

import { i18n } from './config/i18n'

library.add(
  faGlobeEurope,
  faMoon,
  faSun,
  faExclamationCircle,
  faEllipsisV,
  faHome,
  faMapMarker,
  faArchive,
  faUser,
  faTimes,
  faPlus,
  faSearch,
  faColumns,
  faListUl,
  faChevronDown,
  faBackspace,
  faSquare,
  faLayerGroup,
  faAlignCenter,
  faClock,
  faFolder,
  faPlay,
  faExternalLinkAlt,
  faLayerGroup,
  faEdit,
  faShareAlt,
  faLink,
  faCog,
  faSignOutAlt
)

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .provide(DefaultApolloClient, apolloClient)
  .use(i18n)
  .use(Router)
  .use(VueFinalModal())
  .mount('#app')
