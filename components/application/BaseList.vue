<template>
  <Card
    :categories="list.categories"
    :time-from="timeFrom"
    class="cursor-pointer"
    :primary="primary"
    @click="navigate"
  >
    <div class="flex items-center justify-between">
      <p :class="{ 'text-xl font-semibold': primary }">
        {{ list.title }}
      </p>
      <BaseListActions :list-id="list.id" :list="list" />
    </div>
    <p class="">{{ list.description }}</p>
  </Card>
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
    const { $dayjs, router, localePath } = useContext().app

    const timeFrom = computed(() => {
      return $dayjs(parseInt(props.list.updatedAt)).fromNow()
    })

    function navigate() {
      if (props.primary) return
      router?.push(localePath(`/lists/${props.list.id}`))
    }

    return {
      timeFrom,
      navigate,
    }
  },
})
</script>
