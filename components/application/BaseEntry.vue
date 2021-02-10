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
import { Entry } from '@/generated/graphql'
import {
  computed,
  defineComponent,
  PropType,
  useContext,
} from '@nuxtjs/composition-api'

import { MoreVerticalIcon } from 'vue-feather-icons'

export default defineComponent({
  components: {
    MoreVerticalIcon,
  },
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
    const dayjs = useContext().app.$dayjs
    const timeFrom = computed(() => {
      return dayjs(parseInt(props.entry.updatedAt)).fromNow()
    })

    return {
      timeFrom,
    }
  },
})
</script>
