<template>
  <div v-if="preview" class="relative pl-4 rounded-lg">
    <div v-if="preview.type === 'Error'">{{ t('previewError') }}</div>
    <div v-else class="space-y-2">
      <Preview v-if="preview" :preview="preview" :url="url" />
      <div class="space-y-1 text-sm">
        <p class="text-xs text-secondary">
          {{ preview.ogSiteName }}
        </p>
        <p class="text-sm">
          {{ preview.ogTitle }}
        </p>
        <p>
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
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'

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
  setup() {
    const { t } = useI18n()
    return { t }
  },
})
</script>
