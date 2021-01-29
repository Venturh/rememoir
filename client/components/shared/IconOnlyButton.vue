<template>
  <ButtonOrLink
    class="inline-flex items-center justify-center rounded-md stroke-current text-secondary"
    :class="variants"
    :to="to"
    :out="out"
    @mouseover="$emit('mouseover')"
    @mouseleave="$emit('mouseleave')"
    @click.stop="$emit('click')"
  >
    <slot />
  </ButtonOrLink>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'

type Variants = 'primary' | 'secondary'

export default defineComponent({
  props: {
    to: {
      type: String,
    },
    out: {
      out: Boolean,
      default: false,
    },
    variant: {
      out: String as PropType<Variants>,
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
        'hover:text-brand focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand'
      )
    })

    return { variants }
  },
})
</script>
