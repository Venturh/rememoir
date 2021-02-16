<template>
  <div class="flex flex-col items-center">
    <Icon :icon="RiSearch2Line" />
    <p>We couldnt found anything</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RiSearch2Line } from 'vue-remix-icons'

export default defineComponent({
  props: {
    target: {
      type: String,
      default: '',
    },
  },
  setup() {
    return { RiSearch2Line }
  },
})
</script>
