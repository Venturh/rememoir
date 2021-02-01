<template>
  <ButtonOrLink
    class="inline-flex items-center justify-center rounded-md stroke-current text-secondary focus:outline-none"
    :class="variants"
    :to="to"
    :out="out"
    @mouseover="hover(true)"
    @mouseleave="hover(false)"
    @click.stop="$emit('click')"
  >
    <slot />
    <div v-if="showTooltip && tooltip" class="relative">
      <Tooltip :variant="tooltipVariant">
        {{ tooltip }}
      </Tooltip>
    </div>
  </ButtonOrLink>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  ref,
} from '@nuxtjs/composition-api'

type Variants = 'primary' | 'secondary'

export default defineComponent({
  props: {
    to: {
      type: String,
    },
    out: {
      type: Boolean,
      default: false,
    },
    tooltip: {
      type: String,
      default: '',
    },
    variant: {
      type: String as PropType<Variants>,
      default: '',
    },
    tooltipVariant: {
      type: String as PropType<Variants>,
      default: '',
    },
  },

  setup(props, { emit }) {
    const showTooltip = ref(false)
    const variants = computed(() => {
      const allVariants = new Map<Variants, string>([
        ['primary', 'hover:bg-brand25 p-1 rounded-full hover:text-brand'],
      ])
      return (
        allVariants.get(props.variant as Variants) ||
        'hover:text-brand  focus:ring-2 focus:ring-inset focus:ring-brand'
      )
    })

    function hover(hover: boolean) {
      if (hover) {
        showTooltip.value = true
        emit('mouseover')
      } else {
        emit('mouseleave')
        showTooltip.value = false
      }
    }
    return { variants, hover, showTooltip }
  },
})
</script>
