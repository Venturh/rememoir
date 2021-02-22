<template>
  <div class="text-primary bg-primary">
    <slot />
  </div>
</template>

<script setup lang="ts">
import useTheme from '@/hooks/useTheme'

const { theme } = useTheme()
</script>
