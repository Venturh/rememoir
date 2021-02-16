<template>
  <ButtonOrLink
    class="inline-flex items-center justify-center rounded-md fill-current text-secondary focus:outline-none"
    :class="variants"
    :to="to"
    :out="out"
  >
    <slot />
  </ButtonOrLink>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

type Variants = 'primary' | 'secondary'

export default defineComponent({
  props: {
    to: {
      type: String,
      default: '',
    },
    out: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String as PropType<Variants>,
      default: '',
    },
  },

  setup(props) {
    const variants = computed(() => {
      const allVariants = new Map<Variants, string>([
        ['primary', 'hover:bg-brand25 p-1 rounded-full hover:text-brand'],
      ])
      return (
        allVariants.get(props.variant as Variants) ||
        'hover:text-brand  focus:ring-2 focus:ring-inset focus:ring-brand'
      )
    })

    return { variants }
  },
})
</script>
