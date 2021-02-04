<template>
  <div class="flex flex-col items-center">
    <SearchIcon size="1.5x" />
    <p>We couldnt found anything</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { SearchIcon } from 'vue-feather-icons'

export default defineComponent({
  components: {
    SearchIcon,
  },
  props: {
    target: {
      type: String,
      default: '',
    },
  },
})
</script>
