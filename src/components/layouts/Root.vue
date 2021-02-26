<template>
  <div class="text-primary bg-primary">
    <slot />
  </div>
  <div id="notification" />
</template>

<script setup lang="ts">
import useTheme from '@/hooks/useTheme'

const { theme } = useTheme()
</script>
