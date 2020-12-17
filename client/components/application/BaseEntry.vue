<template>
  <div
    class="flex flex-col justify-between p-2 space-y-2 rounded-lg bg-secondary"
  >
    <div class="flex items-start justify-between">
      <div class="relative h-full space-y-2">
        <span>{{ contentText }}</span>
      </div>
      <div class="flex items-center">
        <span class="text-sm">{{ timeFrom }}</span>
        <MoreVerticalIcon size="1.25x" />
      </div>
    </div>
    <LinkEntry
      v-if="contentType === 'Link'"
      class="md:w-4/6"
      :content-text="contentText"
      :content-url="contentUrl"
      :content-preview="contentPreview"
    />
    <div class="flex items-center justify-between">
      <span />
      <div class="space-x-2">
        <span
          v-for="category in categories"
          :key="category"
          class="px-2 py-1.5 text-xs rounded-lg bg-primary"
          >{{ category }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from '@nuxtjs/composition-api'
import * as dayjs from 'dayjs'
import * as relativeTime from 'dayjs/plugin/relativeTime'
import { MoreVerticalIcon } from 'vue-feather-icons'

dayjs.extend(relativeTime)
export default defineComponent({
  components: {
    MoreVerticalIcon,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
    contentText: {
      type: String,
      default: '',
    },
    contentUrl: {
      type: String,
      default: '',
    },
    contentType: {
      type: String,
      default: '',
    },
    contentPreview: {
      type: Object,
      default: () => {},
    },
    processing: {
      type: Boolean,
      default: false,
    },
    updatedAt: {
      type: String,
      default: '',
    },
    hashedKey: {
      type: String,
      default: '',
    },
    calendarDate: {
      type: String,
      default: '',
    },
    categories: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const timeFrom = computed(() => {
      return dayjs(parseInt(props.updatedAt)).fromNow()
    })
    console.log(props)
    return { timeFrom }
  },
})
</script>
