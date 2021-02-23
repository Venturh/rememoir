import { createI18n } from 'vue-i18n'
import de from '../locales/de-DE.json'
import en from '../locales/en-US.json'
export const i18n = createI18n({
  legacy: false,
  locale: navigator.language.split('-')[0],
  messages: {
    en,
    de,
  },
  global: true,
})
