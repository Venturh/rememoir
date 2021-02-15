<template>
  <div class="cursor-pointer" @click="toggleTheme">
    <font-awesome-icon v-if="theme === 'dark'" icon="sun" />
    <font-awesome-icon v-else icon="moon" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useTheme from '@/hooks/useTheme'

export default defineComponent({
  setup() {
    const { theme, toggleTheme } = useTheme()
    return { theme, toggleTheme }
  },
})
</script>
