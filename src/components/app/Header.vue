<template>
  <div>
    <div
      class="flex items-center justify-between h-16 pb-2 space-x-2 border-b border-borderPrimary lg:space-x-0"
    >
      <div class="w-full space-x-6 lg:w-screen lg:max-w-lg">
        <HeaderSearch v-if="search === true" @keyAction="hotkey" />
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
        @click="search = 'entry'"
      >
        <span class="hidden sm:block">{{ search ? 'Add' : 'Remove' }} </span>
        <Icon v-if="search === false" :icon="RiCloseLine" />
        <Icon v-else :icon="RiAddLine" />
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { HeaderInputType } from '@/types'
import { useAddDb } from '@/hooks'

import { computed, defineComponent, onUnmounted, ref } from 'vue'
import { RiCloseLine, RiAddLine } from 'vue-remix-icons'
import { getDb } from '@/db/Database'
export default defineComponent({
  setup() {
    const input = ref('')
    const inputType = ref<HeaderInputType>('search')
    const headerAdd = ref()
    const db = getDb()
    const { loading, execute, result } = useAddDb({
      db,
    })

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
      inputType.value = 'search'
    }

    function hotkeyListener(event: KeyboardEvent) {
      if (event.key === 'e' && event.ctrlKey) {
        event.preventDefault()
        setInputType('entry')
        if (headerAdd.value) {
          headerAdd.value.$refs.inputRef.$el.focus()
        }
      } else if (event.key === 'l' && event.ctrlKey) {
        if (event.preventDefault) event.preventDefault()
        setInputType('list')
        if (headerAdd.value) headerAdd.value.$refs.inputRef.$el.focus()
      } else if (event.key === 'k' && event.ctrlKey) {
        if (event.preventDefault) event.preventDefault()
        inputType.value = 'search'
      }
    }
    function hotkey(key: string) {
      if (key === 'e') {
        setInputType('entry')
        if (headerAdd.value) headerAdd.value.$refs.inputRef.$el.focus()
      } else if (key === 'l') {
        setInputType('list')
        if (headerAdd.value) headerAdd.value.$refs.inputRef.$el.focus()
      } else if (key === 'k') {
        inputType.value = 'search'
      }
    }

    window.addEventListener('keydown', hotkeyListener)
    onUnmounted(() => {
      window.removeEventListener('keydown', hotkeyListener)
    })

    return {
      RiCloseLine,
      RiAddLine,
      input,
      inputType,
      setInputType,
      handleInputAction,
      search,
      headerAdd,
      loading,
      result,
      hotkeyListener,
      hotkey,
    }
  },
})
</script>
