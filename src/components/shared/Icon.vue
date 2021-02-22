<template>
  <component
    :is="icon"
    v-if="icon"
    :class="[sizes, colors]"
    class="flex-shrink-0 fill-current"
  />
</template>

<script lang="ts">
import { computed, PropType } from 'vue'
type Size = 'xs' | 'sm' | 'md' | 'lg'
type Color = 'brand' | 'primary' | 'secondary' | 'error' | 'success'
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
    color: {
      type: String as PropType<Color>,
      default: '',
    },
  },

  setup(props) {
    const sizes = computed(() => {
      const map = new Map<Size, string>([
        ['xs', 'h-3'],
        ['sm', 'h-4'],
        ['md', 'h-5'],
        ['lg', 'h-6'],
      ])
      return map.get(props.size)
    })
    const colors = computed(() => {
      const map = new Map<Color, string>([
        ['primary', 'text-primary'],
        ['secondary', 'text-secondary'],
        ['brand', 'text-brand'],
        ['error', 'text-error'],
        ['success', 'text-success'],
      ])
      return map.get(props.color) || ''
    })
    return { sizes, colors }
  },
}
</script>
