import { onMounted, onUnmounted, ref } from 'vue'

export function useScroll(callback: () => void) {
  const scrollRef = ref<HTMLElement>()

  function handleScroll() {
    const element = scrollRef.value

    if (
      element &&
      Math.floor(element.getBoundingClientRect().bottom) <= window.innerHeight
    ) {
      callback()
    }
  }

  onMounted(() => window.addEventListener('scroll', handleScroll))
  onUnmounted(() => window.removeEventListener('scroll', handleScroll))

  return { scrollRef }
}
