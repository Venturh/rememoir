<template>
  <ButtonOrLink
    class="inline-flex items-center justify-center rounded-md stroke-current text-secondary hover:text-brand focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand"
    :to="to"
    :out="out"
    @mouseover="$emit('mouseover')"
    @mouseleave="$emit('mouseleave')"
    @click="$emit('click')"
  >
    <slot />
  </ButtonOrLink>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    to: {
      type: String,
    },
    out: {
      out: Boolean,
      default: false,
    },
  },
})
</script>
