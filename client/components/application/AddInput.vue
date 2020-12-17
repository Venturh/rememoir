<template>
  <input
    v-model="input"
    type="text"
    name="input"
    class="border-none rounded-lg outline-none bg-secondary focus:ring focus:ring-brand"
    :placeholder="$t('addNewEntry')"
    @keydown.enter="add"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const input = ref('')
    return { input }
  },
})
</script>
