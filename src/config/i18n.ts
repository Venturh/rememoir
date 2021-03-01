import { createI18n } from 'vue-i18n'
import messages from '@intlify/vite-plugin-vue-i18n/messages'
import { setLocale } from 'yup'

if (localStorage.getItem('locale') === null)
  localStorage.setItem('locale', navigator.language.split('-')[0])

const locale =
  localStorage.getItem('locale') || navigator.language.split('-')[0]

export const i18n = createI18n({
  legacy: false,
  locale,
  messages,
})

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
