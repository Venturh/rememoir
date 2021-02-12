<template>
  <Layout target="pinned" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  middleware: ['authenticated'],
  setup() {},
})
</script>
