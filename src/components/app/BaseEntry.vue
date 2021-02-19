<template>
  <Card
    :to="`/entries/${entry.id}`"
    :categories="entry.categories"
    :time-from="timeFrom"
  >
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

<script setup lang="ts">
import { defineProps } from 'vue'
import { useTimeFromDate } from '@/hooks/date'
import type { Entry } from '@/generated/graphql'

const props = defineProps<{
  entry: Entry
  showPreview: boolean
  isListEntry: boolean
}>()

const timeFrom = useTimeFromDate(props.entry.updatedAt)
</script>
