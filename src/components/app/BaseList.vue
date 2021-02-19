<template>
  <Card
    :categories="list.categories"
    :time-from="timeFrom"
    :class="{ 'cursor-pointer': !primary }"
    :to="primary ? '' : `/lists/${list.id}`"
  >
    <div class="flex items-center justify-between">
      <p :class="{ 'text-xl font-semibold': primary }">
        {{ list.title }}
      </p>
      <BaseListActions :list-id="list.id" :list="list" />
    </div>
    <p>{{ list.description }}</p>
  </Card>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { List } from '@/generated/graphql'
import { useTimeFromDate } from '@/hooks/date'

const props = defineProps<{
  list: List
  primary?: boolean
}>()

const timeFrom = useTimeFromDate(props.list.updatedAt)
</script>
