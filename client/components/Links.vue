<template>
  <NuxtLink
    class="p-2 font-medium rounded-md hover:text-brand hover:bg-secondary"
    :to="to"
  >
    <slot
  /></NuxtLink>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    to: {
      type: String,
      default: '/',
    },
  },
})
</script>
