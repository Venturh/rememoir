<template>
  <html>
    <div class="min-h-screen bg-primary text-primary">
      <Nuxt />
    </div>
  </html>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useTheme from '@/utils/useTheme'

export default defineComponent({
  setup() {
    const { theme } = useTheme()

    return { theme }
  },
})
</script>
