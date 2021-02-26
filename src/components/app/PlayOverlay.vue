<template>
  <div
    class="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center w-20 h-12 m-auto space-x-2 rounded-full opacity-80 bg-primary"
  >
    <IconOnlyButton @click.stop="$emit('play')">
      <Icon :icon="RiPlayLine" />
    </IconOnlyButton>
    <IconOnlyButton out :to="url">
      <Icon :icon="RiExternalLinkLine" />
    </IconOnlyButton>
  </div>
</template>

<script setup lang="ts">
import { defineEmit, defineProps } from 'vue'
import { RiPlayLine, RiExternalLinkLine } from 'vue-remix-icons'

defineProps<{ url: string }>()
defineEmit(['play'])
</script>
