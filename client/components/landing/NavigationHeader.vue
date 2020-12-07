<template>
  <nav
    class="flex items-center justify-between p-2 border-b border-gray-300 dark:border-gray-600"
  >
    <nuxt-link to="/" class="flex items-center md:space-x-2">
      <img
        class="w-auto h-8 sm:h-10"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="logo"
      />

      <span class="hidden md:block"> Brandname</span>
    </nuxt-link>
    <div class="flex items-center md:space-x-4">
      <Links to="/about"> {{ $t('about') }}</Links>
      <Links to="/pricing"> {{ $t('pricing') }}</Links>
      <span class="p-2"> | </span>
      <Links to="/auth/login">{{ $t('signIn') }} </Links>
      <Links class="hidden md:block" to="/auth/register">
        {{ $t('signUp') }}
      </Links>
      <ThemeToggle />
      <LocaleSwitcher />
      <!-- <button class="hidden md:block" @click="toggleTheme">Toggle Theme</button> -->
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useTheme from '@/hooks/useTheme'
export default defineComponent({
  setup() {
    const { toggleTheme } = useTheme()

    return { toggleTheme }
  },
})
</script>
