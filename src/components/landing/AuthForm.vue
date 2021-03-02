<template>
  <Form
    class="space-y-6"
    :validation-schema="validationSchema"
    @submit="submit"
  >
    <div class="space-y-3">
      <slot />
      <div class="space-y-5">
        <Links v-if="type === 'signIn'" to="/auth/resetPassword">
          {{ t('forgottenPassword') }}
        </Links>

        <div v-else />
        <div class="flex items-center space-x-4">
          <Button
            class="w-full"
            variant="brand25"
            type="submit"
            :loading="loading"
          >
            {{ t(type) }}
          </Button>
        </div>
      </div>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { defineEmit, defineProps } from 'vue'
import { Form } from 'vee-validate'
import { useI18n } from 'vue-i18n'

const emit = defineEmit(['submit'])
defineProps<{
  type: string
  validationSchema: Object
  loading: boolean
}>()

const { t } = useI18n()
function submit(data: Object) {
  emit('submit', data)
}
</script>
