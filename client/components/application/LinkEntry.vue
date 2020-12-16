<template>
  <div v-if="contentPreview.type === 'video.other'">
    <div>{{ contentText }}</div>
    <div>{{ contentPreview.title }}</div>

    <div class="h-full" @click="play = !play">
      <img
        v-if="!play"
        :src="contentPreview.ogImageUrl"
        alt="previewImage"
        class="object-cover w-full h-60"
      />
      <iframe
        v-if="play"
        class="object-cover w-full h-60"
        :src="contentPreview.ogVideoUrl + '?autoplay=1&auto_play=1'"
        sandbox="allow-same-origin allow-scripts"
      />
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  components: {},
  props: {
    contentText: {
      type: String,
      default: '',
    },
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
    const play = ref(false)
    return { play }
  },
})
</script>
