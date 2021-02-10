<template>
  <button
    type="button"
    :class="[buttonVariant, { 'px-4 py-2 ': !padding }]"
    class="flex items-center justify-center text-sm font-medium border border-transparent rounded-md shadow-sm sm:text-base focus:outline-none"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'

type Variant = 'brand' | 'brand25' | 'brand15' | 'inherit'
export default defineComponent({
  props: {
    variant: {
      type: String as PropType<Variant>,
      default: 'brand',
    },
    padding: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const buttonVariant = computed(() => {
      const map = new Map([
        [
          '1',
          'ring-1 ring-brand shadow-sm text-brand hover:bg-brand hover:text-white',
        ],
        ['inherit', 'bg-none text-primary  hover:text-brand'],
        [
          'brand15',
          'shadow-sm bg-brand15 hover:bg-brand25 text-primary focus:ring-2 focus:ring-offset-2 focus:ring-offset-primaryBg focus:ring-brand15',
        ],
        [
          'brand25',
          'shadow-sm bg-brand25 hover:bg-brand15 text-brand focus:ring-2 focus:ring-offset-2 focus:ring-offset-primaryBg focus:ring-brand25',
        ],
        [
          'brand',
          'bg-brand text-white border-secondary px-4 py-2 hover:bg-brandDarker focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-brand',
        ],
      ])

      return map.get(props.variant)
    })
    return { buttonVariant }
  },
})
</script>
