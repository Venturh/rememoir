<template>
  <div
    class="relative flex flex-col justify-between w-screen px-3 py-4 rounded-lg bg-secondary"
  >
    <div class="flex items-start justify-between">
      <div class="space-y-2">
        <span v-if="contentText" class="">{{ contentText }}</span>
        <LinkEntry
          v-if="contentType === 'Link'"
          :content-text="contentText"
          :content-url="contentUrl"
          :content-preview="contentPreview"
        />
      </div>
      <div class="flex items-center flex-shrink-0">
        <span class="text-sm">{{ timeFrom }}</span>
        <button @mouseover="showMenu = !showMenu" @click="showMenu = !showMenu">
          <MoreVerticalIcon size="1.25x" />
        </button>
      </div>
    </div>

    <div class="flex items-center justify-between">
      <span />
      <div class="space-x-2">
        <span
          v-for="category in categories"
          :key="category"
          class="px-2 py-1.5 text-xs rounded-lg bg-primary"
        >
          {{ category }}
        </span>
      </div>
    </div>
    <BaseEntryActions
      :entry-id="id"
      :entry="$props"
      :show-menu="showMenu"
      @showMenu="setMenu"
    />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useContext,
} from '@nuxtjs/composition-api'

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
    const showMenu = ref(false)
    const dayjs = useContext().app.$dayjs

    function setMenu(value: boolean) {
      showMenu.value = value
    }

    const timeFrom = computed(() => {
      return dayjs(parseInt(props.updatedAt)).fromNow()
    })

    return {
      showMenu,
      setMenu,
      timeFrom,
    }
  },
})
</script>
