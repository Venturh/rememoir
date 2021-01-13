<template>
  <vue-final-modal
    v-bind="$attrs"
    classes=" flex items-center justify-center"
    content-class="relative flex flex-col w-full max-w-lg p-4 space-y-4 rounded-md bg-primary"
    esc-to-close
    v-on="$listeners"
  >
    <h1 class="text-xl font-semibold">
      {{ title }}
    </h1>
    <form
      v-if="form"
      class="flex-grow space-y-2 overflow-y-auto"
      @submit.prevent="$emit('confirm')"
    >
      <slot />
      <div class="flex items-center flex-shrink-0 space-x-2">
        <Button variant="1" type="submit">{{ $t(buttonNames[0]) }}</Button>
        <Button variant="secondary" @click="$emit('cancel')">
          {{ $t(buttonNames[1]) }}
        </Button>
      </div>
    </form>

    <div v-else class="flex-grow overflow-y-auto">
      <slot />
    </div>

    <button class="absolute top-2 right-2" @click="$emit('input', false)">
      <XIcon size="1.25x" />
    </button>
  </vue-final-modal>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { XIcon } from 'vue-feather-icons'
export default defineComponent({
  components: {
    XIcon,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    form: {
      type: Boolean,
      default: false,
    },
    buttonNames: {
      type: Array as PropType<string[]>,
      default: () => ['confirm', 'cancel'],
    },
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
