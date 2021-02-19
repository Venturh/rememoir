<template>
  <div class="relative flex w-full space-x-2">
    <div
      class="cursor-pointer"
      @mouseover="show = true"
      @mouseleave="show = false"
    >
      <slot />
    </div>
    <div>
      <div
        v-if="show && !disabled"
        :class="positions"
        class="absolute bottom-0 px-2 py-1 text-sm rounded-md text-primary ring-1/2 ring-borderPrimary bg-primary inset-center"
      >
        <span v-if="text">{{ text }}</span>
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'

type Variant = 'primary' | 'secondary'
type Position = 'under' | 'right'

export default defineComponent({
  props: {
    variant: {
      type: String as PropType<Variant>,
      default: 'primary',
    },
    text: {
      type: String,
      default: '',
    },
    position: {
      type: String as PropType<Position>,
      default: 'right',
    },
    disabled: Boolean,
  },

  setup(props) {
    const show = ref(false)

    const positions = computed(() => {
      const map = new Map<Position, string>([
        ['under', 'left-0 -bottom-12'],
        ['right', ' bottom-0'],
      ])
      return map.get(props.position)
    })
    return { show, positions }
  },
})
</script>
