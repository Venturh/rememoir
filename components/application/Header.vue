<template>
  <div>
    <div class="flex items-center justify-between space-x-2 lg:space-x-0">
      <div class="w-full space-x-6 lg:w-screen lg:max-w-lg">
        <HeaderSearch v-if="search === true" />
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
        variant="1"
        padding
        class="p-2 lg:ml-6 lg:px-4 lg:space-x-2 lg:w-80"
        @click="search = 'entry'"
      >
        <span class="hidden sm:block">{{ search ? 'Add' : 'Remove' }} </span>
        <XIcon v-if="search === false" class="fill-current" size="1.5x" />
        <PlusIcon v-else class="fill-current" size="1.5x" />
      </Button>
    </div>
    <div class="h-0.5 mt-2 rounded-full w-full bg-borderPrimary" />
  </div>
</template>

<script lang="ts">
import { HeaderInputType } from '@/types'
import { useAddDb } from '@/hooks'

import {
  computed,
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
    const inputType = ref<HeaderInputType>('search')
    const headerAdd = ref()
    const { $db } = useContext().app
    const { loading, execute, result } = useAddDb({
      db: $db,
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
    }: {
      data: string
      description: string
    }) {
      await execute({ target: inputType.value, data, description })
      inputType.value = 'search'
    }

    function hotkeyListener(event: KeyboardEvent) {
      if (event.key === 'e' && event.ctrlKey) {
        event.preventDefault()
        setInputType('entry')
        if (headerAdd.value) headerAdd.value.$refs.inputRef.$el.focus()
      } else if (event.key === 'l' && event.ctrlKey) {
        event.preventDefault()
        setInputType('list')
        if (headerAdd.value) headerAdd.value.$refs.inputRef.$el.focus()
      } else if (event.key === 'k' && event.ctrlKey) {
        event.preventDefault()
        inputType.value = 'search'
      }
    }

    window.addEventListener('keydown', hotkeyListener)
    onUnmounted(() => {
      window.removeEventListener('keydown', hotkeyListener)
    })

    return {
      input,
      inputType,
      setInputType,
      handleInputAction,
      search,
      headerAdd,
      loading,
      result,
    }
  },
})
</script>
