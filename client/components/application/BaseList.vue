<template>
  <div class="relative flex flex-col px-3 py-2 rounded-lg bg-secondary">
    <div class="flex items-start justify-between">
      <div class="space-y-3">
        <p class="">{{ title }}</p>
        <p class="">{{ description }}</p>
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
    <BaseListActions
      :list-id="id"
      :list="$props"
      :show-menu="showMenu"
      @showMenu="setMenu"
    />
  </div>
</template>

<script lang="ts">
import { EntryInput } from '@/generated/graphql'
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
    id: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
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
    entries: {
      type: Array as PropType<EntryInput[]>,
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
