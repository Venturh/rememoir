<template>
  <nav class="bg-secondary">
    <div class="px-2 mx-auto sm:px-6 lg:px-8 max-w-xsm lg:max-w-5xl">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <button
            type="button"
            class="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
            @click="open = !open"
          >
            <span class="sr-only">Open main menu</span>
            <Icon :icon="open ? RiCloseLine : RiMenuLine" />
          </button>
        </div>
        <router-link to="/">
          <img
            class="hidden w-auto h-8 lg:block"
            src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
            alt="Workflow"
          />
        </router-link>

        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <div class="ml-6">
            <div class="flex space-x-3">
              <div class="hidden space-x-3 sm:flex">
                <Links class="block px-3 py-2" to="/about">
                  {{ t('about') }}
                </Links>
                <Links class="block px-3 py-2" to="/pricing">
                  {{ t('pricing') }}
                </Links>
                <span class="block py-1.5 text-xl font-medium">|</span>
              </div>
              <div v-if="!isAuth" class="flex space-x-3">
                <Links class="block px-3 py-2" to="/auth/login">
                  {{ t('signIn') }}
                </Links>
                <Links class="block px-3 py-2" to="/auth/register">
                  {{ t('signUp') }}
                </Links>
              </div>
              <Links v-else class="block px-3 py-2" to="/home">
                {{ t('continue') }}
              </Links>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div v-if="open" id="mobile-menu" class="sm:hidden">
      <div class="flex flex-col px-2 pt-2 pb-3 space-y-1">
        <Links class="block px-3 py-2" to="/about"> {{ t('about') }}</Links>
        <Links class="block px-3 py-2" to="/pricing"> {{ t('pricing') }}</Links>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { RiMenuLine, RiCloseLine } from 'vue-remix-icons'
import { getAccessToken } from '@/utils/auth'

const open = ref(false)
const { t } = useI18n()

const isAuth = computed(() => {
  return getAccessToken()
})
</script>
