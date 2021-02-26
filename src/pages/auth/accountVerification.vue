<template>
  <AuthLayout
    title="confirm"
    subtitle="checkInbox"
    :notification="notification"
  >
    <AuthForm
      type="verify"
      :validation-schema="schema"
      :loading="loading"
      @submit="verificate"
    >
      <FormInput name="verification" type="text" label="code" />
    </AuthForm>
  </AuthLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { object, string } from 'yup'

import { setAccessToken } from '@/utils/auth'
import { useVerifyAccountByEmailMutation } from '@/generated/graphql'
import { useLoading, useNotification, useUserInfo } from '@/hooks'

const { push, currentRoute } = useRouter()
const { setUserInfo } = useUserInfo()
const { loading, setLoading } = useLoading()
const { notification, setNotification } = useNotification()
const { id } = currentRoute.value.query

onMounted(() => {
  if (!id) push('/')
})

const schema = object().shape({
  email: string().email().required(),
  verification: string().min(6).required(),
})

const verificationCode = ref('')
const { mutate: sendVerification } = useVerifyAccountByEmailMutation(() => ({
  variables: { id: id as string, code: verificationCode.value },
}))

async function verificate(values: { verification: string }) {
  setLoading(true)
  verificationCode.value = values.verification
  const { data } = await sendVerification()
  const { errors, accessToken, user } = data!.verifyEmailCode
  if (errors) {
    setNotification({ show: true, text: errors.message, type: 'error' })
  } else {
    setUserInfo({
      email: user!.email,
      uid: user!.id,
      username: user!.username,
    })
    setAccessToken(accessToken!)
    push('/home')
  }
  setLoading(false)
}
</script>
