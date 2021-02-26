<template>
  <Root>
    <div class="flex flex-col h-screen mx-auto max-w-xsm lg:max-w-5xl">
      <NavigationHeader />
      <div class="w-full h-full">
        <slot />
      </div>
    </div>
  </Root>
</template>
