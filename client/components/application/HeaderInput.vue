//textarea
<template>
  <input
    type="search"
    autocomplete="off"
    :disabled="disabled"
    name="input"
    :value="inputValue"
    class="block w-full border border-transparent rounded-lg bg-secondary focus:outline-none focus:ring focus:ring-brand"
    :class="search ? 'pl-12' : 'pl-16 sm:pl-20'"
    :placeholder="placeholder"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    inputValue: {
      type: String,
      default: '',
    },
    search: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
