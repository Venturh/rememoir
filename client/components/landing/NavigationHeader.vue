<template>
  <nav class="flex items-center justify-between px-8 py-4 bg-secondary">
    <nuxt-link to="/" class="flex items-center space-x-2">
      <img
        class="w-auto h-8 sm:h-10"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="logo"
      />

      <span class=""> Brandname</span>
    </nuxt-link>
    <div class="flex space-x-4">
      <Links to="/about"> About</Links>
      <Links to="/pricing"> Pricing</Links>
      <span class="p-2"> | </span>
      <Links to="/login"> Log in </Links>
      <Links to="/register">Sign up</Links>
      <button class="" @click="toggleTheme">Toggle Theme</button>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useTheme from '@/utils/useTheme'
export default defineComponent({
  setup() {
    const { toggleTheme } = useTheme()

    return { toggleTheme }
  },
})
</script>
