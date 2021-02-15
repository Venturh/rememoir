<template>
  <AuthLayout>
    <div class="flex flex-col space-y-4">
      <div class="space-y-2">
        <h1>{{ t('register') }}.</h1>
        <h2>{{ t('registerSubheader') }}</h2>
      </div>
      <AuthForm :error="error" action-name="Register" @submit="register()">
        <FormInput
          v-model:value="email"
          type="email"
          class="block w-full form-input"
          >Email</FormInput
        >
        <FormInput v-model:value="username" type="text">
          {{ t('username') }}
        </FormInput>
        <FormInput v-model:value="password" type="password">
          {{ t('password') }}
        </FormInput>
      </AuthForm>
    </div>
  </AuthLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRegisterMutation } from '@/generated/graphql'
import { generateSecretKey, hash } from '@/utils/crypto'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

export default defineComponent({
  // middleware: ['notAuthenticated'],
  setup() {
    const { t } = useI18n()
    const { push } = useRouter()
    const error = ref('')
    const email = ref('')
    const password = ref('')
    const username = ref('')

    const { mutate: sendRegistration } = useRegisterMutation(() => ({
      variables: {
        email: email.value,
        username: username.value,
        password: password.value,
        secret: hash(generateSecretKey()),
      },
    }))

    async function register() {
      const { data } = await sendRegistration()

      if (data) {
        const { errors, user } = data.register
        if (errors) {
          error.value = errors.message
          return
        }

        push(`/auth/code?id=${user!.id}`)
      }
    }

    return {
      t,
      register,
      email,
      password,
      username,
      error,
    }
  },
})
</script>
