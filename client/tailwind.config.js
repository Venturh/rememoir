const defaultTheme = require('tailwindcss/defaultTheme')
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
      error: 'var(--error)',
      success: 'var(--success)',
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
    },
  },
  variants: {},
  plugins: [],
}
