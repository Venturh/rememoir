<template>
  <AuthLayout
    title="login"
    subtitle="loginSubheader"
    :notification="notification"
    type="login"
  >
    <AuthForm
      type="signIn"
      :validation-schema="schema"
      :loading="loading"
      @submit="login"
    >
      <FormInput name="email" type="email" label="email" />
      <FormInput name="password" type="password" label="password" />
    </AuthForm>
  </AuthLayout>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { object, string } from 'yup'

import { setAccessToken } from '@/utils/auth'
import useUserInfo from '@/hooks/userInfo'
import { useLoginMutation } from '@/generated/graphql'
import { useLoading, useNotification } from '@/hooks'

const { push } = useRouter()
const { notification, setNotification } = useNotification()
const { loading, setLoading } = useLoading()

const infos = reactive({ email: '', password: '', error: '' })

const schema = object().shape({
  email: string().email().required(),
  password: string().min(3).required(),
})

const { setUserInfo } = useUserInfo()
const { mutate: sendLogin } = useLoginMutation(() => ({
  variables: { email: infos.email, password: infos.password },
}))

async function login(values: { email: string; password: string }) {
  setLoading(true)
  Object.assign(infos, values)
  infos.error = ''
  const { data } = await sendLogin()
  const { errors, accessToken, user } = data!.login
  setLoading(false)
  if (errors) {
    if (errors.message === 'USER_NOT_VERIIFIED') {
      setAccessToken('')
      push(`/auth/accountVerification/?id=${user?.id}`)
    } else {
      setNotification({ show: true, text: errors.message, type: 'error' })
    }
  } else {
    setUserInfo({
      email: user!.email,
      uid: user!.id,
      username: user!.username,
    })
    setAccessToken(accessToken!)
    push('/home')
  }
}
</script>
