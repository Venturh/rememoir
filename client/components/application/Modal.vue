<template>
  <vue-final-modal
    v-bind="$attrs"
    classes="flex items-center justify-center"
    content-class="relative flex flex-col p-4 mx-4 space-y-1 rounded-md bg-primary"
    v-on="$listeners"
  >
    <h1 class="text-xl font-semibold">
      <slot name="title"></slot>
    </h1>
    <div class="flex-grow overflow-y-auto">
      <slot />
    </div>
    <div class="flex space-x-2">
      <Button @click="$emit('confirm')">Confirm</Button>
      <Button @click="$emit('cancel')">Cancel</Button>
    </div>
    <button class="absolute top-2 right-2" @click="$emit('input', false)">
      <XIcon size="1.25x" />
    </button>
  </vue-final-modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { XIcon } from 'vue-feather-icons'
export default defineComponent({
  components: {
    XIcon,
  },
  inheritAttrs: false,
})
</script>

<style scoped>
::v-deep .modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 90%;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
}
.modal__title {
  margin: 0 2rem 0 0;
  font-size: 1.5rem;
  font-weight: 700;
}
.modal__content {
  flex-grow: 1;
  overflow-y: auto;
}
.modal__action {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  padding: 1rem 0 0;
}
.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
</style>

<style scoped>
.dark-mode div::v-deep .modal-content {
  border-color: #2d3748;
  background-color: #1a202c;
}
</style>
