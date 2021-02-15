import { ref } from 'vue'

export default function useTheme() {
  const theme = ref()

  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.querySelector('html').classList.add('dark')
    theme.value = 'dark'
  } else {
    document.querySelector('html').classList.remove('dark')
    theme.value = 'light'
  }

  function setLightTheme() {
    theme.value = 'light'
    document.querySelector('html').classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }

  function setDarkTheme() {
    theme.value = 'dark'
    document.querySelector('html').classList.add('dark')
    localStorage.setItem('theme', 'dark')
  }

  function toggleTheme() {
    if (theme.value === 'dark') {
      setLightTheme()
    } else {
      setDarkTheme()
    }
  }

  return {
    theme,
    toggleTheme,
  }
}
