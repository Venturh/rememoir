<template>
  <div v-if="contentPreview" class="relative px-4 mx-auto rounded-lg">
    <p class="text-xs">{{ contentPreview.ogSiteName }}</p>
    <ButtonOrLink out :to="contentUrl">
      {{ contentPreview.ogTitle }}
    </ButtonOrLink>
    <div class="mt-2">
      <Preview
        v-if="contentPreview.type"
        :content-preview="contentPreview"
        :play="play"
        :content-url="contentUrl"
        @play="play = !play"
      />
    </div>
    <span
      class="absolute top-0 left-0 z-10 w-1.5 h-full rounded-md bg-brand25"
    />
  </div>
  <div v-else>Loading...</div>
</template>

<script lang="ts">
import { ContentPreview } from '@/generated/graphql'
import { defineComponent, PropType, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    contentUrl: {
      type: String,
      default: '',
    },
    contentPreview: {
      type: Object as PropType<ContentPreview>,
      default: () => {},
    },
  },
  setup() {
    const play = ref(false)
    return { play }
  },
})
</script>
