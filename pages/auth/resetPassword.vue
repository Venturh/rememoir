<template v-slot:auth>
  <main v-if="!verified">
    <div class="flex flex-col space-y-4">
      <div class="space-y-2">
        <h1>{{ $t('resetPasswordSub') }}.</h1>
        <h2>{{ $t('resetPasswordSubheader') }}</h2>
      </div>
      <AuthForm
        :error="error"
        type="resetPasswordButton"
        @submit="requestResetPassword()"
      >
        <FormInput v-model="input" type="email" class="block w-full form-input">
          Email
        </FormInput>
      </AuthForm>
      <div
        v-if="success"
        class="inline-flex items-center w-full p-2 space-x-2 border rounded-lg text-primary border-error"
      >
        An reset link was send to your mail
      </div>
    </div>
  </main>
  <main v-else>
    <div class="flex flex-col space-y-4">
      <div class="space-y-2">
        <h1>New Password.</h1>
        <h2>set new password</h2>
      </div>
      <AuthForm :error="error" type="login" @submit="resetPassword()">
        <FormInput
          v-model="input"
          :type="verified ? 'password' : 'email'"
          class="block w-full form-input"
        >
          Password
        </FormInput>
      </AuthForm>
    </div>
  </main>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
import {
  useRequestResetPasswordMutation,
  useResetPasswordMutation,
  useVerifyPasswordResetMutation,
} from '@/generated/graphql'

export default defineComponent({
  layout: 'auth',
  middleware: ['notAuthenticated'],

  setup() {
    const { app, query } = useContext()
    const { router, localePath } = app

    const token = ref()
    const verified = ref(false)
    const input = ref('')
    const error = ref('')
    const success = ref('')
    const {
      mutate: sendRequestPasswortReset,
    } = useRequestResetPasswordMutation(() => ({
      variables: { email: input.value },
    }))

    const { mutate: sendVerifyToken } = useVerifyPasswordResetMutation(() => ({
      variables: { token: token.value },
    }))

    const { mutate: sendResetPassword } = useResetPasswordMutation(() => ({
      variables: { token: token.value, password: input.value },
    }))

    async function verifyToken() {
      const { data } = await sendVerifyToken()
      const { errors } = data!.verifyPasswordReset
      if (errors) {
        error.value = errors.message
      } else {
        verified.value = true
      }
    }

    async function requestResetPassword() {
      const { data } = await sendRequestPasswortReset()
      const { errors, message } = data!.requestResetPassword
      if (errors) {
        error.value = errors.message
      } else {
        success.value = message!
      }
    }

    async function resetPassword() {
      const { data } = await sendResetPassword()
      const { errors } = data!.resetPasswort
      if (errors) {
        error.value = errors.message
      } else {
        router!.push(localePath('/entries'))
      }
    }

    onBeforeMount(async () => {
      const querytoken = query.value.token

      if (querytoken) {
        token.value = querytoken
        await verifyToken()
      }
    })

    return {
      verified,
      success,
      input,
      error,
      requestResetPassword,
      resetPassword,
    }
  },
})
</script>
