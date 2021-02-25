<template>
  <button
    type="button"
    :class="[
      buttonVariant,
      { 'px-2 py-1 sm:py-2 ': !padding },
      small ? 'text-xs sm:text-sm' : 'text-sm sm:text-base ',
    ]"
    class="flex items-center justify-center rounded-md focus:outline-none"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

type Variant = 'brand' | 'brand25' | 'brand15' | 'inherit'
const props = defineProps<{
  variant: Variant
  padding?: boolean
  small?: boolean
}>()

const buttonVariant = computed(() => {
  const map = new Map([
    ['1', 'ring-1 ring-brand text-brand hover:bg-brand hover:text-white'],
    ['inherit', 'bg-none text-primary  hover:text-brand'],
    [
      'brand15',
      'bg-brand15 hover:bg-brand25 text-primary shadow-sm dark:shadow-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primaryBg focus:ring-brand15',
    ],
    [
      'brand25',
      'font-medium  bg-brand25 hover:bg-brand15 text-brand shadow-sm dark:shadow-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primaryBg focus:ring-brand25',
    ],
    ['disabled', 'border border-borderPrimary cursor-default'],
    [
      'brand',
      'font-medium  bg-brand text-white border-secondary shadow-sm dark:shadow-none px-4 py-2 hover:bg-brandDarker focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-brand',
    ],
  ])

  return map.get(props.variant) || ''
})
</script>
