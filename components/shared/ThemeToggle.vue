<template>
  <div class="cursor-pointer" @click="toggleTheme">
    <SunIcon v-if="theme === 'dark'" />
    <MoonIcon v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { SunIcon, MoonIcon } from 'vue-feather-icons'
import useTheme from '~/hooks/useTheme'

export default defineComponent({
  components: {
    SunIcon,
    MoonIcon,
  },
  setup() {
    const { theme, toggleTheme } = useTheme()

    return { theme, toggleTheme }
  },
})
</script>
