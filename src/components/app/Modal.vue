<template>
  <vue-final-modal
    v-bind="$attrs"
    :name="name"
    classes=" flex items-center justify-center"
    content-class="relative flex flex-col w-full max-w-xl p-4 space-y-6 rounded-md h-96 max-h-96 bg-primary"
    :esc-to-close="!required"
    :focus-trap="true"
    :focus-retain="false"
  >
    <div class="">
      <h1 v-if="title" class="text-xl font-semibold">
        {{ title }}
      </h1>
      <slot name="header" />
    </div>
    <div class="overflow-y-auto">
      <form
        v-if="form"
        class="flex-grow space-y-2"
        @submit.prevent="$emit('confirm')"
      >
        <slot />
        <div class="flex items-center justify-between">
          <div class="flex items-center flex-shrink-0 space-x-2">
            <Button
              variant="brand25"
              type="submit"
              @click.stop="$emit('confirm')"
              >{{ t(buttonNames[0]) }}</Button
            >
            <Button
              v-if="buttonNames.length > 1"
              variant="inherit"
              @click.stop="$emit('cancel')"
            >
              {{ t(buttonNames[1]) }}
            </Button>
          </div>
          <Error v-if="error && error.show" :message="error.msg" />
        </div>
      </form>

      <div v-else class="flex-grow">
        <slot />
      </div>
    </div>
  </vue-final-modal>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { Error } from '@/types'

export default defineComponent({
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    form: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Object as PropType<Error>,
      default: () => {},
    },
    buttonNames: {
      type: Array as PropType<string[]>,
      default: () => ['confirm', 'cancel'],
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['input', 'confirm', 'cancel'],
  setup() {
    const { t } = useI18n()

    return { t }
  },
})
</script>
