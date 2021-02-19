<template>
  <div class="flex space-x-2">
    <Label
      v-for="item in items.slice(0, showAbleAmount)"
      :key="item"
      class="flex-shrink-0"
      small
    >
      {{ item }}
    </Label>
    <Tooltip :disabled="!tooltip">
      <Label v-if="items.length > showAbleAmount" class="flex-shrink-0" small>
        +{{ items.length - showAbleAmount }}
      </Label>
      <template #content>
        <p
          v-for="category in items.slice(showAbleAmount)"
          :key="category"
          class="text-sm"
        >
          {{ category }}
        </p>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  items: Array<string>
  amount?: number
  tooltip: boolean
}>()
const showAbleAmount = props.amount || 2
</script>
