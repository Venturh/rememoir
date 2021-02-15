<template>
  <nav
    class="flex items-center justify-between p-2 border-b border-gray-300 dark:border-gray-600"
  >
    <router-link to="/" class="flex items-center lg:space-x-2">
      <img
        class="w-auto h-8 sm:h-10"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="logo"
      />

      <span class="hidden lg:block"> Brandname</span>
    </router-link>
    <div class="flex items-center lg:space-x-4">
      <Links to="/about"> {{ t('about') }}</Links>
      <Links to="/pricing"> {{ t('pricing') }}</Links>
      <span class="p-2"> | </span>
      <Links to="/auth/login">{{ t('signIn') }} </Links>
      <Links class="hidden lg:block" to="/auth/register">
        {{ t('signUp') }}
      </Links>
      <ThemeToggle />
      <LocaleSwitcher />
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useTheme from '../../hooks/useTheme'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  setup() {
    const { t } = useI18n()
    const { toggleTheme } = useTheme()

    return { t, toggleTheme }
  },
})
</script>
