<template>
  <div class="relative px-4 py-2 rounded-lg bg-primary">
    <div class="text-xs">{{ contentPreview.ogSiteName }}</div>
    <ButtonOrLink out :to="contentUrl" class="">{{
      contentPreview.ogTitle
    }}</ButtonOrLink>
    <div v-if="contentPreview.type === 'video.other'">
      <div>{{ contentPreview.title }}</div>

      <div>
        <div v-if="!play" class="relative">
          <img
            :src="contentPreview.ogImageUrl"
            alt="previewImage"
            class="object-cover w-full h-60"
          />
          <div
            class="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center w-20 h-12 m-auto space-x-2 rounded-full opacity-80 bg-primary"
          >
            <IconOnlyButton @click="play = !play">
              <PlayIcon
                class="opacity-100 fill-current text-primary"
                size="1.5x"
              />
            </IconOnlyButton>
            <IconOnlyButton out :to="contentUrl">
              <ExternalLinkIcon
                class="opacity-100 stroke-current text-primary"
                size="1.5x"
              />
            </IconOnlyButton>
          </div>
        </div>
        <iframe
          v-if="play"
          class="object-cover w-full h-60"
          :src="contentPreview.ogVideoUrl + '?autoplay=1&auto_play=1'"
          sandbox="allow-same-origin allow-scripts"
        />
      </div>
    </div>
    <div v-else>Loading...</div>
    <span class="absolute top-0 left-0 z-10 w-1.5 h-full rounded-md bg-brand" />
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { PlayIcon, ExternalLinkIcon } from 'vue-feather-icons'

export default defineComponent({
  components: { PlayIcon, ExternalLinkIcon },
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
    const play = ref(false)
    return { play }
  },
})
</script>
