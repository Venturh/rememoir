<template>
  <router-link :class="styled ? 'font-medium rounded-lg p-2 ' : ''" :to="to">
    <slot />
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

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
