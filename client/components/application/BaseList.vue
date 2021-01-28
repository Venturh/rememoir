<template>
  <nuxt-link
    :to="localePath(`/lists/${list.id}`)"
    class="relative flex flex-col px-3 py-2 rounded-lg bg-secondary"
  >
    <div class="flex items-start justify-between">
      <div class="space-y-3">
        <p class="text-lg">{{ list.title }}</p>
        <p class="">{{ list.description }}</p>
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
          v-for="category in list.categories"
          :key="category"
          class="px-2 py-1.5 text-xs rounded-lg bg-primary"
        >
          {{ category }}
        </span>
      </div>
    </div>
    <BaseListActions
      :list-id="list.id"
      :list="list"
      :show-menu="showMenu"
      @showMenu="setMenu"
    />
  </nuxt-link>
</template>

<script lang="ts">
import { List } from '@/generated/graphql'
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
    list: {
      type: Object as PropType<List>,
      default: () => {},
    },
  },
  setup(props) {
    const showMenu = ref(false)
    const dayjs = useContext().app.$dayjs

    function setMenu(value: boolean) {
      showMenu.value = value
    }

    const timeFrom = computed(() => {
      return dayjs(parseInt(props.list.updatedAt)).fromNow()
    })

    return {
      showMenu,
      setMenu,
      timeFrom,
    }
  },
})
</script>
