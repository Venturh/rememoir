<template>
  <router-link to="/">
    <img :class="props.class" :src="`/icons/logo_${image}.png`" alt="logo" />
  </router-link>
</template>

<script setup lang="ts">
import { useTheme } from '@/hooks'
import { computed, defineProps } from 'vue'

const props = defineProps<{
  small?: boolean
  class: string
}>()

const { theme } = useTheme()

const image = computed(() => {
  if (theme.value === 'dark') {
    if (props.small) return 'dark'
    else return 'text_dark'
  } else {
    if (props.small) return 'light'
    else return 'text_light'
  }
})
</script>
