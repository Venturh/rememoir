<template>
  <Loading v-if="queryToken.loading" />
  <AuthLayout
    v-else
    :title="queryToken.verified ? 'newPasswordSub' : 'resetPasswordSub'"
    :subtitle="
      queryToken.verified ? 'newPasswordSubheader' : 'resetPasswordSubheader'
    "
    :notification="notification"
  >
    <AuthForm
      v-if="!queryToken.verified"
      type="resetPasswordButton"
      :validation-schema="schemaUnverified"
      :loading="loading"
      @submit="requestResetPassword"
    >
      <FormInput name="email" type="email" label="email" />
    </AuthForm>

    <AuthForm
      v-else
      type="resetPasswordSub"
      :validation-schema="schema"
      @submit="resetPassword"
    >
      <FormInput name="password" type="password" label="password" />
    </AuthForm>
  </AuthLayout>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { object, string } from 'yup'

import {
  useRequestResetPasswordMutation,
  useResetPasswordMutation,
  useVerifyPasswordResetMutation,
} from '@/generated/graphql'
import { useLoading, useNotification } from '@/hooks'

const { push, currentRoute } = useRouter()
const { query } = currentRoute.value
const { notification, setNotification } = useNotification()
const { loading, setLoading } = useLoading()

const queryToken = reactive({ token: '', loading: false, verified: false })

const schemaUnverified = object().shape({
  email: string().email().required(),
})
const schema = object().shape({
  password: string().min(3).required(),
})

const { mutate: sendRequestPasswortReset } = useRequestResetPasswordMutation({})

const { mutate: sendVerifyToken } = useVerifyPasswordResetMutation(() => ({}))

const { mutate: sendResetPassword } = useResetPasswordMutation(() => ({}))

async function verifyToken(token: string) {
  queryToken.loading = true
  const { data } = await sendVerifyToken({ token })
  const { errors } = data!.verifyPasswordReset
  if (errors) {
    setNotification({ show: true, text: errors.message, type: 'error' })
  } else {
    queryToken.verified = true
    queryToken.loading = false
  }
}

async function requestResetPassword({ email }: { email: string }) {
  setLoading(true)
  const { data } = await sendRequestPasswortReset({ email })
  const { errors, message } = data!.requestResetPassword
  if (errors) {
    setNotification({ show: true, text: errors.message, type: 'error' })
  } else {
    setNotification({ show: true, text: message!, type: 'success' })
  }
  setLoading(false)
}

async function resetPassword({ password }: { password: string }) {
  setLoading(true)
  const { data } = await sendResetPassword({
    password,
    token: queryToken.token,
  })
  const { errors, message } = data!.resetPasswort
  if (errors) {
    setNotification({ show: true, text: errors.message, type: 'error' })
  } else {
    setNotification({ show: true, text: message!, type: 'success' })
    setTimeout(() => {
      push('/auth/login')
    }, 1500)
  }
  setLoading(false)
}

onBeforeMount(async () => {
  const { token } = query
  if (token) {
    queryToken.token = token as string
    await verifyToken(token as string)
  }
})
</script>
