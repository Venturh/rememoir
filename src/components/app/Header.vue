<template>
  <div>
    <div
      class="flex items-center justify-between h-16 pb-2 space-x-2 border-b border-borderPrimary lg:space-x-0"
    >
      <div class="w-full space-x-6 lg:w-screen lg:max-w-lg">
        <HeaderSearch
          v-if="search === true"
          v-model:showModal="showSearchModal"
          @keyAction="hotkey"
        />
        <HeaderAdd
          v-else
          ref="headerAdd"
          v-model="input"
          :input-type="inputType"
          :loading="loading"
          @cancel="search = true"
          @action="handleInputAction"
          @inputTypeChange="setInputType"
        />
      </div>

      <Button
        variant="brand25"
        padding
        class="p-2.5 lg:ml-6 lg:px-4 lg:space-x-2"
        @click="search = false"
      >
        <span class="hidden sm:block"
          >{{ search ? t('add') : t('cancel') }}
        </span>
        <Icon v-if="search === false" :icon="RiCloseLine" />
        <Icon v-else :icon="RiAddLine" />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import { RiCloseLine, RiAddLine } from 'vue-remix-icons'

import { useAddDb } from '@/hooks'
import { getDb } from '@/db/Database'

import type { HeaderInputType } from '@/types'
import { useI18n } from 'vue-i18n'

const db = getDb()

const { loading, execute } = useAddDb({
  db,
})
const { t } = useI18n()

const input = ref('')
const inputType = ref<HeaderInputType>('search')
const headerAdd = ref()
const showSearchModal = ref(false)

const search = computed({
  get: () => inputType.value === 'search',
  set: () => {
    inputType.value = inputType.value === 'search' ? 'entry' : 'search'
  },
})

function setInputType(type: HeaderInputType) {
  inputType.value = type
}

async function handleInputAction({
  data,
  description,
  date,
  listId,
}: {
  data: string
  description: string
  date: string
  listId: string
}) {
  await execute({
    target: inputType.value,
    data,
    description,
    date,
    listId,
  })
  console.log('yep')

  inputType.value = 'search'
}

function hotkeyListener(event: KeyboardEvent) {
  if (event.key === 'e' && event.ctrlKey) {
    showSearchModal.value = false
    event.preventDefault()
    setInputType('entry')
    if (headerAdd.value) {
      headerAdd.value.$refs.inputRef.$el.focus()
    }
  } else if (event.key === 'l' && event.ctrlKey) {
    showSearchModal.value = false
    event.preventDefault()
    setInputType('list')
    if (headerAdd.value) headerAdd.value.$refs.inputRef.$el.focus()
  } else if (event.key === 'k' && event.ctrlKey) {
    showSearchModal.value = false
    event.preventDefault()
    setInputType('search')
    showSearchModal.value = true
  }
}
function hotkey(key: string) {
  if (key === 'e') {
    setInputType('entry')
    if (headerAdd.value) headerAdd.value.$refs.inputRef.$el.focus()
  } else if (key === 'l') {
    setInputType('list')
    if (headerAdd.value) headerAdd.value.$refs.inputRef.$el.focus()
  } else {
    showSearchModal.value = true
  }
}

window.addEventListener('keydown', hotkeyListener)
onUnmounted(() => {
  window.removeEventListener('keydown', hotkeyListener)
})
</script>
