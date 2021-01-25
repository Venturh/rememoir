<template>
  <div v-if="contentPreview" class="relative pl-4 rounded-lg">
    <div>
      <Preview
        v-if="contentPreview.type"
        :content-preview="contentPreview"
        :content-url="contentUrl"
      />
    </div>
    <div>
      <p class="text-sm">
        {{ contentPreview.ogSiteName }}
      </p>
      <p class="text-sm">
        {{ contentPreview.ogTitle }}
      </p>
      <p
        v-if="
          contentPreview.type === 'website' || contentPreview.type === 'article'
        "
      >
        {{ contentPreview.ogDescription }}
      </p>
    </div>
    <span
      class="absolute top-0 left-0 z-10 w-1.5 h-full rounded-md bg-brand25"
    />
  </div>
  <Loading v-else type="skeleton" custom class="w-full h-20" />
</template>

<script lang="ts">
import { ContentPreview } from '@/generated/graphql'
import { defineComponent, PropType } from '@nuxtjs/composition-api'

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
})
</script>
