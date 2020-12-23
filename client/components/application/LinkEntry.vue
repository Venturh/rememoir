<template>
  <div class="relative px-4 space-y-2 rounded-lg">
    <p class="text-xs">{{ contentPreview.ogSiteName }}</p>
    <ButtonOrLink out :to="contentUrl">
      {{ contentPreview.ogTitle }}
    </ButtonOrLink>
    <div v-if="contentPreview.type.includes('video')">
      <div v-if="!play" class="relative">
        <img
          :src="contentPreview.ogImageUrl"
          alt="previewImage"
          class="object-cover"
        />
        <PlayOverlay :content-url="contentUrl" @play="play = true" />
      </div>
      <iframe
        v-if="play"
        class="object-cover w-full h-60"
        :src="contentPreview.ogVideoUrl + '?autoplay=1'"
        sandbox="allow-same-origin allow-scripts"
      />
    </div>

    <div v-else-if="contentPreview.type.includes('music')">
      <div v-if="!play" class="relative">
        <img
          :src="contentPreview.ogImageUrl"
          alt="previewImage"
          class="object-cover w-full h-32"
        />
        <PlayOverlay :content-url="contentUrl" @play="play = true" />
      </div>
      <iframe
        v-else
        class="w-screen h-32 max-w-full"
        :src="contentPreview.embeddedUrl"
        frameborder="0"
        sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
      />
    </div>

    <div v-else>Loading...</div>
    <span class="absolute top-0 left-0 z-10 w-1.5 h-full rounded-md bg-brand" />
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    contentUrl: {
      type: String,
      default: '',
    },
    contentPreview: {
      type: Object,
      default: () => ({ type: 'none' }),
    },
  },
  setup(props) {
    console.log('🚀 ~ file: LinkEntry.vue ~ line 63 ~ setup ~ props', props)
    const play = ref(false)
    return { play }
  },
})
</script>
