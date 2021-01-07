<template>
  <nuxt-link
    active-class="bg-brand25 text-primary hover:bg-brand25"
    class="relative z-10 flex items-center justify-between p-4 rounded-lg cursor-pointer sidebarlink hover:bg-secondary"
    :to="localePath(`/${item.name}`)"
  >
    <div class="flex space-x-4" @click="$emit('click')">
      <component :is="item.icon" />
      <span>{{ $t(item.name) }}</span>
    </div>

    <div @click="open = !open">
      <ChevronDownIcon v-if="!open" size="1.1x" />
      <ChevronUpIcon v-else size="1.1x" />
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { PlusIcon, ChevronDownIcon, ChevronUpIcon } from 'vue-feather-icons'

export default defineComponent({
  components: {
    PlusIcon,
    ChevronDownIcon,
    ChevronUpIcon,
  },

  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    const open = ref(false)

    return { open }
  },
})
</script>
