<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 v-if="error.statusCode === 404" class="text-2xl">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <Links to="/">Back</Links>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'landing',
}
</script>
