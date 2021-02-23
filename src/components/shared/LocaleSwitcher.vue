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
    <div v-else>
      <SelectMenu
        :options="avaibleLanguages"
        :selected="avaibleLanguages[0]"
        display
        @selected="changeLocale"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import { RiEarthLine } from 'vue-remix-icons'
import dayjs from 'dayjs'
import type { MenuOptionItem } from '@/types'

defineProps<{ menu?: boolean }>()

const { locale } = useI18n({ useScope: 'global' })
const open = ref(false)

const avaibleLanguages = computed(() => {
  return [
    { text: 'English', info: 'en', icon: null },
    { text: 'Deutsch', info: 'de', icon: null },
  ]
}) as any

function changeLocale({ info }: MenuOptionItem) {
  console.log('changeLocale ~ code', info)
  dayjs.locale(info)
  locale.value = info
}

function handleClickOutside() {
  open.value = false
}
</script>
