<template>
  <button
    type="button"
    class="inline-flex items-center px-4 py-1 font-medium border border-transparent rounded-md shadow-sm text-brandContrast bg-brand hover:bg-opacity-50 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-secondaryBg"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {},
  setup() {},
})
</script>
