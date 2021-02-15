<template>
  <Card :categories="entry.categories" :time-from="timeFrom">
    <div class="flex items-center justify-between">
      <span>{{ entry.title }}</span>
      <BaseEntryActions :entry="entry" :is-list-entry="isListEntry" />
    </div>
    <p v-if="entry.description" class="">{{ entry.description }}</p>
    <LinkEntry
      v-if="entry.type === 'Link' && showPreview"
      :url="entry.url"
      :preview="entry.preview"
    />
  </Card>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { useTimeFromDate } from '@/hooks/date'
import { Entry } from '@/generated/graphql'

export default defineComponent({
  props: {
    entry: {
      type: Object as PropType<Entry>,
      default: () => {},
    },
    showPreview: {
      type: Boolean,
      default: true,
    },
    isListEntry: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const timeFrom = computed(() => {
      return useTimeFromDate(props.entry.updatedAt)
    })

    return {
      timeFrom,
    }
  },
})
</script>
