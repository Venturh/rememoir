<template>
  <div>
    <label class="text-secondary"><slot /></label>
    <div class="mt-1">
      <input
        :value="value"
        autocomplete="new-password"
        class="block w-full bg-opacity-75 rounded-md border-1 border-secondaryText bg-secondary focus:ring-brand focus:border-brand sm:text-sm"
        :type="type"
        :placeholder="placeholder"
        @input="$emit('input', $event.target.value)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    value: {
      type: String,
      default: '',
    },

    type: {
      type: String,
      default: 'email',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
})
</script>
