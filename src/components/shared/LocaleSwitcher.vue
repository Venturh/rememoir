<template>
  <div>
    <div v-if="!menu" class="relative">
      <div
        class="flex items-center space-x-2 cursor-pointer"
        @click="open = !open"
      >
        <Icon :icon="RiEarthLine" />
        <span>{{ locale.toLocaleUpperCase() }}</span>
      </div>
      <div
        class="absolute right-0 flex-col p-2 space-y-2 text-center rounded-lg top-11 lg:top-12 lg:right-0 bg-secondary ring-1 ring-borderPrimary"
        :class="!open ? 'hidden' : 'flex '"
      >
        <div
          v-for="locale in avaibleLanguages"
          :key="locale.text"
          class="flex items-center p-1 space-x-1 rounded-md cursor-pointer text-primary hover:text-brand"
          @click="open = false"
        >
          <ButtonOrLink @click="changeLocale(locale)">
            {{ locale.text }}
          </ButtonOrLink>
        </div>
      </div>
    </div>
    <button v-else @click.stop="open = !open">
      <SelectMenu
        v-model:open="open"
        :options="avaibleLanguages"
        :selected="selected"
        display
        @selected="changeLocale"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import { RiEarthLine } from 'vue-remix-icons'
import dayjs from 'dayjs'

import type { MenuOptionItem } from '@/types'
import { updateDateLocales } from '@/utils/date'

defineProps<{ menu?: boolean }>()

const { locale } = useI18n({ useScope: 'global' })
const open = ref(false)

const avaibleLanguages = computed(() => {
  return [
    { text: 'English', info: 'en', icon: null },
    { text: 'Deutsch', info: 'de', icon: null },
  ]
})
const selected = computed(() => {
  return {
    text: locale.value === 'de' ? 'Deutsch' : 'English',
    info: locale.value,
    icon: null,
  }
})

function changeLocale({ info }: MenuOptionItem) {
  localStorage.setItem('locale', info!)
  dayjs.locale(info)
  updateDateLocales(info!)
  locale.value = info!
}
</script>
