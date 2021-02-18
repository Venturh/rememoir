<template>
  <button
    type="button"
    :class="[
      buttonVariant,
      { 'px-2 py-1 sm:py-2 ': !padding },
      small ? 'text-xs sm:text-sm' : 'text-sm sm:text-base ',
    ]"
    class="flex items-center justify-center font-medium border border-transparent rounded-md shadow-sm dark:shadow-none focus:outline-none"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

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
    small: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const buttonVariant = computed(() => {
      const map = new Map([
        ['1', 'ring-1 ring-brand text-brand hover:bg-brand hover:text-white'],
        ['inherit', 'bg-none text-primary  hover:text-brand'],
        [
          'brand15',
          'bg-brand15 hover:bg-brand25 text-primary focus:ring-2 focus:ring-offset-2 focus:ring-offset-primaryBg focus:ring-brand15',
        ],
        [
          'brand25',
          'bg-brand25 hover:bg-brand15 text-brand focus:ring-2 focus:ring-offset-2 focus:ring-offset-primaryBg focus:ring-brand25',
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
