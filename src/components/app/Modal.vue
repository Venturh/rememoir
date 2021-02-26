<template>
  <vue-final-modal
    v-bind="$attrs"
    :name="name"
    classes="flex items-center justify-center  "
    :content-class="`relative flex flex-col w-full max-w-xl rounded-md bg-primary ring-1 ring-borderPrimary ${
      fixed ? 'h-96 max-h-96' : ''
    }`"
    :esc-to-close="!required"
    :focus-trap="true"
    :click-to-close="!required"
    :focus-retain="false"
    @click.stop=""
  >
    <div v-if="title" class="px-2 py-4">
      <h1 class="text-xl font-semibold">
        {{ t(title) }}
      </h1>
      <slot name="header" />
    </div>
    <div class="p-4 overflow-y-auto">
      <Form
        v-if="form"
        :validation-schema="validationSchema"
        @submit="submitForm"
      >
        <div class="space-y-4">
          <slot />
          <div class="flex items-center justify-between">
            <div class="flex items-center flex-shrink-0 space-x-2">
              <Button variant="brand25" type="submit" :loading="loading">
                {{ t(buttons[0]) }}
              </Button>
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
        </div>
      </Form>

      <div v-else class="flex-grow">
        <slot />
      </div>
    </div>
  </vue-final-modal>
</template>

<script setup lang="ts">
import { defineProps, defineEmit } from 'vue'
import { useI18n } from 'vue-i18n'
import { Form } from 'vee-validate'

import type { Error } from '@/types'

const props = defineProps<{
  name: string
  title?: string
  form?: boolean
  error?: Error
  buttonNames?: string[]
  required?: boolean
  fixed?: boolean
  validationSchema?: Object
  loading?: boolean
}>()

const emit = defineEmit(['submit', 'cancel'])

const { t } = useI18n()

const buttons = props.buttonNames ? props.buttonNames : ['confirm', 'cancel']
function submitForm(values: any) {
  emit('submit', values)
}
</script>
