<template>
  <div
    v-if="
      contentPreview.type.includes('music') ||
      contentPreview.type.includes('video')
    "
  >
    <div v-if="!play" class="relative">
      <img :src="contentPreview.ogImageUrl" alt="previewImage" :class="size" />
      <PlayOverlay :content-url="contentUrl" @play="$emit('play')" />
    </div>
    <iframe
      v-else
      :class="size"
      :src="
        contentPreview.ogVideoUrl
          ? contentPreview.ogVideoUrl + '?autoplay=1'
          : contentPreview.embeddedUrl
      "
      sandbox="allow-same-origin allow-scripts"
    />
  </div>
  <div v-else>
    <ButtonOrLink out :to="contentUrl">
      <img :src="contentPreview.ogImageUrl" alt="previewImage" :class="size" />
    </ButtonOrLink>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { ContentPreview } from '@/generated/graphql'

export default defineComponent({
  props: {
    play: {
      type: Boolean,
      default: false,
    },
    contentUrl: {
      type: String,
      default: '',
    },
    contentPreview: {
      type: Object as PropType<ContentPreview>,
      default: () => {},
    },
  },
  setup(props) {
    const size = computed(() => {
      const map = new Map([
        [
          'video.other',
          'object-conatain object-left w-screen max-w-full max-w-full h-48',
        ],
        [
          'music.song',
          'object-contain bg-brand25 rounded-md object-left w-screen max-w-full h-20',
        ],
        [
          'undefined',
          'object-contain object-left w-screen max-w-full max-w-full h-48',
        ],
        ['website', 'object-cover w-screen max-w-full max-w-full h-48'],
      ])

      return (
        map.get(props.contentPreview.type) || 'object-cover max-w-full h-20'
      )
    })
    return { size }
  },
})
</script>
