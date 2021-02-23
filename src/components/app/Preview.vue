<template>
  <div v-if="preview.type.includes('music') || preview.type.includes('video')">
    <div v-if="!play" class="relative">
      <img
        v-if="preview.ogImageUrl"
        class="w-screen max-w-full rounded-md"
        :class="size"
        :src="preview.ogImageUrl"
        alt="previewImage"
      />
      <PlayOverlay :url="url" @play="play = true" />
    </div>
    <div v-else>
      <iframe
        v-if="preview.embeddedUrl"
        class="w-screen max-w-full rounded-md"
        :class="size"
        :src="preview.embeddedUrl"
        sandbox="allow-same-origin allow-scripts"
      />
    </div>
  </div>
  <div v-else>
    <ButtonOrLink out :to="url">
      <img
        v-if="imageLoaded && preview.ogImageUrl"
        class="w-screen max-w-full rounded-md"
        :class="size"
        :src="preview.ogImageUrl"
        alt="previewImage"
        @error="imageLoaded = false"
      />
    </ButtonOrLink>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, ref } from 'vue'
import type { ContentPreview } from '@/generated/graphql'

const props = defineProps<{ url: string; preview: ContentPreview }>()

const imageLoaded = ref(true)
const play = ref(false)

const size = computed(() => {
  const map = new Map([
    ['video.other', 'object-cover h-36 md:h-48'],
    ['music.song', 'object-contain bg-brand25  object-left h-20'],
    ['undefined', 'object-contain bg-brand15  h-48'],
  ])

  return map.get(props.preview.type) || 'object-cover h-48'
})
</script>
