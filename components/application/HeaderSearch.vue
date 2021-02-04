<template>
  <button class="flex items-center justify-between w-full mt-1 space-x-4">
    <div class="flex items-center space-x-4">
      <SearchIcon size="1.25x" class="stroke-current text-brand" />
      <span class="text-secondary">{{ $t('searchPlaceholder') }}</span>
    </div>
    <div class="items-center hidden space-x-2 pointer-events-none sm:flex">
      <Label variant="brand25">Ctrl K</Label>
      <Label variant="brand25">Ctrl E</Label>
      <Label variant="brand25">Ctrl L</Label>
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { SearchIcon } from 'vue-feather-icons'

export default defineComponent({
  components: {
    SearchIcon,
  },
})
</script>
