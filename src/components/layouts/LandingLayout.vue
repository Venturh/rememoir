<template>
  <Root>
    <div class="flex flex-col h-screen">
      <NavigationHeader />
      <div
        class="w-full h-full pt-12 mx-auto max-w-xsm sm:max-w-md lg:max-w-6xl"
      >
        <slot />
      </div>
    </div>
  </Root>
</template>
