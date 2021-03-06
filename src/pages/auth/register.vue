<template>
  <AuthLayout
    title="signUp"
    subtitle="registerSubheader"
    :notification="notification"
    type="signUp"
  >
    <AuthForm
      type="signUp"
      :validation-schema="schema"
      :loading="loading"
      @submit="register"
    >
      <FormInput
        name="username"
        type="text"
        label="username"
        success-message="nicetomeet"
      />
      <FormInput name="email" type="email" label="email" />
      <FormInput name="password" type="password" label="password" />
    </AuthForm>
  </AuthLayout>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { object, string } from 'yup'

import { generateSecretKey, hash } from '@/utils/crypto'
import { useRegisterMutation } from '@/generated/graphql'
import { useLoading, useNotification } from '@/hooks'

const { push } = useRouter()
const { notification, setNotification } = useNotification()
const { loading, setLoading } = useLoading()

const infos = reactive({
  email: 'a@a.de',
  password: 'aaa',
  username: 'aaa',
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
  setLoading(true)
  Object.assign(infos, values)
  const { data } = await sendRegistration()
  if (data) {
    const { errors, user } = data.register
    setLoading(false)
    if (errors) {
      setNotification({ show: true, text: errors.message, type: 'error' })
      return
    }

    push(`/auth/code?id=${user!.id}`)
  }
}
</script>
