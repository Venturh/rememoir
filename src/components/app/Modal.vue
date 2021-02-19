<template>
  <vue-final-modal
    v-bind="$attrs"
    :name="name"
    classes=" flex items-center  justify-center"
    :content-class="`relative flex flex-col w-full max-w-xl  rounded-md bg-primary ${
      fixed ? 'h-96 max-h-96' : ''
    }`"
    :esc-to-close="!required"
    :focus-trap="true"
    :focus-retain="false"
    @click.stop=""
  >
    <div class="">
      <h1 v-if="title" class="text-xl font-semibold">
        {{ title }}
      </h1>
      <slot name="header" />
    </div>
    <div class="p-4 overflow-y-auto">
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
              >{{ t(buttons[0]) }}</Button
            >
            <Button
              v-if="buttons.length > 1"
              variant="inherit"
              @click.stop="$emit('cancel')"
            >
              {{ t(buttons[1]) }}
            </Button>
          </div>
          <Error v-if="error && error.show" :message="error.msg" />
        </div>
      </form>

      <div v-else class="flex-grow mt-6">
        <slot />
      </div>
    </div>
  </vue-final-modal>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Error } from '@/types'

const props = defineProps<{
  name: string
  title?: string
  form?: boolean
  error?: Error
  buttonNames?: string[]
  required?: boolean
  fixed?: boolean
}>()

const { t } = useI18n()
const buttons = props.buttonNames ? props.buttonNames : ['confirm', 'cancel']
</script>
