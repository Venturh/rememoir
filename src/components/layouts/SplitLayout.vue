<template>
  <div
    class="relative flex flex-col-reverse items-start lg:space-x-6 lg:flex-row lg:justify-between lg:items-start"
  >
    <div class="w-full space-y-2 lg:w-screen lg:max-w-lg">
      <slot name="first" />
    </div>
    <div class="w-full mb-2 space-y-2 lg:w-80">
      <slot name="second" />
    </div>
  </div>
</template>
