<template>
  <div
    class="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center w-20 h-12 m-auto space-x-2 rounded-full opacity-80 bg-primary"
  >
    <IconOnlyButton @click="$emit('play')">
      <PlayIcon class="opacity-100 fill-current text-primary" size="1.5x" />
    </IconOnlyButton>
    <IconOnlyButton out :to="url">
      <ExternalLinkIcon
        class="opacity-100 stroke-current text-primary"
        size="1.5x"
      />
    </IconOnlyButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { PlayIcon, ExternalLinkIcon } from 'vue-feather-icons'
export default defineComponent({
  components: { PlayIcon, ExternalLinkIcon },
  props: {
    url: {
      type: String,
      default: '',
    },
  },
})
</script>
