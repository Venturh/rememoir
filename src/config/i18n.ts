import { createI18n } from 'vue-i18n'
import messages from '@intlify/vite-plugin-vue-i18n/messages'

if (localStorage.getItem('locale') === null)
  localStorage.setItem('locale', navigator.language.split('-')[0])

export const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || navigator.language.split('-')[0],
  messages,
})
