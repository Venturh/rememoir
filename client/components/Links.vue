<template>
  <NuxtLink
    class="p-2 font-medium rounded-lg hover:text-brand"
    :to="localePath(to)"
  >
    <slot />
  </NuxtLink>
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
