<template>
  <Modal v-model="show" name="search">
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
            @keydown.down.prevent="keydown(true)"
            @keydown.up.prevent="keydown(false)"
            @keydown.enter.prevent="getLink()"
          />
          <div class="absolute inset-y-0 right-0 flex items-center pr-3">
            <Button
              class="px-2 py-1"
              variant="brand25"
              padding
              small
              @click="show = false"
            >
              esc
            </Button>
          </div>
        </div>
      </div>
    </template>
    <div v-if="results.length > 0" ref="resultsRef" class="w-full space-y-2">
      <router-link
        v-for="(result, index) in results"
        :key="result.item.id"
        :to="getLink(result.item)"
        class="flex items-center p-2 space-x-3 rounded-md"
        :class="selectedItem === index ? 'bg-brand25' : 'bg-secondary'"
        @mouseover="selectedItem = index"
      >
        <Icon :icon="result.item.entries ? RiListCheck : RiLayoutColumnLine" />
        <span class="text-lg">{{ result.item.title }}</span>
        <span class="truncate">{{ result.item.description }}</span>
      </router-link>
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
import { useAvaibleLists, useQueryEntries } from '@/hooks'

const props = defineProps({ showModal: Boolean })

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
const resultsRef = ref<HTMLDivElement>()
const selectedItem = ref(0)

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
}

function keydown(down: boolean) {
  if (selectedItem.value > 0 && !down) selectedItem.value -= 1
  else if (selectedItem.value < results.value.length && down)
    selectedItem.value += 1

  resultsRef.value?.children[selectedItem.value].scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'start',
  })
}

function getLink(item?: any) {
  if (item) return `/${item.entries ? 'lists' : 'entries'}/${item.id}`
  const selected = results.value[selectedItem.value]
  console.log('getLink ~ it', selected.item)
  console.log('getLink ~ selectedItem.value', selectedItem.value)
  show.value = false
  push(`/${selected.item.entries ? 'lists' : 'entries'}/${selected.item.id}`)
}
</script>
