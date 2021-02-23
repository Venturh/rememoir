<template>
  <div v-if="toggle">
    <button
      type="button"
      class="relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 rounded-full cursor-pointer border-borderPrimary bg-secondary w-11 focus:outline-none focus:ring-2 focus:ring-brand"
      aria-pressed="false"
      @click="toggle"
    >
      <span class="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        class="inline-block w-5 h-5 transition duration-200 ease-in-out transform translate-x-0 rounded-full shadow pointer-events-none bg-brand ring-0"
        :class="enabled ? 'translate-x-5' : 'translate-x-0'"
      ></span>
    </button>
  </div>
  <div v-else>
    <div class="cursor-pointer" @click="toggleTheme">
      <Icon v-if="theme === 'dark'" :icon="RiSunLine" />
      <Icon v-else :icon="RiMoonLine" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { RiSunLine, RiMoonLine } from 'vue-remix-icons'
import useTheme from '@/hooks/useTheme'

defineProps<{ toggle?: boolean }>()
const { theme, toggleTheme } = useTheme()
const enabled = ref(theme.value === 'dark')
function toggle() {
  enabled.value = !enabled.value
  toggleTheme()
}
</script>
