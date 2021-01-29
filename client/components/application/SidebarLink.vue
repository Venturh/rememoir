<template>
  <nuxt-link
    active-class="text-brand md:bg-secondary"
    class="flex items-center justify-center p-2 rounded-lg cursor-pointer md:p-4 lg:justify-start hover:bg-secondary"
    :to="localePath(`/${item.text}`)"
  >
    <div class="flex space-x-4" @click="$emit('click')">
      <component :is="item.icon" />
      <span class="hidden lg:block">{{ $t(item.text) }}</span>
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import { MenuOptionItem } from '@/types'
import { defineComponent, PropType } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<MenuOptionItem>,
      default: () => {},
    },
    expanded: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
