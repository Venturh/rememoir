<template>
  <div class="relative">
    <div
      class="flex items-center space-x-2 cursor-pointer"
      @click="open = !open"
    >
      <font-awesome-icon icon="globe-europe" />
      <span>{{ locale.toLocaleUpperCase() }}</span>
    </div>
    <div
      class="absolute right-0 flex-col justify-center p-2 space-y-2 text-center rounded-lg top-11 lg:top-12 lg:right-0 bg-secondary"
      :class="!open ? 'hidden' : 'flex '"
    >
      <div
        v-for="locale in avaibleLanguages"
        :key="locale"
        class="flex items-center px-4 space-x-1 rounded-md cursor-pointer text-primary hover:text-brand"
        @click="open = false"
      >
        <ButtonOrLink @click="changeLocale(locale)">
          {{ locale.toUpperCase() }}
        </ButtonOrLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, ComputedRef } from 'vue'

import { useI18n } from 'vue-i18n'

export default defineComponent({
  setup() {
    const { locale } = useI18n({ useScope: 'global' })
    const open = ref(false)

    const avaibleLanguages: ComputedRef<string[]> = computed(() => {
      return ['en', 'de']
    }) as any

    function changeLocale(code: string) {
      // $dayjs.locale(code)
      locale.value = code
    }

    function handleClickOutside() {
      open.value = false
    }

    return {
      locale,
      changeLocale,
      open,
      avaibleLanguages,
      handleClickOutside,
    }
  },
})
</script>
