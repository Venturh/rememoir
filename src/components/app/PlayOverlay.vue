<template>
  <div
    class="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center w-20 h-12 m-auto space-x-2 rounded-full opacity-80 bg-primary"
  >
    <IconOnlyButton @click="$emit('play')">
      <Icon :icon="RiPlayLine" class="opacity-100 fill-current text-primary" />
    </IconOnlyButton>
    <IconOnlyButton out :to="url">
      <Icon
        :icon="RiExternalLinkLine"
        class="opacity-100 stroke-current text-primary"
      />
    </IconOnlyButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RiPlayLine, RiExternalLinkLine } from 'vue-remix-icons'
export default defineComponent({
  props: {
    url: {
      type: String,
      default: '',
    },
  },
  emits: ['play'],
  setup() {
    return { RiPlayLine, RiExternalLinkLine }
  },
})
</script>
