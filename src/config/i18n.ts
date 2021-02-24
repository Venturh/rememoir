import { createI18n } from 'vue-i18n'
import de from '../locales/de-DE.json'
import en from '../locales/en-US.json'

if (localStorage.getItem('locale') === null)
  localStorage.setItem('locale', navigator.language.split('-')[0])

export const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || navigator.language.split('-')[0],
  messages: {
    en,
    de,
  },
  global: true,
})
