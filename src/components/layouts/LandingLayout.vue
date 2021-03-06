<template>
  <Root>
    <div class="flex flex-col h-screen">
      <NavigationHeader />
      <div class="w-full h-full mx-auto max-w-xsm lg:max-w-5xl">
        <slot />
      </div>
    </div>
  </Root>
</template>
