<template>
  <router-link
    active-class="text-brand hover:bg-transparent"
    class="flex items-center justify-end p-2 rounded-lg cursor-pointer md:p-4 lg:justify-start hover:bg-brand25"
    :to="`${item.info}`"
  >
    <div class="flex space-x-4" @click="$emit('click')">
      <Icon size="lg" :icon="item.icon" />
      <span :class="expanded ? 'block' : 'hidden lg:block'">{{
        t(item.text)
      }}</span>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import type { MenuOptionItem } from '@/types'

defineProps<{ item: MenuOptionItem; expanded?: boolean }>()

const { t } = useI18n()
</script>
