<template>
  <nav class="relative">
    <div class="absolute bottom-0 w-full h-0.5 bg-borderPrimary" />
    <div class="relative flex items-center w-full sm:w-1/2">
      <button
        v-for="(item, index) in items"
        :key="item"
        class="inline-flex items-center py-2 mr-4 space-x-1 text-sm font-medium border-b-2 focus:outline-none text-primary group"
        :class="
          selected === index
            ? 'border-brand'
            : 'border-transparent hover:text-brand hover:border-brand15'
        "
        @click="setSelected(index)"
      >
        <span>{{ t(item) }}</span>
        <Label v-if="amount" small :rounded="false" variant="brand25">
          {{ amount[index] }}
        </Label>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, defineEmit, defineProps } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps<{ items: string[]; amount?: string[] }>()
const emit = defineEmit(['selected'])

const { t } = useI18n({ useScope: 'global' })
const selected = ref(0)

function setSelected(val: number) {
  selected.value = val
  emit('selected', val)
}
</script>
