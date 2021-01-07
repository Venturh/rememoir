<template>
  <div class="flex flex-col justify-between px-3 py-4 rounded-lg bg-secondary">
    <div class="flex items-start justify-between">
      <div class="flex flex-col w-3/4 space-y-2 overflow-hidden overflow-clip">
        <span v-if="contentText" class="">{{ contentText }}</span>
        <LinkEntry
          v-if="contentType === 'Link'"
          :content-text="contentText"
          :content-url="contentUrl"
          :content-preview="contentPreview"
        />
      </div>
      <div class="flex items-center">
        <span class="text-sm">{{ timeFrom }}</span>
        <MoreVerticalIcon size="1.25x" />
      </div>
    </div>

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
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api'
import { MoreVerticalIcon } from 'vue-feather-icons'
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
    const dayjs = useContext().app.$dayjs
    const timeFrom = computed(() => {
      return dayjs(parseInt(props.updatedAt)).fromNow()
    })
    return { timeFrom }
  },
})
</script>
