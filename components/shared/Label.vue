<template>
  <div class="px-2 py-1.5 text-xs rounded-lg" :class="variants">
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'

type Variants = 'primary' | 'secondary' | 'brand25' | 'border'
export default defineComponent({
  props: {
    variant: {
      type: String as PropType<Variants>,
      default: 'primary',
    },
  },
  setup(props) {
    const variants = computed(() => {
      const map = new Map<Variants, string>([
        ['primary', ' bg-secondary'],
        ['secondary', ''],
        ['brand25', 'bg-brand25'],
        ['border', 'border border-borderPrimary shadow-sm'],
      ])

      return map.get(props.variant)
    })

    return { variants }
  },
})
</script>
