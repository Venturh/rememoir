<template>
  <Root>
    <div class="flex flex-col h-screen mx-auto max-w-xsm lg:max-w-5xl">
      <NavigationHeader />
      <div class="w-full mx-auto my-auto h-1/2 lg:max-w-sm">
        <slot />
      </div>
    </div>
  </Root>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>
