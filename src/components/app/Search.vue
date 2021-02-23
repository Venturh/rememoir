<template>
  <Modal v-model="show" name="search" title=" " fixed>
    <template #header>
      <div class="relative flex flex-col items-start">
        <div class="relative w-full mt-1 rounded-md">
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
          >
            <Icon color="secondary" size="sm" :icon="RiSearch2Line" />
          </div>
          <input
            ref="inputRef"
            v-model="input"
            class="w-full px-10 bg-primary focus:outline-none"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            :placeholder="t('searchPlaceholder')"
            @input="search"
            @keydown.down.prevent="keydown('down')"
            @keydown.up.prevent="keydown('up')"
            @keydown.enter.prevent="navigate()"
          />
          <div class="absolute inset-y-0 right-0 flex items-center pr-3">
            <Button
              class="px-2 py-1"
              variant="brand25"
              padding
              small
              @click="vfm.hide('search')"
            >
              esc
            </Button>
          </div>
        </div>
      </div>
    </template>
    <div v-if="results.length > 0" ref="menuRef" class="w-full space-y-2">
      <button
        v-for="(result, index) in results"
        :key="result.item.id"
        class="flex items-center justify-between w-full p-2 rounded-md"
        :class="selectedIndex === index ? 'bg-brand25' : 'bg-secondary'"
        @mouseover="setSelectedIndex(index)"
        @click="navigate()"
      >
        <div class="flex items-center w-2/3 space-x-3">
          <Icon
            :icon="result.item.entries ? RiListCheck : RiLayoutColumnLine"
          />
          <span class="text-lg">{{ result.item.title }}</span>
          <span class="hidden truncate sm:block">{{
            result.item.description
          }}</span>
        </div>
        <Labels :items="result.item.categories" :tooltip="false" />
      </button>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Fuse from 'fuse.js'
import { RiSearch2Line, RiListCheck, RiLayoutColumnLine } from 'vue-remix-icons'

import { getDb } from '@/db/Database'
import { useAvaibleLists, useMenuNavigation, useQueryEntries } from '@/hooks'

const props = defineProps<{ showModal: boolean }>()

const db = getDb()
const vfm: any = inject('$vfm')
const { t } = useI18n()
const { push } = useRouter()
const { entries } = useQueryEntries(db)
const { lists } = useAvaibleLists(db)

const input = ref('')
const results = ref<Array<any>>([])
const show = ref(props.showModal)
const inputRef = ref<HTMLInputElement>()

const {
  menuRef,
  keydown,
  selectedIndex,
  setSelectedIndex,
  setMaxLength,
} = useMenuNavigation(results.value.length)

onMounted(() => {
  //Timeout to wait after modal focus  improve this somehow
  setTimeout(() => {
    inputRef.value?.focus()
  }, 225)
})

const options = {
  threshold: 0.3,
  keys: ['title', 'description', 'categories'],
}

function search() {
  const all = [...entries.value, ...lists.value]
  const fuse = new Fuse(all, options)
  results.value = fuse.search(input.value)
  setMaxLength(results.value.length)
}

function navigate() {
  vfm.hide('search')
  const selected = results.value[selectedIndex.value]
  push(`/${selected.item.entries ? 'lists' : 'entries'}/${selected.item.id}`)
}
</script>
