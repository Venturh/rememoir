<template>
  <div class="flex items-center justify-between space-x-2 md:space-x-0">
    <div class="mt-1.5 lg:hidden">
      <IconOnlyButton @click="$emit('sidebartoggle')">
        <MenuIcon class="stroke-current text-brand" />
      </IconOnlyButton>
    </div>
    <HeaderSearch
      v-if="inputType === 'search'"
      class="sm:max-w-md md:max-w-lg lg:max-w-xl"
      :placeholder="$t('searchPlaceholder')"
    />
    <HeaderAdd
      v-else
      v-model="input"
      :placeholder="$t('addNewEntry')"
      class="sm:max-w-md md:max-w-lg lg:max-w-xl"
      @cancel="inputType = 'search'"
      @action="addEntry"
    />
    <ButtonOrLink
      class="flex items-center h-full p-2 space-x-2 rounded-lg bg-secondary"
      @click="inputType = 'addEntry'"
    >
      <PlusIcon class="fill-current text-brand" size="1.5x" />
      <span class="hidden lg:block">Add Entry</span>
    </ButtonOrLink>
  </div>
</template>

<script lang="ts">
import { add } from '@/db/entry'

import {
  defineComponent,
  onUnmounted,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
import { MenuIcon, PlusIcon } from 'vue-feather-icons'
export default defineComponent({
  components: {
    MenuIcon,
    PlusIcon,
  },
  setup() {
    const input = ref('')
    const inputType = ref('search')
    const { $db } = useContext().app

    async function addEntry(data: string) {
      await add(data, $db)
      inputType.value = 'search'
      input.value = ''
    }

    function cancel() {
      inputType.value = 'search'
    }

    function hotkeyListener(event: KeyboardEvent) {
      if (event.key === 'i' && event.ctrlKey) {
        inputType.value = 'addEntry'
      } else if (event.key === 'k' && event.ctrlKey) {
        event.preventDefault()
        inputType.value = 'search'
      }
    }

    window.addEventListener('keydown', hotkeyListener)
    onUnmounted(() => {
      window.removeEventListener('keydown', hotkeyListener)
    })

    return { input, addEntry, inputType, cancel }
  },
})
</script>
