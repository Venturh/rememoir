<template>
  <router-link
    active-class="text-brand hover:bg-transparent"
    class="flex items-center justify-center p-2 rounded-lg cursor-pointer md:p-4 lg:justify-start hover:bg-brand25"
    :to="`/${item.text}`"
  >
    <div class="flex space-x-4" @click="$emit('click')">
      <Icon size="lg" :icon="item.icon" />
      <span class="hidden lg:block">{{ t(item.text) }}</span>
    </div>
  </router-link>
</template>

<script lang="ts">
import { MenuOptionItem } from '@/types'
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'

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
  setup() {
    const { t } = useI18n()
    return { t }
  },
})
</script>
