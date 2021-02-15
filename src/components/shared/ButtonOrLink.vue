<template>
  <a v-if="to && out" :href="to" target="_blank" rel="noopener noreferrer">
    <slot />
  </a>
  <router-link v-else-if="to && !out" :to="to">
    <slot />
  </router-link>
  <button
    v-else
    type="button"
    @mouseover="$emit('mouseover')"
    @mouseleave="$emit('mouseleave')"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    to: {
      type: String,
      default: '',
    },
    out: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['mouseleave', 'mouseover'],
  setup() {},
})
</script>
