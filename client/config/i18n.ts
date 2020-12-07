import de from '../locales/de-DE'
import en from '../locales/en-US'

type I18n = {
  locales: { code: string; iso: string; name: string }[]
  defaultLocale: string
  vueI18n: { fallbackLocale: 'en'; messages: any }
}

const i18n: I18n = {
  locales: [
    {
      code: 'en',
      iso: 'en-US',
      name: 'English',
    },
    {
      code: 'de',
      iso: 'de-DE',
      name: 'Deutsch',
    },
  ],
  defaultLocale: 'en',
  // routes: {
  //   about: {
  //     de: '/a-propos',
  //     en: '/about-us',
  //   },
  //   posts: {
  //     de: '/articles',
  //   },
  //   'post/_id': {
  //     de: '/article/:id?',
  //     es: '/articulo/:id?',
  //   },
  //   'dynamicNested/_category': {
  //     de: 'imbrication-dynamique/:category',
  //   },
  // },
  vueI18n: {
    fallbackLocale: 'en',
    messages: { en, de },
  },
}

export default i18n
