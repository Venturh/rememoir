<template>
  <nuxt-link
    :to="localePath(`/lists/${list.id}`)"
    class="relative flex flex-col px-3 py-2 rounded-lg bg-secondary"
  >
    <div class="flex items-start justify-between">
      <div class="space-y-3">
        <p :class="primary ? 'text-xl font-semibold' : 'text-lg'">
          {{ list.title }}
        </p>
        <p class="">{{ list.description }}</p>
      </div>
      <div class="flex items-center flex-shrink-0">
        <span class="text-sm">{{ timeFrom }}</span>
        <BaseListActions :list-id="list.id" :list="list" />
      </div>
    </div>

    <div class="flex items-center justify-between">
      <span />
      <div class="space-x-2">
        <span
          v-for="category in list.categories"
          :key="category"
          class="px-2 py-1.5 text-xs rounded-lg bg-primary"
        >
          {{ category }}
        </span>
      </div>
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import { List } from '@/generated/graphql'
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
    list: {
      type: Object as PropType<List>,
      default: () => {},
    },
    primary: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const dayjs = useContext().app.$dayjs

    const timeFrom = computed(() => {
      return dayjs(parseInt(props.list.updatedAt)).fromNow()
    })

    return {
      timeFrom,
    }
  },
})
</script>
