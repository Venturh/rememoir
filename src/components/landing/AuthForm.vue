<template>
  <Form
    class="space-y-6"
    :validation-schema="validationSchema"
    @submit="submit"
  >
    <div class="space-y-3">
      <slot />
      <div class="flex items-center justify-between">
        <div v-if="type === 'signIn'" class="">
          <p>{{ t('loginSub') }}</p>
          <router-link to="/auth/register">{{ t('signUp') }}</router-link>
        </div>
        <div v-if="type === 'signUp'" class="">
          <p>{{ t('registerSub') }}</p>
          <router-link to="/auth/login">{{ t('signIn') }}</router-link>
        </div>
        <div v-else />
        <div class="flex items-center space-x-4">
          <Button variant="brand25" type="submit">
            {{ t(type) }}
          </Button>
          <slot name="error" />
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
}>()

const { t } = useI18n()
function submit(data: Object) {
  console.log('submit ~ data', data)
  emit('submit', data)
}
</script>
