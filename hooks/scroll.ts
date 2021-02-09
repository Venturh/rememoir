import { onMounted, onUnmounted, ref } from '@nuxtjs/composition-api'

export function useScroll(callback: () => void) {
  const scrolLRef = ref<HTMLElement[]>()

  function handleScroll() {
    const element = scrolLRef.value![0]
    if (
      Math.floor(element.getBoundingClientRect().bottom) <= window.innerHeight
    ) {
      callback()
    }
  }

  onMounted(() => window.addEventListener('scroll', handleScroll))
  onUnmounted(() => window.removeEventListener('scroll', handleScroll))

  return { scrolLRef }
}
