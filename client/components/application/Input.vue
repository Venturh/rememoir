<template>
  <input
    type="search"
    autocomplete="off"
    name="input"
    :value="inputValue"
    class="block w-full border border-transparent rounded-lg pl-9 sm:pl-14 bg-secondary focus:outline-none focus:ring focus:ring-brand"
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
  },
})
</script>
