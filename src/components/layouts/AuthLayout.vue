<template>
  <LandingLayout>
    <div class="w-full mx-auto my-auto h-1/2 lg:max-w-sm">
      <slot />
    </div>
  </LandingLayout>
</template>

<style lang="postcss" scoped>
* >>> h1 {
  @apply text-5xl font-semibold;
}

* >>> h2 {
  @apply text-2xl text-secondary;
}
</style>
