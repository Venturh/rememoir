<template>
  <div
    v-if="type === 'skeleton'"
    class="rounded-md bg-secondaryText animate-pulse"
  />
  <svg
    v-else
    class="fill-current animate-spin"
    :class="{ 'w-5 h-5 sm:w-6 sm:h-6 text-primary ': !custom }"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M12 3a9 9 0 0 1 9 9h-2a7 7 0 0 0-7-7V3z" />
  </svg>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

type LoadingType = 'spinner' | 'skeleton'

export default defineComponent({
  props: {
    custom: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String as PropType<LoadingType>,
      default: 'spinner',
    },
  },
})
</script>
