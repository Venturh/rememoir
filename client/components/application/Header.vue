<template>
  <div class="flex items-center justify-between space-x-2 lg:space-x-0">
    <div class="mt-1.5 lg:hidden">
      <IconOnlyButton @click="$emit('sidebartoggle')">
        <MenuIcon class="stroke-current text-brand" />
      </IconOnlyButton>
    </div>
    <div class="w-screen lg:max-w-lg">
      <HeaderSearch
        v-if="search === true"
        :placeholder="$t('searchPlaceholder')"
      />
      <HeaderAdd
        v-else
        ref="headerAdd"
        v-model="input"
        :placeholder="$t('addNewEntry')"
        @cancel="search = true"
        @action="addEntry"
      />
    </div>
    <Button
      variant="1"
      padding
      class="p-2 lg:ml-6 lg:px-4 lg:space-x-2 lg:w-80"
      @click="search = !search"
    >
      <span class="hidden sm:block">{{ search ? 'Add' : 'Remove' }} </span>
      <XIcon v-if="search === false" class="fill-current" size="1.5x" />
      <PlusIcon v-else class="fill-current" size="1.5x" />
    </Button>
  </div>
</template>

<script lang="ts">
import { add } from '@/db/entry'
import { handleAdd } from '@/utils/add'

import {
  defineComponent,
  onUnmounted,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
import { MenuIcon, PlusIcon, XIcon } from 'vue-feather-icons'
export default defineComponent({
  components: {
    MenuIcon,
    PlusIcon,
    XIcon,
  },
  setup() {
    const input = ref('')
    const search = ref(true)
    const headerAdd = ref()
    const { $db } = useContext().app

    function addEntry(data: string) {
      // await add(data, $db)
      handleAdd(data, $db)
      search.value = true
      input.value = ''
    }

    function hotkeyListener(event: KeyboardEvent) {
      if (event.key === 'i' && event.ctrlKey) {
        search.value = false
        if (headerAdd.value) headerAdd.value.$refs.inputRef.$el.focus()
      } else if (event.key === 'k' && event.ctrlKey) {
        event.preventDefault()
        search.value = true
      }
    }

    window.addEventListener('keydown', hotkeyListener)
    onUnmounted(() => {
      window.removeEventListener('keydown', hotkeyListener)
    })

    return { input, addEntry, search, headerAdd }
  },
})
</script>
