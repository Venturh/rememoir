<template>
  <div
    class="absolute z-50 w-full px-2 py-1 text-sm rounded-md min-w-max -bottom-14 -left-16 text-brand"
    :class="variant === 'primary' ? 'bg-primary' : ' bg-secondary'"
  >
    <slot />
    <svg
      class="absolute left-0 w-full h-2 -top-2 text-brand25"
      x="0px"
      y="0px"
      viewBox="0 0 100 100"
      xml:space="preserve"
    >
      <polygon class="fill-current" points="50 15, 100 100, 0 100" />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

type Variant = 'primary' | 'secondary'

export default defineComponent({
  props: {
    variant: {
      type: String as PropType<Variant>,
      default: 'primary',
    },
  },
})
</script>
