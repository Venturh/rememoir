<template>
  <div class="relative w-full mt-1 rounded-md shadow-sm">
    <div
      class="absolute inset-y-0 left-0 flex items-center pointer-events-none sm:pl-3"
    >
      <SearchIcon
        size="1.25x"
        class="ml-2 stroke-current bg-secondary text-brand"
      />
    </div>
    <div>
      <input
        type="text"
        name="input"
        class="block w-full border-none rounded-lg outline-none pl-9 sm:pl-14 bg-secondary focus:ring focus:ring-brand"
        :placeholder="placeholder"
        @keydown.exact.enter.prevent="$emit('action', input)"
      />
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
  props: {
    placeholder: {
      type: String,
      default: '',
    },
  },
})
</script>
