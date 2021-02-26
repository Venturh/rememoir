<template>
  <LandingLayout>
    <div class="flex items-center justify-center w-full h-full space-x-4">
      <span class="text-4xl font-semibold"> 404 </span>
      <span class="p-2 text-xl border-l-2 text-secondary">
        {{ t('404') }}
      </span>
    </div>
  </LandingLayout>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
