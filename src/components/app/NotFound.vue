<template>
  <div>
    <div
      v-if="search === true"
      class="flex flex-col items-center justify-center"
    >
      <Icon :icon="RiSearch2Line" />
      <p>{{ t('searchEmpty') }}</p>
    </div>
    <div v-else class="">
      <p>{{ `${t('noResult:0')} ${t(target)} ${t('noResult:1')}` }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import { RiSearch2Line } from 'vue-remix-icons'

defineProps<{ target: string; search?: boolean }>()
const { t } = useI18n()
</script>
