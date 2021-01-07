<template>
  <div class="relative w-full mt-1 rounded-md shadow-sm">
    <div
      class="absolute inset-y-0 left-0 flex items-center pointer-events-none"
    >
      <SearchIcon
        size="1.25x"
        class="ml-2 stroke-current bg-secondary text-brand"
      />
    </div>
    <Input :placeholder="placeholder" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { SearchIcon } from 'vue-feather-icons'

export default defineComponent({
  components: {
    SearchIcon,
  },
  props: {
    placeholder: {
      type: String,
      default: '',
    },
  },
})
</script>
