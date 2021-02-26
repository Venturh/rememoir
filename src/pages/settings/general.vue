<template>
  <SettingsLayout :value="0">
    <SectionBlock
      title="general"
      description="settings:generalDescription"
      primary
    >
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <span>{{ t('darkMode') }}</span>
          <ThemeToggle toggle />
        </div>
        <div class="flex items-center justify-between">
          <span>{{ t('language') }}</span>
          <LocaleSwitcher menu />
        </div>
      </div>
    </SectionBlock>
  </SettingsLayout>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
