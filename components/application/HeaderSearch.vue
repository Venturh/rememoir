<template>
  <div class="flex items-center justify-between w-full mt-1 space-x-4">
    <div class="flex items-center space-x-4">
      <SearchIcon size="1.25x" class="stroke-current text-brand" />
      <span class="text-secondary">{{ $t('searchPlaceholder') }}</span>
    </div>
    <div class="items-center hidden space-x-2 sm:flex">
      <Button
        v-for="button in buttons"
        :key="button"
        class="px-2 py-1"
        variant="brand25"
        padding
        small
        @click="$emit('keyAction', button)"
      >
        Ctrl {{ button.toUpperCase() }}
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { SearchIcon } from 'vue-feather-icons'

export default defineComponent({
  components: {
    SearchIcon,
  },

  setup() {
    const buttons = ['k', 'e', 'l']
    return { buttons }
  },
})
</script>
