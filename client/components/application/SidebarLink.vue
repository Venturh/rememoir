<template>
  <div
    class="relative z-10 flex cursor-pointer"
    :class="expanded ? 'justify-between' : 'justify-center'"
  >
    <div class="flex space-x-2" @click="$emit('click')">
      <component :is="item.icon" />
      <span :class="expanded ? 'block' : 'hidden'">{{ item.name }}</span>
    </div>

    <div :class="expanded ? 'block' : 'hidden'" @click="open = !open">
      <ChevronDownIcon v-if="!open" size="1.1x" />
      <ChevronUpIcon v-else size="1.1x" />
    </div>
  </div>
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
    expanded: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const open = ref(false)
    return { open }
  },
})
</script>
