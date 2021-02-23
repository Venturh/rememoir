<template>
  <AuthLayout>
    <div class="flex flex-col space-y-4">
      <div class="space-y-2">
        <h1>{{ t('signUp') }}.</h1>
        <h2>{{ t('registerSubheader') }}</h2>
      </div>
      <AuthForm type="signUp" :validation-schema="schema" @submit="register">
        <FormInput
          name="username"
          type="text"
          label="username"
          success-message="nicetomeet"
        />
        <FormInput name="email" type="email" label="email" />
        <FormInput name="password" type="password" label="password" />
        <template #error>
          <Error v-if="infos.error" :message="infos.error" />
        </template>
      </AuthForm>
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { generateSecretKey, hash } from '@/utils/crypto'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { object, string } from 'yup'

import { useRegisterMutation } from '@/generated/graphql'

const { t } = useI18n()
const { push } = useRouter()

const infos = reactive({
  email: 'a@a.de',
  password: 'aaa',
  username: 'aaa',
  error: '',
})

const schema = object().shape({
  email: string().email().required(),
  password: string().min(3).required(),
  username: string().min(3).required(),
})

const { mutate: sendRegistration } = useRegisterMutation(() => ({
  variables: {
    email: infos.email,
    username: infos.username,
    password: infos.password,
    secret: hash(generateSecretKey()),
  },
}))

async function register(values: {
  email: string
  password: string
  username: string
}) {
  Object.assign(infos, values)
  infos.error = ''
  const { data } = await sendRegistration()

  if (data) {
    const { errors, user } = data.register
    if (errors) {
      infos.error = errors.message
      return
    }

    push(`/auth/code?id=${user!.id}`)
  }
}
</script>
