<template>
  <LandingLayout>
    <div class="pt-24 m-auto space-y-4 lg:max-w-sm">
      <div
        class="flex flex-col w-full p-3 space-y-3 rounded-md shadow-sm dark:shadow-none bg-secondary ring-1 ring-borderPrimary"
      >
        <div class="space-y-2">
          <h1 class="text-5xl font-semibold">{{ t(`${title}`) }}.</h1>
          <h2 class="text-2xl text-secondary">{{ t(`${subtitle}`) }}</h2>
        </div>
        <slot />
      </div>
      <div
        v-if="type"
        class="flex w-full p-3 space-x-2 rounded-md shadow-sm dark:shadow-none bg-secondary ring-1 ring-borderPrimary"
      >
        <span>{{ type === 'login' ? t('loginSub') : t('registerSub') }}</span>
        <Links v-if="type === 'login'" to="/auth/register">
          {{ t('signUp') }}
        </Links>
        <Links v-else to="/auth/register">{{ t('signIn') }}</Links>
      </div>
    </div>
  </LandingLayout>
  <Teleport to="#notification">
    <Notification :notification="notification" />
  </Teleport>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Notification } from '@/types'

defineProps<{
  title: string
  subtitle: string
  type?: 'login' | 'register'
  notification?: Notification
}>()
const { t } = useI18n()
</script>
