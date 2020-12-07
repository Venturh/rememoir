<template>
  <html>
    <div class="bg-primary text-primary">
      <div class="flex flex-col h-screen mx-auto max-w-xsm md:max-w-5xl">
        <navigation-header />
        <nuxt v-if="!$slots.default" />
        <div class="w-full mx-auto my-auto h-1/2 md:max-w-sm">
          <slot />
        </div>
      </div>
    </div>
  </html>
</template>
