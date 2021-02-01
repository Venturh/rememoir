<template>
  <div v-if="preview.type.includes('music') || preview.type.includes('video')">
    <div v-if="!play" class="relative">
      <img
        class="w-screen max-w-full rounded-md"
        :class="size"
        :src="preview.ogImageUrl"
        alt="previewImage"
      />
      <PlayOverlay :url="url" @play="play = true" />
    </div>
    <iframe
      v-else
      class="w-screen max-w-full rounded-md"
      :class="size"
      :src="
        preview.ogVideoUrl
          ? preview.ogVideoUrl + '?autoplay=1'
          : preview.embeddedUrl
      "
      sandbox="allow-same-origin allow-scripts"
    />
  </div>
  <div v-else>
    <ButtonOrLink out :to="url">
      <img
        v-if="imageLoaded"
        class="w-screen max-w-full rounded-md"
        :class="size"
        :src="preview.ogImageUrl"
        alt="previewImage"
        @error="imageLoaded = false"
      />
    </ButtonOrLink>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  ref,
} from '@nuxtjs/composition-api'
import { ContentPreview } from '@/generated/graphql'

export default defineComponent({
  props: {
    url: {
      type: String,
      default: '',
    },
    preview: {
      type: Object as PropType<ContentPreview>,
      default: () => {},
    },
  },
  setup(props) {
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
    return { play, size, imageLoaded }
  },
})
</script>
