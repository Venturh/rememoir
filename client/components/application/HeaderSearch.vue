<template>
  <div class="relative w-full mt-1 rounded-md shadow-sm">
    <div
      class="absolute inset-y-0 flex items-center pointer-events-none left-2.5"
    >
      <SearchIcon
        size="1.25x"
        class="ml-2 stroke-current bg-secondary text-brand"
      />
    </div>
    <HeaderInput :search="true" :placeholder="$t('searchPlaceholder')" />
  </div>
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
