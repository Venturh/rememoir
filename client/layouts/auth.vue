<template>
  <landing>
    <div class="w-full mx-auto my-auto h-1/2 md:max-w-sm">
      <Nuxt />
    </div>
  </landing>
</template>

<script>
import Landing from './landing'
export default {
  components: {
    Landing,
  },
}
</script>

<style lang="postcss" scoped>
* >>> h1 {
  @apply text-5xl font-semibold;
}

* >>> h2 {
  @apply text-2xl text-secondary;
}
</style>
