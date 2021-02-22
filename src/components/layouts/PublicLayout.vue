<template>
  <Root>
    <div
      class="min-h-screen pt-2 mx-auto max-w-xsm sm:max-w-2xl md:max-w-2xl lg:max-w-6xl"
    >
      <NavigationHeader />
      <div class="w-full mx-auto mt-12 space-y-4 lg:w-screen lg:max-w-lg">
        <slot />
      </div>
    </div>
  </Root>
</template>
