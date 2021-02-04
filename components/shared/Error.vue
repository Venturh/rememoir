<template>
  <div
    class="inline-flex items-center p-2 space-x-2 border rounded-lg text-primary border-error"
  >
    <alert-circle-icon size="1.25x" class="text-error"></alert-circle-icon>
    <span> {{ message }} </span>
  </div>
</template>

<script>
import { AlertCircleIcon } from 'vue-feather-icons'
export default {
  components: {
    AlertCircleIcon,
  },
  props: {
    message: {
      type: String,
      default: 'Error',
    },
  },
}
</script>

<style lang="scss" scoped></style>
