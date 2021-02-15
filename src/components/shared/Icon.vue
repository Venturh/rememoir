<template>
  <component
    :is="icon"
    v-if="icon"
    :class="sizes"
    class="fill-current text-brand"
  />
</template>

<script lang="ts">
import { computed, PropType } from 'vue'
type Size = 'xs' | 'sm' | 'md' | 'lg'
export default {
  props: {
    icon: {
      type: Object,
      default: () => {},
    },
    size: {
      type: String as PropType<Size>,
      default: 'md',
    },
  },

  setup(props) {
    const sizes = computed(() => {
      const map = new Map<Size, string>([
        ['xs', 'h-4'],
        ['sm', 'h-5'],
        ['md', 'h-6'],
        ['lg', 'h-7'],
      ])
      return map.get(props.size)
    })
    return { sizes }
  },
}
</script>
