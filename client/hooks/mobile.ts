import { computed } from '@nuxtjs/composition-api'
import { useBreakpointTailwindCSS } from 'vue-composable'

export function useIsMobile() {
  const { current } = useBreakpointTailwindCSS()
  const isMobile = computed(() => {
    if (['md', 'lg', 'xl'].includes(current.value)) return false
    return true
  })

  return { isMobile }
}
