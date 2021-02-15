<template>
  <div
    class="inline-flex items-center p-2 space-x-2 border rounded-lg text-primary border-error"
  >
    <font-awesome-icon icon="exclamation-circle" class="text-error" />
    <span> {{ message }} </span>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: 'Error',
    },
  },
}
</script>
