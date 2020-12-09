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
      brandContrast: 'var(--brandContrast)',
      error: 'var(--error)',
      success: 'var(--success)',
      gray: colors.coolGray,
      primaryText: 'var(--text-primary)',
      secondaryText: 'var(--text-secondary)',
      primaryBg: 'var(--bg)',
      secondaryBg: 'var(--bg-secondary)',
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
      },
      transitionProperty: {
        height: 'height',
        width: 'width',
        top: 'top',
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/forms')],
}
