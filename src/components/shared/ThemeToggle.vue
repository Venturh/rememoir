<template>
  <div class="cursor-pointer" @click="toggleTheme">
    <Icon v-if="theme === 'dark'" :icon="RiSunLine" />
    <Icon v-else :icon="RiMoonLine" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RiSunLine, RiMoonLine } from 'vue-remix-icons'
import useTheme from '@/hooks/useTheme'

export default defineComponent({
  setup() {
    const { theme, toggleTheme } = useTheme()
    return { RiSunLine, RiMoonLine, theme, toggleTheme }
  },
})
</script>
