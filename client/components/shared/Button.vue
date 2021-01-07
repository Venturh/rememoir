<template>
  <button
    type="button"
    :class="buttonVariant(variant)"
    class="inline-flex items-center font-medium rounded-md shadow-sm"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    variant: {
      type: String,
      default: '',
    },
  },
  setup() {
    function buttonVariant(variant: string) {
      const map = new Map([
        [
          '1',
          'bg-secondary text-brand hover:bg-brand25 hover:text-brand hover:ring-1 hover:ring-brand ',
        ],
      ])

      return (
        map.get(variant) ||
        'bg-brand text-brandContrast border-secondary px-4 py-1 hover:bg-brandDarker  focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-brand'
      )
    }
    return { buttonVariant }
  },
})
</script>
