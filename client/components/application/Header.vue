<template>
  <div class="flex items-center justify-between md:px-8">
    <div class="md:hidden">
      <IconOnlyButton @click="$emit('sidebartoggle')">
        <MenuIcon />
      </IconOnlyButton>
    </div>
    <span class="hidden text-lg font-semibold md:block">Brandname</span>

    <AddInput v-model="input" class="w-9/12 md:max-w-3xl" />
    <div class="flex items-center h-full p-2 space-x-2 rounded-lg bg-secondary">
      <PlusIcon class="fill-current text-brand" size="1.5x" />
      <span class="hidden md:block">Add Entry</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { MenuIcon, PlusIcon } from 'vue-feather-icons'
export default defineComponent({
  components: {
    MenuIcon,
    PlusIcon,
  },
  setup() {
    const input = ref('')
    return { input }
  },
})
</script>
