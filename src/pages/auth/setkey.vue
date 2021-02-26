<template>
  <LandingLayout>
    <Modal
      v-model="show"
      name="secretKey"
      form
      title="enterSecretKey"
      :button-names="['submit', 'logout']"
      :validation-schema="schema"
      :loading="loading"
      required
      @submit="submit"
      @cancel="logOut"
    >
      <FormInput name="secretKey" type="text" label="secretKey" />
    </Modal>
    <Notification :notification="notification" />
  </LandingLayout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { object, string } from 'yup'

import {
  useLogoutMutation,
  useVerifySecretKeyMutation,
} from '@/generated/graphql'
import { hash, setSecretKey } from '@/utils/crypto'
import { useLoading, useNotification } from '@/hooks'
import { setAccessToken } from '@/utils/auth'

const { push } = useRouter()
const schema = object().shape({
  secretKey: string().min(6).required(),
})
const show = ref(true)
const input = reactive({ secretKey: '' })

const { notification, setNotification } = useNotification()
const { loading, setLoading } = useLoading()

const { mutate: verify } = useVerifySecretKeyMutation(() => ({
  variables: {
    key: hash(input.secretKey),
  },
}))

const { mutate: logout } = useLogoutMutation()

async function submit(values: Object) {
  setLoading(true)
  Object.assign(input, values)
  const { data } = await verify()
  const { errors } = data!.verifySecretKey
  if (errors) {
    setNotification({ show: true, text: errors.message, type: 'error' })
  } else {
    show.value = false
    setSecretKey(input.secretKey)
    push('/home')
  }
  setLoading(false)
}

async function logOut() {
  await logout()
  setAccessToken('')
  push('/')
}
</script>
