<template>
  <html>
    <div class="bg-primary text-primary">
      <div class="flex flex-col h-screen mx-auto max-w-xsm lg:max-w-5xl">
        <navigation-header />
        <nuxt v-if="!$slots.default" />
        <div class="w-full mx-auto my-auto h-1/2 lg:max-w-sm">
          <slot />
        </div>
      </div>
    </div>
  </html>
</template>
