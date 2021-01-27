<template>
  <div
    class="relative flex flex-col w-full h-full px-3 py-2 space-y-1 rounded-lg bg-secondary"
  >
    <div class="flex items-center justify-between">
      <span>{{ entry.title }}</span>
      <div class="flex items-center flex-shrink-0">
        <span class="text-sm">{{ timeFrom }}</span>
        <button @mouseover="showMenu = !showMenu" @click="showMenu = !showMenu">
          <MoreVerticalIcon size="1.25x" />
        </button>
      </div>
    </div>
    <div class="w-full h-full space-y-3">
      <span v-if="entry.description" class="">{{ entry.description }}</span>
      <LinkEntry
        v-if="entry.type === 'Link' && showPreview"
        :url="entry.url"
        :preview="entry.preview"
      />
    </div>

    <div class="flex items-center justify-between">
      <span />
      <div class="space-x-2">
        <span
          v-for="category in entry.categories"
          :key="category"
          class="px-2 py-1.5 text-xs rounded-lg bg-primary"
        >
          {{ category }}
        </span>
      </div>
    </div>
    <BaseEntryActions
      :entry="entry"
      :show-menu="showMenu"
      @showMenu="setMenu"
    />
  </div>
</template>

<script lang="ts">
import { Entry } from '@/generated/graphql'
import {
  computed,
  defineComponent,
  PropType,
  ref,
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
  },
  setup(props) {
    const showMenu = ref(false)
    const dayjs = useContext().app.$dayjs
    function setMenu(value: boolean) {
      showMenu.value = value
    }

    const timeFrom = computed(() => {
      return dayjs(parseInt(props.entry.updatedAt)).fromNow()
    })

    return {
      showMenu,
      setMenu,
      timeFrom,
    }
  },
})
</script>
