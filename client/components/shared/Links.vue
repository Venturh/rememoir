<template>
  <NuxtLink
    :class="styled ? 'font-medium rounded-lg p-2 ' : ''"
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
    styled: {
      type: Boolean,
      default: true,
    },
  },
})
</script>
