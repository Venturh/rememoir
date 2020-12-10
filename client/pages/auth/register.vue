<template>
  <main>
    <div class="flex flex-col space-y-4">
      <div class="space-y-2">
        <h1>{{ $t('register') }}.</h1>
        <h2>{{ $t('registerSubheader') }}</h2>
      </div>
      <AuthForm :error="error" action-name="Register" @submit="register()">
        <FormInput v-model="email" type="email" class="block w-full form-input"
          >Email</FormInput
        >
        <FormInput v-model="username" type="text">
          {{ $t('username') }}
        </FormInput>
        <FormInput v-model="password" type="password">
          {{ $t('password') }}
        </FormInput>
      </AuthForm>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import { useRegisterMutation } from '@/generated/graphql'
import { generateSecretKey, hash } from '@/utils/crypto'

export default defineComponent({
  layout: 'auth',
  middleware: ['notAuthenticated'],
  setup() {
    const error = ref('')
    const email = ref('')
    const password = ref('')
    const username = ref('')
    const { app } = useContext()
    const { router, localePath } = app

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
        // TODO: nuxt-i18n fix when migrate to composition api
        router!.push(localePath(`/auth/code?id=${user?.id}`))
      }
    }

    return {
      register,
      email,
      password,
      username,
      error,
    }
  },
})
</script>
