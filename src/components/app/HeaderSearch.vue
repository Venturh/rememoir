<template>
  <div
    class="flex items-center justify-between w-full p-2 mt-1 space-x-4 border rounded-md bg-secondary border-borderPrimary"
  >
    <div class="flex items-center space-x-4">
      <font-awesome-icon icon="search" class="stroke-current text-brand" />
      <span class="text-secondary">{{ t('searchPlaceholder') }}</span>
    </div>
    <div class="items-center hidden space-x-2 sm:flex">
      <Button
        v-for="button in buttons"
        :key="button"
        class="px-2 py-1"
        variant="brand25"
        padding
        small
        @click="$emit('keyAction', button)"
      >
        Ctrl {{ button.toUpperCase() }}
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  setup() {
    const { t } = useI18n()
    const buttons = ['k', 'e', 'l']
    return { t, buttons }
  },
})
</script>
