<template>
  <Card
    :categories="list.categories"
    :time-from="timeFrom"
    :class="{ 'cursor-pointer': !primary }"
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
import { computed, defineComponent, PropType } from 'vue'
import { useRouter } from 'vue-router'
import { List } from '@/generated/graphql'
import { useTimeFromDate } from '@/hooks/date'

export default defineComponent({
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
    const { push } = useRouter()
    const date = useTimeFromDate(props.list.updatedAt)
    const timeFrom = computed(() => {
      return date
    })

    function navigate() {
      if (props.primary) return
      push(`/lists/${props.list.id}`)
    }

    return {
      timeFrom,
      navigate,
    }
  },
})
</script>
