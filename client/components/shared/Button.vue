<template>
  <button
    type="button"
    :class="[buttonVariant(variant), { 'px-4 py-2 ': !padding }]"
    class="flex items-center justify-center font-medium rounded-md shadow-sm focus:outline-none"
    @click="$emit('click', $event)"
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
    padding: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    function buttonVariant(variant: string) {
      const map = new Map([
        ['1', 'bg-secondary  py-2 text-brand hover:bg-brand hover:text-white'],
        ['inherit', 'bg-none text-primary  hover:text-brand'],
        ['secondary', 'bg-brand25 text-brand  py-2  hover:bg-brand15'],
      ])

      return (
        map.get(variant) ||
        'bg-brand text-white border-secondary px-4 py-2 hover:bg-brandDarker  focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-brand'
      )
    }
    return { buttonVariant }
  },
})
</script>
