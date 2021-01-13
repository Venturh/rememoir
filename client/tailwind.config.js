const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
module.exports = {
  darkMode: 'class',
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    colors: {
      brand: 'var(--brand)',
      brandDarker: 'var(--brandDarker)',
      brandContrast: 'var(--brandContrast)',
      brand25: 'var(--brand25)',
      brand15: 'var(--brand15)',
      borderPrimary: 'var(--border)',
      error: 'var(--error)',
      success: 'var(--success)',
      gray: colors.coolGray,
      primaryText: 'var(--text-primary)',
      secondaryText: 'var(--text-secondary)',
      primaryBg: 'var(--bg)',
      secondaryBg: 'var(--bg-secondary)',
      transparent: 'transparent',
      white: '#ffffff',
    },

    extend: {
      sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      backgroundColor: {
        primary: 'var(--bg)',
        secondary: 'var(--bg-secondary)',
      },
      textColor: {
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
      },
      maxWidth: {
        xxs: '18rem',
        xsm: '21rem',
        xxl: '100rem',
      },
      transitionProperty: {
        height: 'height',
        width: 'width',
        top: 'top',
      },
    },
  },
  variants: {
    ringColor: ['hover', 'active', 'focus'],
    ringWidth: ['hover', 'active', 'focus'],
  },
  plugins: [require('@tailwindcss/forms')],
}
