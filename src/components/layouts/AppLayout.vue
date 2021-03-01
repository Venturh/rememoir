<template>
  <Root>
    <div
      class="flex min-h-screen pt-2 mx-auto max-w-xsm sm:max-w-2xl md:max-w-2xl lg:max-w-6xl"
    >
      <Sidebar />
      <div class="w-full space-y-4 sm:pl-28 lg:pl-64">
        <Header />
        <slot />
      </div>
    </div>
    <div id="notification" />
    <MobileNavigation class="sm:hidden" />
  </Root>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { updateDateLocales } from '@/utils/date'

import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

updateDateLocales(locale.value)
dayjs.locale(locale.value)
</script>
