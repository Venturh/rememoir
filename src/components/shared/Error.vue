<template>
  <div
    class="inline-flex items-center p-2 space-x-2 border rounded-lg text-primary border-error"
  >
    <Icon :icon="RiErrorWarningLine" class="text-error" />
    <span> {{ message }} </span>
  </div>
</template>

<script>
import { RiErrorWarningLine } from 'vue-remix-icons'
export default {
  props: {
    message: {
      type: String,
      default: 'Error',
    },
  },
  setup() {
    return { RiErrorWarningLine }
  },
}
</script>
