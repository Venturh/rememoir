<template>
  <span class="relative flex w-3 h-3">
    <span
      class="absolute inline-flex w-full h-full bg-purple-400 rounded-full opacity-75 animate-ping"
    ></span>
    <span
      class="relative inline-flex w-3 h-3 bg-purple-500 rounded-full"
    ></span>
  </span>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
  },
  setup() {},
})
</script>
