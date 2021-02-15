<template>
  <div
    class="text-xs"
    :class="[
      variants,
      rounded ? 'rounded-lg' : '',
      small ? 'p-1' : 'px-2 py-1.5',
    ]"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

type Variants = 'primary' | 'secondary' | 'brand25' | 'border'
export default defineComponent({
  props: {
    variant: {
      type: String as PropType<Variants>,
      default: 'primary',
    },
    rounded: {
      type: Boolean,
      default: true,
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const variants = computed(() => {
      const map = new Map<Variants, string>([
        ['primary', ' bg-secondary ring-1/2 ring-borderPrimary'],
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
