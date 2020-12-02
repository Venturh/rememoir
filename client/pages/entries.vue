<template>
  <div
    class="flex items-center justify-center min-h-screen mx-auto text-center"
  >
    Logged in
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  middleware: ['authenticated'],
  setup() {},
})
</script>
