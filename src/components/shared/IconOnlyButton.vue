<template>
  <ButtonOrLink
    class="inline-flex items-center justify-center rounded-md fill-current text-secondary focus:outline-none focus:ring-1 focus:ring-brand25"
    :class="[variants, { 'rounded-full': rounded }]"
    :to="to"
    :out="out"
  >
    <slot />
  </ButtonOrLink>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

type Variants = 'primary' | 'secondary'

const props = defineProps<{
  to?: string
  out?: boolean
  variant?: Variants
  rounded?: boolean
}>()

const variants = computed(() => {
  const allVariants = new Map<Variants, string>([
    ['primary', 'hover:bg-brand25 p-1  hover:text-brand'],
  ])
  return (
    allVariants.get(props.variant as Variants) ||
    'hover:text-brand  focus:ring-2 focus:ring-inset focus:ring-brand'
  )
})
</script>
