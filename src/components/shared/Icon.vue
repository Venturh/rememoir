<template>
  <component
    :is="icon"
    v-if="icon"
    :class="[sizes, colors]"
    class="flex-shrink-0 fill-current"
  />
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

type Size = 'xs' | 'sm' | 'md' | 'lg'
type Color = 'brand' | 'primary' | 'secondary' | 'error' | 'success'

const props = defineProps<{
  icon: Object
  size?: Size
  color?: Color
  rotate?: boolean
}>()

const sizes = computed(() => {
  const map = new Map<Size, string>([
    ['xs', 'h-3'],
    ['sm', 'h-4'],
    ['md', 'h-5'],
    ['lg', 'h-6'],
  ])
  return map.get(props.size || 'md')
})
const colors = computed(() => {
  const map = new Map<Color, string>([
    ['primary', 'text-primary'],
    ['secondary', 'text-secondary'],
    ['brand', 'text-brand'],
    ['error', 'text-error'],
    ['success', 'text-success'],
  ])
  return props.color ? map.get(props.color) : ''
})
</script>
