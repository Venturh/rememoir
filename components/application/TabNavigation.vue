<template>
  <nav class="relative">
    <div
      class="absolute bottom-0 hidden sm:block w-full h-0.5 bg-borderPrimary"
    />
    <div class="relative flex items-center w-full sm:w-1/2">
      <button
        v-for="(item, index) in tabnavItems"
        ref="linkRef"
        :key="item.text"
        class="inline-flex items-center py-2 mr-4 space-x-1 text-sm font-medium border-b-2 focus:outline-none text-primary group"
        :class="
          selected === index
            ? 'border-brand'
            : 'border-transparent hover:text-brand hover:border-brand15'
        "
        @click="setSelected(index)"
      >
        <component :is="item.icon" class="flex-shrink-0" size="1x" />
        <span>{{ $t(item.text) }}</span>
        <Label small :rounded="false" variant="brand25">
          {{ amount[index] }}
        </Label>
      </button>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { tabnavItems } from '@/config/data'

export default defineComponent({
  props: {
    amount: {
      type: Array,
      default: () => [],
    },
  },
  setup(_, { emit }) {
    const selected = ref(0)

    function setSelected(val: number) {
      selected.value = val
      emit('selected', val)
    }

    return { selected, setSelected, tabnavItems }
  },
})
</script>
