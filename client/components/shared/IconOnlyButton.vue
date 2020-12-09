<template>
  <button
    class="inline-flex items-center justify-center rounded-md stroke-current text-secondary hover:text-brand focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>
