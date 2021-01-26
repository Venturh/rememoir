<template>
  <div v-if="preview" class="relative pl-4 rounded-lg">
    <div v-if="preview.type === 'Error'">{{ $t('previewError') }}</div>
    <div v-else>
      <div>
        <Preview v-if="preview" :preview="preview" :content-url="url" />
      </div>
      <div>
        <p class="text-sm">
          {{ preview.ogSiteName }}
        </p>
        <p class="text-sm">
          {{ preview.ogTitle }}
        </p>
        <p v-if="preview.type === 'website' || preview.type === 'article'">
          {{ preview.ogDescription }}
        </p>
      </div>
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
    url: {
      type: String,
      default: '',
    },
    preview: {
      type: Object as PropType<ContentPreview>,
      default: () => {},
    },
  },
})
</script>
