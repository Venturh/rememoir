import { computed } from '@nuxtjs/composition-api'
import { useBreakpointTailwindCSS } from 'vue-composable'

export function useBreakpoint() {
  const { current } = useBreakpointTailwindCSS()
  console.log('useBreakpoint ~ current', current)
  const isMobile = computed(() => {
    return !['md', 'lg', 'xl'].includes(current.value)
  })
  const isDesktop = computed(() => {
    return !!['lg', 'xl'].includes(current.value)
  })

  return { isMobile, isDesktop }
}
