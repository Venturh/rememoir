<template>
  <div class="flex flex-col items-center">
    <font-awesome-icon icon="search" />
    <p>We couldnt found anything</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    target: {
      type: String,
      default: '',
    },
  },
})
</script>
