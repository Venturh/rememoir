<template>
  <nuxt-link
    class="relative z-10 flex items-center cursor-pointer"
    :class="expanded ? 'justify-between px-2 md:px-4' : 'justify-center'"
    :to="localePath(`/${item.name}`)"
  >
    <div
      class="flex space-x-2"
      :class="expanded ? ' w-11/12' : 'w-full justify-center'"
      @click="$emit('click')"
    >
      <component
        :is="item.icon"
        :class="{ 'text-brand stroke-current': active }"
      />
      <span :class="expanded ? 'block' : 'hidden'">{{ $t(item.name) }}</span>
    </div>

    <div :class="expanded ? 'block' : 'hidden'" @click="open = !open">
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
    active: {
      type: Boolean,
      default: false,
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
