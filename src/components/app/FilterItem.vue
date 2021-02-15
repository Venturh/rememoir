<template>
  <div class="space-y-1">
    <p class="px-2">{{ title }}</p>
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '',
    },
  },
})
</script>
