<template>
  <nav class="relative">
    <div
      class="absolute bottom-0 hidden sm:block w-full h-0.5 bg-borderPrimary"
    />
    <div class="relative flex items-center w-full sm:w-1/2">
      <nuxt-link
        v-for="(item, index) in tabnavItems"
        :key="item.text"
        class="flex items-center justify-center w-1/2 px-3 py-2.5 space-x-2 sm:justify-start"
        :class="selected === item.text ? '' : 'hover:text-brand'"
        :to="localePath(`/home/${item.text}`)"
      >
        <component :is="item.icon" class="flex-shrink-0" size="1.25x" />
        <span class="text-sm sm:text-base">{{ $t(item.text) }}</span>
        <div class="px-1 py-0.5 text-xs sm:text-sm rounded-sm bg-brand25">
          {{ amount[index] }}
        </div>
      </nuxt-link>

      <div
        class="absolute bottom-0 w-1/2 h-0.5 bg-brand"
        :class="selected === 'lists' ? 'right-0' : 'left-0'"
      />
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import { tabnavItems } from '@/config/data'

export default defineComponent({
  props: {
    amount: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const { params } = useContext().route.value
    const selected = ref(params.type ?? 'entries')

    return { selected, tabnavItems }
  },
})
</script>
