<template>
  <a v-if="to && out" :href="to" target="_blank" rel="noopener noreferrer">
    <slot />
  </a>
  <nuxt-link v-else-if="to && !out" :to="to">
    <slot />
  </nuxt-link>
  <button
    v-else
    type="button"
    @mouseover="$emit('mouseover')"
    @mouseleave="$emit('mouseleave')"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    to: {
      type: String,
    },
    out: {
      type: Boolean,
      default: false,
    },
  },
  setup() {},
})
</script>
