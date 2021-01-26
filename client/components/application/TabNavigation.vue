<template>
  <nav class="relative flex items-center py-2 bg-secondary">
    <nuxt-link
      class="flex items-center justify-center w-1/2 space-x-2"
      :class="selected === 'entries' ? '' : 'hover:text-brand'"
      :to="localePath('/home/entries')"
    >
      <ColumnsIcon size="1.25x" />
      <span>Entries</span>
    </nuxt-link>
    <nuxt-link
      class="flex items-center justify-center w-1/2 space-x-2"
      :class="selected === 'lists' ? '' : 'hover:text-brand'"
      :to="localePath('/home/lists')"
    >
      <ListIcon size="1.25x" />
      <span>Lists</span>
    </nuxt-link>
    <div
      class="absolute bottom-0 w-1/2 h-0.5 bg-brand"
      :class="selected === 'lists' ? 'right-0' : 'left-0'"
    />
  </nav>
</template>

<script>
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import { ListIcon, ColumnsIcon } from 'vue-feather-icons'

export default defineComponent({
  components: { ColumnsIcon, ListIcon },

  setup() {
    const { route } = useContext()
    const selected = ref(route.value.fullPath.split('/')[3])

    return { selected }
  },
})
</script>
